import React, { useEffect, useContext } from "react"
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
import classroomAxios from "../../Components/DataConnection/axiosConfig"

import StudentIDListItem from "../../Components/User/StudentIDListItem"
import { ClassroomContext } from "../../context/ClassroomContext"

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}))

export default function Profile() {
  const [edit, setEdit] = React.useState(false)
  const [studentId, setStudentId] = React.useState("")
  const { user } = useContext(ClassroomContext)

  const handleEdit = () => {
    setEdit(!edit)
  }

  const handleChangeStudentId = (e) => {
    setStudentId(e.target.value)
  }

  const handleAddStudentId = async () => {
    if (studentId) {
      try {
        const response = await classroomAxios.post(`user/add-student-id`, {
          userId: user._id,
          studentId: studentId,
        })

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
                  studentId={user.studentId}
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
