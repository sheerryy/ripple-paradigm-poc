import { io } from "socket.io-client";

import { getConfig } from '../../config';

const { SOCKET_ENDPOINT } = getConfig();

const socketClient = io(SOCKET_ENDPOINT);

export default socketClient;
