import express from 'express'
import http from 'node:http'

import { connectSocket } from './utils/socket.io.js';


export const app = express();
export const server = http.createServer(app)

connectSocket(server)