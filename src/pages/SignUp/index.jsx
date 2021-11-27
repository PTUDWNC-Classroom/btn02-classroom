import React, { useState } from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useHistory } from "react-router"

import sendUserInfoSignUp, {
  sendOtpValidEmail,
} from "../../Components/DataConnection/SignUpHandler"
import { Dialog, DialogContent } from "@mui/material"
import { BasicTextFields } from "../../Components/Form/FormEmail"

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const theme = createTheme()

export default function SignUp() {
  const history = useHistory()
  const [message, setMessage] = useState(
    "Nhập email sai format hoặc bỏ trống !"
  )
  const [itemInput, setItemInput] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorUserName, setErrorUserName] = useState(null)
  const [errorPassword, setErrorPassword] = useState(null)
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    username: "",
  })

  const handleSend = async (e) => {
    console.log(userInfo)
    e.preventDefault()
    console.log(itemInput)
    const OTP = itemInput
    const check = await sendOtpValidEmail(OTP, userInfo)
    console.log(check)

    if (check === true) {
      setUserInfo({
        email: "",
        password: "",
        username: "",
      })
      setOpenPopup(false)
      alert("Đăng ký thành công !")
      history.replace("/sign-in")
    }

    // userInfo =
    // {
    //   email: '',
    //   password: '',
    //   username: ''
    // };
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setOpenPopup(false)
  }

  const handleError = (error) => {
    let email = error.email
    let username = error.username
    let password = error.password

    setErrorEmail(!email.match(/.+@.+/))
    setErrorUserName(username !== "" ? false : true)
    setErrorPassword(password !== "" ? false : true)

    if (
      errorEmail === false &&
      errorUserName === false &&
      errorPassword === false
    ) {
      return false
    }
    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    console.log("submit")
    const data = new FormData(event.currentTarget)

    const user = {
      email: data.get("email"),
      password: data.get("password"),
      username: data.get("username"),
    }

    setUserInfo(user)

    //sendUserInfoSignUp(userInfo);

    //console.log(handleError(userInfo));
    if (handleError(user) === false) {
      console.log("handle")
      const checkExistInData = await sendUserInfoSignUp(userInfo)
      console.log("checkExist")
      console.log(checkExistInData)
      if (checkExistInData === true) {
        setOpenPopup(true)
      } else {
        setMessage("Email đã được sử dụng hoặc không tồn tại!")
        setErrorEmail(true)
      }
    }
  }

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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  error={errorEmail}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  //onChange={handleOnchange}
                  helperText={errorEmail ? message : " "}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={errorUserName}
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  helperText={errorUserName ? "Không thể bỏ trống" : " "}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={errorPassword}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                  helperText={errorPassword ? "Không thể bỏ trống" : " "}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Dialog open={openPopup}>
          <DialogContent>
            <Typography>
              <b>Nhập mã xác thực</b>
            </Typography>
            <form>
              <BasicTextFields
                itemInput={itemInput}
                setItemInput={setItemInput}
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
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}
