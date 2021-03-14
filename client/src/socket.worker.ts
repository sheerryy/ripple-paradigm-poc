/* eslint-disable no-restricted-globals */
const SocketIoWorker = () => {
  debugger
    importScripts(self.name + 'socket.io/socket.io.js')
    const socketClient = io('http://127.0.0.1:3001');

    const onMessage = (e: any) => {
      if (!e) return;

      socketClient.on('context/emitter', function (msg: string) {
        console.log(msg);
      });
      console.log('Start our long running job...');
      const seconds = 5;
      const start = new Date().getTime();
      const delay = seconds * 1000;

      while (true) {
        if ((new Date().getTime() - start) > delay) {
          break;
        }
      }

      self.postMessage("done");
    }
    addEventListener('message', onMessage);
}

// if (typeof window === 'object') {
//   window.SocketIoWorker = SocketIoWorker
// }
export default SocketIoWorker
// if (typeof module === 'object') {
//   export default SocketIoWorker
// } else {
//   SocketIoWorker()
// }
