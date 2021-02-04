import socketIOClient from "socket.io-client";

import { getConfig } from '../../config';

const { SOCKET_ENDPOINT } = getConfig();

const socketClient = socketIOClient(SOCKET_ENDPOINT);

export default socketClient;