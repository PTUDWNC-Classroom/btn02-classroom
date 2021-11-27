import React, { useState, useEffect } from "react"
import axios from "axios"
import { useLocation } from "react-router"

import {
  Grid,
  Container,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogContent,
  Button,
} from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"

import TabPanel from ".."
import Account, { StudentAccount } from "./Account"
import { styled } from "@mui/system"
import { blue } from "@mui/material/colors"
import { BasicTextFields } from "../../../Form/FormEmail"
import sendInviteLink from "../../../DataConnection/SendInviteLink"
//import { PermPhoneMsg } from "@mui/icons-material"

const BlueTextTypography = styled(Typography)(({ theme }) => ({
  color: blue[500],
}))

const TeachersGrid = styled(Grid)(({ theme }) => ({
  borderBottom: `2px solid ${blue[500]}`,
  paddingBottom: theme.spacing(2),
}))

const StudentGrid = styled(TeachersGrid)(({ theme }) => ({
  marginTop: theme.spacing(10),
}))

const getIdFromUrl = (url) => {
  const arr = url.split("/")
  return arr[arr.length - 1]
}

const StudentTotal = ({ studentList }) => {
  const length = studentList.length

  if (length === 0) {
    return null
  } else if (length === 1) {
    return "1 student"
  } else {
    return `${length} students`
  }
}

const StudentSettingMenu = ({ anchorEl, handleClose }) => {
  return (
    <Menu
      id="student-setting-menu"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>Email student</MenuItem>
      <MenuItem onClick={handleClose}>Remove</MenuItem>
    </Menu>
  )
}

export default function PeopleTabPanel({ value, index }) {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [teacherList, setTeacherList] = useState([])
  const [studentList, setStudentList] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [itemInput, setItemInput] = useState(null)
  let location = useLocation()
  const [openPopup, setOpenPopup] = useState(false)

  const handleSend = async (e) => {
    console.log(itemInput)
    e.preventDefault()
    //console.log("chan ta");
    let url = location.pathname.split("/")
    console.log(url[url.length - 1])
    //sendMailInviteLink
    const sended = await sendInviteLink(url[url.length - 1], itemInput)
    if (sended === true) {
      alert("Đã gửi thành công!")
    } else {
      alert("Chưa gửi được!")
    }
    setOpenPopup(false)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setOpenPopup(false)
  }

  const role = localStorage.role

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleInviteTeacher = async () => {
    console.log(role)
    localStorage.setItem("inviteRole", "Teacher")

    setOpenPopup(true)
  }

  const handleInviteStudent = () => {
    localStorage.setItem("inviteRole", "Student")
    setOpenPopup(true)
  }

  useEffect(() => {
    const getTeacherList = async (classId) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST}classes/teachers-of-class/${classId}`
        )

        setTeacherList(response.data)
        setIsLoaded(true)
      } catch (error) {
        console.error(error)
        setIsLoaded(true)
        setError(error)
      }
    }

    const getStudentList = async (classId) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST}classes/students-of-class/${classId}`
        )

        setStudentList(response.data)
        setIsLoaded(true)
      } catch (error) {
        console.error(error)
        setIsLoaded(true)
        setError(error)
      }
    }

    const classId = getIdFromUrl(location.pathname)
    getTeacherList(classId)
    getStudentList(classId)

    // eslint-disable-next-line
  }, [])

  if (error) {
    return (
      <Typography variant="h4" color="error" align="center" flexGrow={1}>
        Error: {error.message}
      </Typography>
    )
  } else if (!isLoaded) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "90vh" }}
      >
        <Grid item xs={3}>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  } else {
    return (
      <>
        <TabPanel value={value} index={index}>
          <Container maxWidth="md">
            <TeachersGrid
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <BlueTextTypography variant="h4">Teachers</BlueTextTypography>
              </Grid>
              {role === "creator" && (
                <Grid item>
                  <IconButton color="primary" onClick={handleInviteTeacher}>
                    <PersonAddAltIcon />
                  </IconButton>
                </Grid>
              )}
            </TeachersGrid>
            <div>
              {teacherList &&
                teacherList.map((teacher) => (
                  <Account
                    key={teacher.userId}
                    userName={teacher.username}
                    handleClick={handleClick}
                  />
                ))}
            </div>

            <StudentGrid container alignItems="center">
              <Grid item flexGrow={1}>
                <BlueTextTypography variant="h4">Students</BlueTextTypography>
              </Grid>
              <Grid item style={{ marginRight: 10 }}>
                <BlueTextTypography>
                  <StudentTotal studentList={studentList} />
                </BlueTextTypography>
              </Grid>
              {role === "creator" && (
                <Grid item>
                  <IconButton color="primary" onClick={handleInviteStudent}>
                    <PersonAddAltIcon />
                  </IconButton>
                </Grid>
              )}
            </StudentGrid>
            <>
              {studentList && localStorage.role === "creator"
                ? studentList.map((student) => (
                    <StudentAccount
                      key={student.userId}
                      userName={student.username}
                      handleClick={handleClick}
                    />
                  ))
                : studentList.map((student) => (
                    <Account
                      key={student.userId}
                      userName={student.username}
                      handleClick={handleClick}
                    />
                  ))}
            </>
            <Dialog open={openPopup}>
              <DialogContent>
                <Typography>
                  <b>Nhập Email để mời</b>
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
          </Container>
        </TabPanel>
        <StudentSettingMenu handleClose={handleClose} anchorEl={anchorEl} />
      </>
    )
  }
}
