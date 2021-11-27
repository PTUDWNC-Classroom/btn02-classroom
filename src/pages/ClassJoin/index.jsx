import * as React from "react"
//import { Link as LinkRR } from "react-router-dom"
import { useLocation } from "react-router"

//import { styled } from "@mui/system"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import { Button } from "@mui/material"
//import { grey } from "@mui/material/colors"

import { useHistory } from "react-router"
import addStudentIntoClass, {
  addTeacherIntoClass,
} from "../../Components/DataConnection/JoinClass"
// const StyledLinkRR = styled(LinkRR)(({ theme }) => ({
//   textOverflow: "ellipsis",
//   overflow: "hidden",
//   paddingTop: 0.5,
//   color: grey[50],
//   textDecoration: "none",
//   "&:hover": {
//     textDecoration: "underline",
//   },
// }))
//import Grid from '@mui/icons-material/Grid3x3Sharp'

export default function ClassJoin() {
  const history = useHistory()
  let location = useLocation()
  console.log(location.pathname)
  const str = location.pathname.split("/")

  const id = str[str.length - 1]

  async function handleJoinClass() {
    //getAccount function
    let user = null
    if (localStorage.isSocialLogin) {
      //console.log("Join Social ClassJoin.js")
      //console.log(JSON.parse(localStorage.isSocialLogin))
      user = JSON.parse(localStorage.isSocialLogin)
    } else if (localStorage.isLogin) {
      //console.log("Join ClassJoin.js")
      //console.log(JSON.parse(localStorage.isLogin))
      user = JSON.parse(localStorage.isLogin)
    } else if (localStorage.isLogin) {
      //console.log("Join ClassJoin.js")
      //console.log(JSON.parse(localStorage.isLogin))
      user = JSON.parse(localStorage.isLogin)
    }
    // console.log(user)
    let check = null
    if (str[str.length - 2] === "join-Teacher") {
      check = await addTeacherIntoClass(user, id)
    } else if (str[str.length - 2] === "join-Student") {
      check = await addStudentIntoClass(user, id)
    }
    if (check !== null) {
      history.push(`/classes/${id}`)
    }
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="20vh"
          sx={{ bgcolor: "#6efcfc", height: "20vh" }}
          color="blue"
        >
          <AccountBoxIcon
            sx={{
              fontSize: 50,
            }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ bgcolor: "#F0F8FF", height: "60vh" }}
        >
          {/* <StyledLinkRR to={`/classes/${id}`}>
            <Button variant="contained" onClick={handleJoinClass}>
              JOIN CLASS
            </Button>
          </StyledLinkRR> */}
          <Button variant="contained" onClick={handleJoinClass}>
            JOIN CLASS
          </Button>
        </Box>
      </Container>
    </React.Fragment>
  )
}
