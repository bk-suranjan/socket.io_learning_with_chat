import express from 'express'
import User from '../model/user.model.js';
import protectedRoute from '../middleware/Protected.middleware.js';

const route = express.Router();


route.get('/',protectedRoute,(req,res)=>{
    res.status(200).json({message:'Hello world'})
})

route.post('/register', async (req,res)=>{
    const {userName,email,password,fullName} = req.body

    console.log(userName,email,password,fullName)
    try {
        
        if([userName,email,password,fullName].some((p)=>!p || p.trim()==='')){
            return res.status(400).json({message:'All field are required'})
        }

        const existUser = await User.findOne({email,userName})

        

        if(existUser) {
             return res.status(400).json({message:'you already register'})
        }
        

        const user =  await User.create({
            userName,
            email,
            password,
            fullName
        })

          console.log('hello world')
      

        if(!user){
             return res.status(400).json({message:'fail to create user'})
        }

         const token = await user.genToken()

        if(!token) {
            return res.status(400).json({message:'cookie not created'})
        }

        console.log(user)

        res.status(200).cookie('token',token,{httpOnly:true, maxAge: 7 * 24 * 60 * 60 * 1000,}).json({message:'User created',user})


    } catch (error) {
        console.log(error)
    }
})

route.post('/login', async(req,res)=>{
  const {email,password} =  req.body

  try {
    if(!email || !password) {
        return res.status(400).json({message:'email and  password are required'})
    }

    const user  = await User.findOne({email})
    if(!user) {
         return res.status(400).json({message:'email or password is incorrect'})
    }

      const checkPassword = await  user.isPasswordCorrect(password)

      if(!checkPassword){
        return res.status(400).json({message:'email or password is incorrect'})
      }

            const token = await user.genToken()

        if(!token) {
            return res.status(400).json({message:'cookie not created'})
        }
       res.status(200).cookie('token',token,{httpOnly:true, maxAge: 7 * 24 * 60 * 60 * 1000,}).json({message:'User login',user})


    
  } catch (error) {
    return res.status(500).json({message:`error:${error}`})
  }
})

export default route