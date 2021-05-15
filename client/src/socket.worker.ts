/* eslint-disable */ /* TODO: enable Eslint after completion */

const SocketIoWorker = () => {
    debugger
    console.log(`NAME: ${self.name}`)

    try {
      importScripts('https://cdn.socket.io/3.1.3/socket.io.min.js')
    } catch(e) {
      console.error(e)
    }
    // @ts-ignore
  const socketClient = io('http://127.0.0.1:3001');

    const onMessage = (e: any) => {
      if (!e) return;

      socketClient.on('connect', () => console.log('connected'))

      socketClient.on('context/emitter', function (msg: string) {
        // console.log(msg);
        self.postMessage(msg)
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
