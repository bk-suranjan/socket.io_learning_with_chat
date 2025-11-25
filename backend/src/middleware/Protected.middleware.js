import jwt from 'jsonwebtoken'
import User from '../model/user.model.js'


const protectedRoute = async (req,res,next) =>{
try {
        const token = req?.cookies?.token || req.header('Authorization')?.replace('Bearer ','')
        // console.log(token)
        if(!token) {
            return res.status(400).json('token not found')
        }
    
       const decode =  await jwt.verify(token,"This_is_secret")
    
       if(!decode){
        return res.status(400).json('invalid token')
       }
    
       const user = await User.findOne({email:decode.email})
    
       if(!user){
         return res.status(400).json('user not found')
       }
    
       req.user = user
    
       next()
    
} catch (error) {
    next(error)
}
}

export default protectedRoute