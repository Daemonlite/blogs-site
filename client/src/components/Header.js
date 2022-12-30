import * as React from 'react';
import {AppBar,Toolbar,Typography,Box,Button,Tabs,Tab} from '@mui/material'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {useSelector} from 'react-redux'

function Header() {
  const [value,setValue] = useState()
  const isLoggedIn = useSelector( state=> state.isLoggedIn)
  return (
    <AppBar sx={{ background:"#fff"}} position='sticky'>
    <Toolbar>
    <Typography variant='h4' sx={{color:'black'}}>Fedora Blogs</Typography>
   {isLoggedIn && <Box display='flex' marginLeft='auto'>
    <Tabs 
    value={value} 
    onChange={(e,val)=>setValue(val)}
    >
      <Tab
         LinkComponent={Link} to='/blogs'
       label='All Blogs'/>
      <Tab 
      LinkComponent={Link} to='/myBlogs'
      label='My Blogs'/>
    </Tabs>
    </Box>}
    <Box display='flex' marginLeft='auto'>
      <Button variant='contained' sx={{margin:1,borderRadius:10}}>
        <Link to='/auth'>Login</Link>
      </Button>
      <Button variant='contained' sx={{margin:1 ,borderRadius:10}}>
      <Link to='/auth'>SignUp</Link>
      </Button>
   { isLoggedIn && <Button variant='contained' sx={{margin:1 ,borderRadius:10}}>
      <Link to='/auth'>Logout</Link>
      </Button>}

    </Box>
    </Toolbar>

    </AppBar>
  )
}

export default Header