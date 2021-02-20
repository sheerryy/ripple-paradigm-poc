export default function setupWorker(worker: any): Worker {
  const code = worker.toString();
  const blob = new Blob(["(" + code + ")()"]);
  return new Worker(URL.createObjectURL(blob));
};