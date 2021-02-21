import React, {useEffect} from 'react';

import socketWorker from "./socket.worker";
import workerSetup from "./workerSetup";

const worker: Worker = workerSetup(socketWorker);

const SocketWorker = () => {
  useEffect(() => {
    worker
      .postMessage("start");

    worker.onmessage = (event: MessageEvent) => {
      if (event && event.data) {
        console.log(event)
      }
    };
  }, []);

  return null;
};

export default SocketWorker;