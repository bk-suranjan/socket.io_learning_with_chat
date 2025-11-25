
import cors from 'cors'
import connectDB from './src/DB/connectDB.js';
import { app, server } from './src/app.js';


app.use(cors());




connectDB().then(()=>{
    console.log('DB is connected')
    server.listen(3000,()=>{
        console.log('server is running')
    })
})

