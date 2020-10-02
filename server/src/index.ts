import { Server } from 'http';
import express from 'express';
import 'module-alias/register';

import { SocketIoMiddleware } from '@middlewares'

import { ReporstRoute } from "./routes";

const app: express.Application = express();
const http = new Server(app);
const PORT = process.env.PORT || 3001;

app.use(new SocketIoMiddleware(http).responseEmitter);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

app.use('/reports', ReporstRoute);

const server = http.listen(PORT, () => {
    console.log(`App started on http://localhost:${PORT}`);
});