import React, { useEffect } from "react"
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  ListItem,
  List,
  ListItemText,
} from "@mui/material"
import { styled } from "@mui/system"
import axios from "axios"

import StudentIDListItem from "../../Components/User/StudentIDListItem"

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}))

export default function Profile() {
  const [edit, setEdit] = React.useState(false)

  const [studentId, setStudentId] = React.useState("")
  //console.log(JSON.parse(localStorage.isLogin))
  let user = {
    email: "",
    username: "",
    userId: "",
    studentId: "",
  }

  if (localStorage.isLogin) {
    user.email = JSON.parse(localStorage.isLogin).email
    user.username = JSON.parse(localStorage.isLogin).username
    user.userId = JSON.parse(localStorage.isLogin)._id
  } else if (localStorage.isSocialLogin) {
    user.email = JSON.parse(localStorage.isSocialLogin).email
    user.username = JSON.parse(localStorage.isSocialLogin).username
    user.userId = JSON.parse(localStorage.isSocialLogin)._id
  }
  // const email = JSON.parse(localStorage.isSocialLogin).email
  // const username = JSON.parse(localStorage.isSocialLogin).username
  // const userId = JSON.parse(localStorage.isSocialLogin)._id

  const handleEdit = () => {
    setEdit(!edit)
  }

  const handleChangeStudentId = (e) => {
    setStudentId(e.target.value)
  }

  const handleAddStudentId = async () => {
    if (studentId) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_HOST}user/add-student-id`,
          {
            userId: user.userId,
            studentId: studentId,
          }
        )

        if (response) {
          localStorage.setItem("isSocialLogin", JSON.stringify(response.data))
        }
        setEdit(false)
      } catch (error) {
        console.error(error)
      }
    } else alert("Please enter your student ID before saving!")
  }

  useEffect(() => {
    document.title = "Profile"
  }, [])

  return (
    <Grid container justifyContent="center" spacing={3}>
      <Grid container item xs={12} alignItems="center" direction="column">
        <Grid>
          <Avatar
            sx={{ width: "5rem", height: "5rem", marginBottom: "1rem" }}
            src="/user.svg"
          />
        </Grid>
        <Grid item>
          <Typography variant="h5">{user.username}</Typography>
        </Grid>
      </Grid>

      <Grid item md={6} xs={12}>
        <StyledPaper elevation={1}>
          <Grid container spacing={1}>
            <Grid item xs>
              <Typography variant="h5">Profile</Typography>
            </Grid>

            <Grid item xs={12}>
              <List>
                <ListItem>
                  <Grid container alignItems="center">
                    <Grid item sm={3} xs={12}>
                      <ListItemText>
                        <b>Email</b>
                      </ListItemText>
                    </Grid>
                    <Grid item sm={9} xs={12}>
                      <Typography variant="subtitle1">{user.email}</Typography>
                    </Grid>
                  </Grid>
                  <ListItemText />
                </ListItem>
                <StudentIDListItem
                  studentId={studentId}
                  handleChangeStudentId={handleChangeStudentId}
                  handleAddStudentId={handleAddStudentId}
                  edit={edit}
                  handleEdit={handleEdit}
                />
              </List>
            </Grid>
          </Grid>
        </StyledPaper>
      </Grid>
    </Grid>
  )
}
