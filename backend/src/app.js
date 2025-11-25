import express from 'express'
import http from 'node:http'
import cors from 'cors'
import { connectSocket } from './utils/socket.io.js';
import cookieParser from 'cookie-parser';


import useRoute from '../src/routes/user.routes.js'


export const app = express();
export const server = http.createServer(app)


app.use(cors());
app.use(cookieParser())
app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended:true,limit:'16kb'}))



app.use('/api/v1/user',useRoute)

connectSocket(server)