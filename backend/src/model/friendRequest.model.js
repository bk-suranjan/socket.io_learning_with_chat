import mongoose,{Schema} from "mongoose";

const friendRequestSchema = new Schema({
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    frinedRequestStatus:{
        type:String,
        enum:['pending','requestSend','requestAccepted','friend'],
        default:'pending'
    }

},{timestamps:true})

const FriendRequest = mongoose.model('FriendRequest',friendRequestSchema)

export default FriendRequest