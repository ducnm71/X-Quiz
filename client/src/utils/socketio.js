import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `wi'ndow.location` object
const URL = 'http://localhost:5000';

export const socket = io(URL);
