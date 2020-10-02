import SocketIO from 'socket.io';
import {Server} from 'http';
import {NextFunction, Request, Response} from "express";

class SocketIoMiddleware {
  socketServer: SocketIO.Server;

  constructor(httpServer: Server) {
    this.socketServer = SocketIO(httpServer)
  }

  responseEmitter(req: Request, res: Response, next: NextFunction) {
    req.on('end', (data) => {
      if (['GET', 'POST', 'PATCH', 'DELETE'].includes(req.method)) {
        console.log(res)
      }
    });

    next();
  }
}

export default SocketIoMiddleware;
