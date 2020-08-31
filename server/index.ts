import * as express from 'express';

const app: express.Application = express();
const http = require("http").Server(app);

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

const server = http.listen(PORT, function () {
    console.log(`listening on *:${PORT}`);
});