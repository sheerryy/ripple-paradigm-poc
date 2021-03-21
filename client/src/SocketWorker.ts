// @ts-ignore
const EventEmitter = require('eventemitter3')
// @ts-ignore
const io = require('socket.io-client')
class SharedWorkerSocketIO {

  WorkerType = Worker;
  worker: Worker | undefined;
  workerUri: string | undefined;
  socketUri: string;
  started: boolean = false;
  events = new EventEmitter()
  socket = null

  constructor(socketUri: string) {
    console.log('SharedWorkerSocketIO ', socketUri)
    this.socketUri = socketUri
  }

  startSocketIo() {
    this.socket = io(this.socketUri)
  }

  startWorker() {
    const workerUri = this.getWorkerUri()
    console.log('Starting Worker', this.WorkerType, workerUri)
    this.worker = new this.WorkerType(workerUri, {
      name: this.socketUri
    })
    const port = this.worker.port || this.worker
    port.onmessage = (event: any) => {
      console.log('<< worker received message:', event.data.type, event.data.message)
      this.events.emit(event.data.type, event.data.message)
    }
    this.worker.onerror = event => {
      console.log('worker error', event)
      this.events.emit('error', event)
    }
    console.log('worker started')
  }

  emit(event: any, data: any, cb: any) {
    console.log('>> emit:', event, data, cb)
    if (this.worker) {
      // todo: ack cb
      const port = this.worker.port || this.worker
      port.postMessage({
        eventType: 'emit',
        event: event,
        data: data
      })
    } else {
      this.socket.emit(...arguments)
    }
  }

  on(event: any, cb: any) {
    if (this.worker) {
      console.log('worker add handler on event:', event)
      const port = this.worker.port || this.worker
      port.postMessage({
        eventType: 'on',
        event: event
      })
      this.events.on(event, cb)
    } else {
      console.log('socket add handler on event:', event)
      this.socket.on(...arguments)
    }
  }

  start() {
    this.started = true
    try {
      console.log('Attempting to start socket.io shared webworker')
      this.startWorker()
    } catch (e) {
      console.log('Error starting socket.io shared webwoker', e)
      console.log('Starting socket.io instead')
      this.worker = undefined // disable worker
      this.startSocketIo()
    }
  }

  getWorkerObjectUrl() {
    const script = '(' + global.SocketIoSharedWorker.toString() + ')()'
    return global.URL.createObjectURL(new Blob([script], {type: 'application/javascript'}))
  }

  getWorkerUri() {
    return this.workerUri || this.getWorkerObjectUrl()
  }

  useWorker(uri: string) {
    console.log('Starting worker', uri)
    this.workerUri = uri
    if (!this.started) {
      this.start()
    }
  }

  /**
   * @deprecated
   */
  setWorker = this.useWorker

}

module.exports = (uri: string) => new SharedWorkerSocketIO(uri)
