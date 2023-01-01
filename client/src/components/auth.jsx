import {Typography,Box,Button,TextField} from '@mui/material'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import axios from  'axios'
import {authActions}  from '../store'
const Auth = () => {
  const dispath = useDispatch()
  const [info, setInfo] = useState({
    name:"",
    email:"",
    password:""
  })
  const [isSignUp, setisSignUp] = useState(false)

  const handleChange = (e) => {
    setInfo((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value

    })
  )}

  const sendRequest = async (type='login') => {
  const res = await axios.post(`http://localhost:4000/api/users/${type}`,{
      name:info.name,
      email:info.email,
      password:info.password,
    }).catch(err=>console.log(err))

    const data = await res.data
    return data
  }

  const handleSubmit = (e) => {
  e.preventDefault()
  console.log(info)
  if(isSignUp){
    sendRequest("register")
    .then(()=>dispath(authActions.login()))
    .then((data)=>console.log(data))
  }else{
    sendRequest()
    .then(() => dispath(authActions.login()))
    .then((data)=>console.log(data))
  }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
  <Box display='flex' 
    maxWidth={500}
    flexDirection='column' 
    justifyContent={'center'} 
    alignItems='center'
    boxShadow={'10px 10px 20px darkgray'}
    padding={3} 
    margin='auto'
    marginTop={5}
    borderRadius={5} 
    >
    
    <Typography variant='h2'
     padding={3} textAlign={'center'}>
      { !isSignUp ? 'Login' : 'SignUp' }
    </Typography>
   {isSignUp &&<TextField  onChange={handleChange} 
    placeholder='Name....' margin='normal'
     value={info.name} 
     name='name'
     />}

   <TextField onChange={handleChange} type='email' 
    placeholder='email....' margin='normal'
     value={info.email}
     name='email'
     />

   <TextField  onChange={handleChange} 
    type='password' placeholder='Password....' 
    margin='normal' value={info.password}
    name='password'
    />

   <Button sx={{borderRadius:2,marginTop:3}} variant="contained" type='submit' >Submit</Button>
   <br />
   <Button sx={{borderRadius:2,marginTop:2}} variant="outlined" onClick={()=>setisSignUp(!isSignUp)}>Change to {isSignUp ? 'Login' : 'SignUp'}</Button>

  </Box>
      </form>
      </div>
  )
}

export default Auth