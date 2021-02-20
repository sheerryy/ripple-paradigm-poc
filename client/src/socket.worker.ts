/* eslint-disable no-restricted-globals */
export default () => {
  self.addEventListener("message", e => {
    if (!e) return;

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
  });
}