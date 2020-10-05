import SocketIO from 'socket.io';
import {Server} from 'http';
import {NextFunction, Request, Response} from "express";

class SocketIoMiddleware {
  socketServer: SocketIO.Server;

  constructor(httpServer: Server) {
    this.socketServer = SocketIO(httpServer)
  }

  responseEmitter(req: Request, res: Response, next: NextFunction) {
    // req.on('end', (data: any) => {
    //   if (['GET', 'POST', 'PATCH', 'DELETE'].includes(req.method)) {
    //     res.json = (data2: any) => {
    //       console.log(data2); return res.json.call(res, data2);
    //     }
    //   }
    // });

    // next()
    try {
      if (['GET', 'POST', 'PATCH', 'DELETE'].includes(req.method)) {
        const oldJSON = res.json;
        res.json = (data) => {
          res.json = oldJSON;
          console.log(data);
          return oldJSON.call(res, data);
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default SocketIoMiddleware;
