import SocketIO from 'socket.io';
import {Server} from 'http';
import {NextFunction, Request, Response} from "express";

class SocketIoMiddleware {
  socketServer: SocketIO.Server;

  constructor(httpServer: Server) {
    this.socketServer = SocketIO(httpServer);
  }



  emitterMiddleware = (context: string) => (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", () => {
      if (['POST', 'PUT', 'PATCH', 'DELETE'].indexOf(req.method) !== -1) {
        console.log(`${req.method} request on ${context}`);

        if ([200, 201, 204].indexOf(res.statusCode) === -1) {
          next();

          return;
        }

        switch (req.method) {
          case 'POST':
            this.socketServer.emit(`emitter/${context}`, req.method);
            break;
          case 'PUT':
            this.socketServer.emit(`emitter/${context}`, `${req.method}_${req.params.id}`);
            break;
          case 'PATCH':
            this.socketServer.emit(`emitter/${context}`, `${req.method}_${req.params.id}`);
            break;
          case 'DELETE':
            this.socketServer.emit(`emitter/${context}`, `${req.method}_${req.params.id}`);
            break;
        }
      }
    });

    next()
  }
};

export default SocketIoMiddleware;
