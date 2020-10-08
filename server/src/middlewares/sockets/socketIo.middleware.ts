import SocketIO from 'socket.io';
import {Server} from 'http';
import {NextFunction, Request, Response} from "express";

class SocketIoMiddleware {
  socketServer: SocketIO.Server;

  constructor(httpServer: Server) {
    this.socketServer = SocketIO(httpServer)
  }

  responseEmitter = (context: string) => (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", () => {
      if (['POST', 'PATCH', 'DELETE'].indexOf(req.method) !== -1) {
        console.log(`${req.method} request on ${context}`);
      }
    });

    next()
  }
};

export default SocketIoMiddleware;
