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
} from '@utils/types'; // TODO: search for alias plugin to support Intellisense

class SocketIoMiddleware {
  socketServer: SocketServer;

  /**
   * @description constructor will initialize a socket server which will be used for event emission
   * @param httpServer {HttpServer}
   */
  constructor(httpServer: HttpServer) {
    this.socketServer = new SocketServer(httpServer, {
      cors: {
        origin: '*',
      },
    });
  }

  /**
   * @description This method is a wrapper of emit function of Socket.io Emit function
   * @param context {String}
   * @param response {Partial<EmitterResponse>}
   */
  socketEmitter = (context: string, response: Partial<EmitterResponse>) => {
    this.socketServer.emit('context/emitter', { ...response, context });
  }

  /**
   * @description This method will return the data according to the reuqest medthod TODO: move this to utils
   * @param requestMethod {EmitterRequestMethod}
   * @param id {string}
   */
  getEmitterResponse = (
    requestMethod: EmitterRequestMethod, id?: string,
  ): Partial<EmitterResponse> => {
    switch (requestMethod) {
      case 'POST':
        return { requestMethod };
      default:
        return { requestMethod, data: { id } };
    }
  }

  /**
   * @description This method is the main part of this middleware.
   * It will catch POST', 'PUT', 'PATCH' and 'DELETE' successful requests
   * and will emit it to Socket server
   * It uses on 'finish' event which mean it will work after the response is sent
   * and will not create any delay in the main request
   * @param context {string} - name of the entity
   */
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

        // This method will emit event for dependent enitities
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
