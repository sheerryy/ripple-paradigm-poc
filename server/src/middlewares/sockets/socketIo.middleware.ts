import { Server as SocketServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import {
  Request,
  Response,
  NextFunction,
} from 'express';

import {
  EmitterResponse,
  DependentContext,
  EmitterRequestMethod,
} from '@utils/types';

class SocketIoMiddleware {
  socketServer: SocketServer;

  constructor(httpServer: HttpServer) {
    this.socketServer = new SocketServer(httpServer, {
      cors: {
        origin: '*',
      },
    });
  }

  socketEmitter = (context: string, response: EmitterResponse) => {
    this.socketServer.emit(`context/${context}`, response);
  }

  getEmitterResponse = (requestMethod: EmitterRequestMethod, id?: string): EmitterResponse => {
    switch (requestMethod) {
      case 'POST':
        return { requestMethod };
      default:
        return { requestMethod, data: { id } };
    }
  }

  emitterMiddleware = (context: string) => (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
      if (['POST', 'PUT', 'PATCH', 'DELETE'].indexOf(req.method) !== -1) {
        console.log(`${req.method} request on ${context}`);

        if ([200, 201, 204].indexOf(res.statusCode) === -1) {
          next();

          return;
        }

        this.socketEmitter(
          context,
          this.getEmitterResponse(req.method as EmitterRequestMethod, req.params?.id),
        );

        const dependentContexts: DependentContext[] = res.locals.dependentContexts || [];

        // eslint-disable-next-line no-restricted-syntax
        for (const dependentContext of dependentContexts) {
          this.socketEmitter(
            dependentContext.context,
            this.getEmitterResponse(dependentContext.requestMethod, dependentContext.id),
          );
        }
      }
    });

    next();
  }
}

export default SocketIoMiddleware;
