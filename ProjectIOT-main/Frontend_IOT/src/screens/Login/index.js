import React, {useState} from 'react'
import { Lock, User } from 'react-feather'
import './style.css'
import {LoginContextProvider, useLoginContext} from './context'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField
} from "@mui/material";

import {Close, Send} from "@mui/icons-material";



const LoginImpl = () => {

  const { handleSignup, handleLogin } = useLoginContext()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  // const [check,setCheck] = useState(false)
  const [show , setShow] = useState(false)




  // async function handleSubmit1(e){
  //   e.preventDefault()
  //   try {
  //      await handleLogin(username, password)
  //
  //     // setTimeout(()=>{
  //     //   if(rs)   dispatch({type : 'SET_USER', payload : {...rs.result, token: rs.token} })
  //     //
  //     // },2000);
  //   }catch (error) {
  //     console.log(error)
  //   }
  // }

  // async function handleSubmit2(e){
  //   e.preventDefault()
  //   try {
  //     await handleSignup(username, password, email);
  //     // console.log('fdf')
  //     // setTimeout(()=>{
  //     //   if(rs)  dispatch({type : 'SET_USER', payload : {...rs.result, token: rs.token} })
  //     //
  //     // },2000);
  //   }catch (error) {
  //     console.log(error)
  //   }
  // }


  return (
      <div className="container">
        <div className="forms-container">
          <div className="signing-signup">

            <form  onSubmit={(e) => {
              e.preventDefault()
              handleLogin(username, password)
            }}
                   className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <User style={{ placeSelf: 'center' }} />
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
              </div>
              <div className="input-field">
                <Lock style={{ placeSelf: 'center' }} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>
              <input type="submit" value="Đăng Nhập" className="btn solid" />
            </form>

            <span><hr/></span>
            <button className="btn_signup" onClick={()=> setShow(true)}>Tạo tài khoản mới</button>

            <Dialog   onClose={()=> setShow(false)} open={show}>
              <DialogTitle >
                Đăng Ký
                <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                    onClick={()=> setShow(false)}
                >
                  <Close />
                </IconButton>
              </DialogTitle>

              <form onSubmit={(e)=>{
                e.preventDefault()
                handleSignup(username, password)
              }}>
                <DialogContent dividers>
                  <DialogContentText>
                    Vui lòng hoàn thành thông tin bên dưới :
                  </DialogContentText>
                  <TextField margin="normal" variant="standard" id="username" label="Username" type="text"
                             fullWidth
                             onChange={(e) => setUsername(e.target.value)} value={username}
                             inputProps={{ minLength: 2 }}
                             required
                  />
                  <TextField margin="normal" variant="standard" id="email" label="Email" type="email"
                             fullWidth
                             onChange={(e) => setEmail(e.target.value)} value={email}
                             required
                  />
                  <TextField margin="normal" variant="standard" id="password" label="Password"
                             type="password" fullWidth
                             onChange={(e) => setPassword(e.target.value)} value={password}
                             required/>
                </DialogContent>
                <DialogActions sx={{ px: '19px',marginTop:3 }}>
                  <Button  type="submit" variant="contained" endIcon={<Send />}>
                    Đăng ký
                  </Button>
                </DialogActions>
              </form>
              <DialogActions sx={{ justifyContent: 'center', py: '24px' }}>

              </DialogActions>
            </Dialog>


          </div>
        </div>

      </div>

  )
}
const Login = () => <LoginContextProvider><LoginImpl /></LoginContextProvider>
export default Login;
