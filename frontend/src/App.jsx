// import React from 'react'
// import { useState } from 'react'
// import { useEffect } from 'react'
// import io from 'socket.io-client'
// import  './index.css'

// function App() {
//   const [socket,setSocket]=useState()
//   const [roomId,setRoomId] = useState()
//   const [message,setMessage] = useState()
//   const [room,setRoom] = useState()

//   const [msg,setMsg] = useState([])

//   // useEffect(()=>{
//   //   const socket =  io('http://localhost:3000')

        
//   //   socket.on('public:emit',(data)=>{
//   //     console.log(data)
//   //   })

//   //   socket.on('private:emit',(data)=>{
//   //     console.log(data)
//   //   })

//   //   socket.on('connect',()=>{
//   //     console.log('me connected',socket.id)
//   //     setSocket(socket)
//   //   })


//   // },[])


//   useEffect(()=>{
//     const socket = io('http://localhost:3000')

//     socket.on('personal:message',(msg)=>{
//       // console.log(msg)
//       setMsg(pre => [...pre,msg])
//     })
//     socket.on('connect',()=>{
//       console.log('me connected')
//       setSocket(socket)
//     })

//     return ()=>{
//       socket.disconnect(()=>{
//         console.log(socket.id)
//       })
//     }
//   },[])

//   const handleForm  = (e) =>{
//     e.preventDefault();
//     // console.log(message)
//     socket.emit('message',{msg:message,id:roomId})
//     setMessage('')

//   }
//   const handleRoom = (e)=>{
//     e.preventDefault();
//     socket.emit('join:room',room)
//     setRoom('')
//   }
//   return (
//     <div>
//       <h1>Chat app</h1>

//       <form onSubmit={handleForm}>
//         <p>{socket?.id}</p>
//         <input type="text" placeholder='enter message' onChange={(e)=>setMessage(e.target.value)} value={message}/>
//         <input type="submit" />

//         <input type="text" placeholder='room id' onChange={(e)=>{setRoomId(e.target.value)}}  value={roomId}/>
//       </form>

//       <form onSubmit={handleRoom}>
//         <input type="text" placeholder='room' onChange={(e)=>setRoom(e.target.value)} value={room}/>
//         <input type="submit" />
//       </form>
//       {
//         msg?.map((m,i)=>(
//            <p key={i}>{m}</p>
//         ))
//       }
//     </div>
//   )
// }

// export default App



import React, { useEffect, useState } from 'react'
import {io} from 'socket.io-client'

function App() {

  const [socket,setSocket] = useState()
  const [sendMsg,setSendMsg] = useState()
  const [socketId,setSocketId] = useState()
   const [msg,setMsg] = useState([])
   const [mineMsg,setMineMsg] = useState([])
   

  useEffect(()=>{
    const socket =  io('http://localhost:3000')
  

    socket.on('receive:msg',(msg)=>{
      setMsg((p)=>[...p,msg])
    })
 
   
     
    socket.on('mine:msg',(msg)=>{
      setMineMsg((e)=>[...e,msg])
    })

    socket.on('connect',()=>{
      console.log('you are connected')
      setSocket(socket)
    })


    

  },[])

  const handleForm = (e)=>{
    e.preventDefault();

    socket.emit('send:msg',{sendMsg,socketId})
    
  }

 

  return (
    <div>
       
       <form onSubmit={handleForm}>
        <p>{socket?.id}</p>
        <input type="text" placeholder='enter your msg' onChange={(e)=>setSendMsg(e.target.value)} value={sendMsg} />
        <br /><br />
        <input type="text"  placeholder='enter socket id' onChange={(e)=>setSocketId(e.target.value)} value={socketId}/>
        <br /><br />
        <input type="submit" />
       </form>

       <div style={{display:'flex',justifyContent:'space-between'}}>
        <div>
          <p>From mine side</p>
          {
            mineMsg.map((e)=>(
              <p>{e}</p>
            ))
          }
        </div>
         <div style={{background:'pink'}}>
          <p>From other side </p>
          {
           
             msg.map((e)=>{
            return(
              <p key={e}>{e}</p>
            )
             })
          }
        </div>
       </div>
    
    </div>
  )
}

export default App
