const bcrypt = require('bcrypt')
const User = require('../Models/user')

const getUsers = async (req,res,next) => {
  let users;
  try {
    users = await User.find()
  } catch (error) {
    console.log(error)
  }
  if(!users){
    res.status(404).json({message:'no user found'})
  }
  
  return res.status(200).json(users)
}
const register = async (req,res,next) =>{
    const {name,email,password} = req.body
    
    if(!name || !email  || !password){
        res.status(400).send('Please add all fields')
    }
    
    //check if user exists
    const userExists = await User.findOne({email})
    
    if (userExists){
        res.status(400).send('user already exists') 
    
    }
    
    //hashpassord
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt )
    
    //createUser
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        blogs:[]
    
    })
    
    if(user){
       res.status(201).json({
        _id : user.id,
        name :user.name,
        email : user.email,
        blogs : user.blogs
        
     
       })}else{
          res.status(400).send('invalid user credentials')
       }
      
    
     
    }
    const loginUser =  async(req,res) => {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if (user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id : user.id,
            name :user.name,
            email : user.email,
           
        })
        }else{
            res.status(400).send('invalid user credentials')
        }
    
        res.send("login user")
       }

module.exports ={
    getUsers,
    register,
    loginUser,
}