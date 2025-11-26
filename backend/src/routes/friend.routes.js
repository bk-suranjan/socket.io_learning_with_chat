import express from 'express'
import protectedRoute from '../middleware/Protected.middleware.js'
import User from '../model/user.model.js'
import FriendRequest from '../model/friendRequest.model.js'
const route = express.Router()

// check to dont send friend request to own
// check already friend
// check already friendRequest send
// send friend request

route.post('/requestSend',protectedRoute,async(req,res)=>{
  try {
    const user = req?.user
    const {id} = req.body
  
     if(user._id.toString() === id.toString()) {
      return res.status(400).json({message:'you canot send the friend request to your self'})
     }

     const alreadyFrined = await User.findOne({_id:user._id,friends:id})

     if(alreadyFrined) {
      return res.status(400).json({message:'you are already friend'})
     }

     const alreadyFrinedRequsetSend = await FriendRequest.findOne({
      to:id,
      from:user._id
     })

         if(alreadyFrinedRequsetSend) {
      return res.status(400).json({message:'you are already friend request'})
     }

     const sendFriendRequest = await FriendRequest.create({
       to:id,
      from:user._id,
      status:'requestSend'
     })

     if(!sendFriendRequest){
      return res.status(400).json({message:'faild to send friend request'})
     }

     const updatedUser = await User.findByIdAndUpdate(user._id,{
      $push:{
        friendRequest:sendFriendRequest._id
      }
     })

     if(!updatedUser){
       return res.status(400).json({message:'sender not updated'})
     }


     const receverUser = await User.findByIdAndUpdate(id,{
      $push:{
        friendRequest:sendFriendRequest._id
      }
     })

     if(!receverUser){
       return res.status(400).json({message:'recever not updated'})
     }

     res.status(200).json({message:'friend request send'})
    
  } catch (error) {
    console.log(error)
    res.status(400).json({message:`internal server error ${error}`})
  }
})

export default route