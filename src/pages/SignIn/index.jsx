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
  const { login } = useContext(ClassroomContext)

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

  const handleSend = (e) => {
    e.preventDefault()
    //console.log("chan ta");
    //console.log(itemInput);
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setOpenPopup(false)
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
        <Dialog open={openPopup}>
          <DialogContent>
            <Typography>
              <b>Nhập Email để đổi mật khẩu</b>
            </Typography>
            <form>
              <BasicTextFields />
              <Button type="cancel" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleSend}>
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
