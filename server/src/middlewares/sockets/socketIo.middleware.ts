import SocketIO from 'socket.io';
import { Server } from 'http';
import { NextFunction, Request, Response } from "express";

import {EmitterResponse, EmitterRequestMethod, DependentContexts} from '@utils/types'

class SocketIoMiddleware {
  socketServer: SocketIO.Server;

  constructor(httpServer: Server) {
    this.socketServer = SocketIO(httpServer);
  }

  socketEmitter = (context: string, response: EmitterResponse ) => {
    this.socketServer.emit(`emitter/${context}`, response);
  };

  getEmitterResponse = (requestMethod: EmitterRequestMethod, id?: string): EmitterResponse => {
    switch (requestMethod) {
      case 'POST':
        return { requestMethod };
      default:
        return { requestMethod, data: { id } };
    }
  };

  emitterMiddleware = (context: string) => (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", () => {
      if (['POST', 'PUT', 'PATCH', 'DELETE'].indexOf(req.method) !== -1) {
        console.log(`${req.method} request on ${context}`);

        if ([200, 201, 204].indexOf(res.statusCode) === -1) {
          next();

          return;
        }

        this.socketEmitter(context, this.getEmitterResponse(req.method as EmitterRequestMethod, req.params?.id));
      }
    });

    next()
  }
};

export default SocketIoMiddleware;
