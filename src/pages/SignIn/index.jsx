import React, { useState, useEffect, useContext } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import SocialLogin from "../../Components/Button/GoogleLoginButton"

import sendUserInfoSignIn from "../../Components/DataConnection/SignInHandler"
import { Dialog, DialogContent } from "@mui/material"
import { BasicTextFields } from "../../Components/Form/FormEmail"
import { useHistory } from "react-router"
import { ClassroomContext } from "../../context/ClassroomContext"
import classroomAxios from "../../Components/DataConnection/axiosConfig"
//import formEmailForget from './Email/Form-Email';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href={`${process.env.REACT_APP_DEPLOY_HOST}`}>
        Classroom1821
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const theme = createTheme()

export default function SignIn() {
  const history = useHistory()
  const [openPopup, setOpenPopup] = useState(false)
  const [openChangePassPopup, setOpenChangePassPopup] = useState(false)
  const [openConfirmPopup, setOpenConfirmPopup] = useState(false)
  const { login } = useContext(ClassroomContext)
  const [itemInput, setItemInput] = useState('')
  const [itemPasswordInput, setItemPasswordInput] = useState('')
  const [itemPassword2Input, setItemPassword2Input] = useState('')
  const [itemConfirm, setItemConfirm] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const userInfo = {
      username: data.get("username"),
      password: data.get("password"),
    }
    const user = await sendUserInfoSignIn(userInfo)

    if (user) {
      localStorage.setItem("isLogin", JSON.stringify(user))
      alert("Đăng nhập thành công !!!")
      localStorage.setItem("token", `Bearer  ${user.token}`)
      localStorage.setItem("refreshToken", user.refreshToken)

      // Dispatch "local-storage" event to call
      window.dispatchEvent(new Event("local-storage"))

      login(user.user)

      if (localStorage.previousLocation) {
        //console.log(localStorage.previousLocation)
      } else {
        history.replace("/")
      }
    } else {
      alert("Đăng nhập không thành công !!!")
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    //gửi itemInput lên api
    try {
      const res = await classroomAxios.post(`user/forgot-pass`, {
        email: itemInput
      })

      if (res.data === true) {
        //Đóng popup của gửi mail
        setOpenPopup(false);
        //Mở bảng xác nhận
        setOpenConfirmPopup(true);
      }
      else {
        alert("Email nhập không đúng !")
      }
    }
    catch (error) {
      console.error(error)
    }

  }

  const handleCancel = (e) => {
    e.preventDefault()
    setOpenPopup(false)
  }

  const handlePasswordCancel = (e) => {
    e.preventDefault()
    setOpenChangePassPopup(false)
  }

  const handlePasswordSend = async (e) => {
    e.preventDefault()
    if (itemPasswordInput === itemPassword2Input) {
      try {
        const res = await classroomAxios.post(`user/update-password`, {
          email: itemInput,
          newpassword: itemPasswordInput
        })

        if (res.data === true) {
          //Đóng bảng set password
          setOpenChangePassPopup(false);
          alert("Đã thay đổi mật khẩu thành công!")
        }
      }
      catch (error) {
        console.error(error)
      }
    }
    else {
      alert("Confirm password không đúng !")
    }
  }

  const handleConfirmCancel = (e) => {
    e.preventDefault()
    setOpenConfirmPopup(false);
  }

  const handleConfirmSend = async (e) => {
    e.preventDefault()
    try {
      const res = await classroomAxios.post(`user/confirm-OTP`, {
        ChangePasswordOTP: itemConfirm
      })

      if (res.data === true) {
        //Đóng bảng xác nhận
        setOpenConfirmPopup(false);
        //Mở bảng set password
        setOpenChangePassPopup(true);
      }
      else {
        alert("OTP nhập không đúng !")
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  //console.log("sign-in")
  useEffect(() => {
    document.title = "Sign in"
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Typography variant="h6" textAlign="center">
              or
            </Typography>
            <SocialLogin />
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => {
                    setOpenPopup(true)
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Dialog open={openChangePassPopup}>
          <DialogContent>
            <Typography>
              <b>Nhập mật khẩu mới</b>
            </Typography>
            <form>
              <BasicTextFields
                itemInput={itemPasswordInput}
                setItemInput={setItemPasswordInput}
                label={"New password"}
                type = {"password"}
              />
              <BasicTextFields
                itemInput={itemPassword2Input}
                setItemInput={setItemPassword2Input}
                label={"Confirm password"}
                type = {"password"}
              />
              <Button type="cancel" onClick={handlePasswordCancel}>
                Cancel
              </Button>
              <Button type="submit" onClick={handlePasswordSend}>
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={openPopup}>
          <DialogContent>
            <Typography>
              <b>Nhập Email để đổi mật khẩu</b>
            </Typography>
            <form>
              <BasicTextFields
                itemInput={itemInput}
                setItemInput={setItemInput}
                type = {"Text"}
              />
              <Button type="cancel" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleSend}>
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={openConfirmPopup}>
          <DialogContent>
            <Typography>
              <b>Nhập mã xác thực</b>
            </Typography>
            <form>
              <BasicTextFields
                itemInput={itemConfirm}
                setItemInput={setItemConfirm}
                type = {"Text"}
              />
              <Button type="cancel" onClick={handleConfirmCancel}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleConfirmSend}>
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
