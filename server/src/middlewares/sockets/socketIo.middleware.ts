import SocketIO from 'socket.io';
import {Server} from 'http';
import {NextFunction, Request, Response} from "express";

class SocketIoMiddleware {
  socketServer: SocketIO.Server;
  socket: SocketIO.Socket;

  constructor(httpServer: Server) {
    this.socketServer = SocketIO(httpServer);
    this.socketServer.on('connection', (socket: SocketIO.Socket) => {
      console.log(`user (id: ${socket.id}) connected`);
      this.socket = socket;
    });
    this.socketServer.on("disconnect", () => {
      console.log(`user (id: ${this.socket.id} disconnected`);
      this.socket = null;
    });
  }

  responseEmitter = (context: string) => (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", () => {
      if (['POST', 'PUT', 'PATCH', 'DELETE'].indexOf(req.method) !== -1) {
        console.log(`${req.method} request on ${context}`);
 // @START: check status code
        switch (req.method) {
          case 'POST':
            this.socket.emit(`emitter/${context}`, req.method);
            break;
          case 'PUT':
            this.socket.emit(`emitter/${context}`, `${req.method}_${req.params.id}`);
            break;
          case 'PATCH':
            this.socket.emit(`emitter/${context}`, `${req.method}_${req.params.id}`);
            break;
          case 'DELETE':
            this.socket.emit(`emitter/${context}`, `${req.method}_${req.params.id}`);
            break;
        }
      }
    });

    next()
  }
};

export default SocketIoMiddleware;
