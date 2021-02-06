// Copied from https://gist.github.com/solenoid/1372386

export const mongoObjectId = () => {
  // tslint:disable-next-line:no-bitwise
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
    // tslint:disable-next-line:no-bitwise
    (Math.random() * 16 | 0).toString(16)).toLowerCase();
};
