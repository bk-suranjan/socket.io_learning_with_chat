
import {Server} from 'socket.io'

export const connectSocket = (server)=>{
    const io = new Server(server,{
    cors:{
        origin:'*',
    }
})




io.on('connection',(socket)=>{
    console.log('user connected',socket.id)

    // emit for the send requset .. this is emiting data and this io for public
    // io.emit('public:emit',`${socket.id} this is connect to this group`)

    // socket.emit('private:emit',`this is private`)
    socket.on('message',(data)=>{
        socket.to(data.id).emit('personal:message',data.msg)
    })

    // this is for group

    socket.on('join:room',(data)=>{
        socket.join(data)
    })
  
    socket.on('disconnect',()=>{
        console.log(`socket id ${socket.id}`)
    })
})

}