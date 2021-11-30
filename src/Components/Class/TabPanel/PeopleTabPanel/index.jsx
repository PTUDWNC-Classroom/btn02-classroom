import React, { useState, useEffect } from "react"
import axios from "axios"
import { useLocation } from "react-router"

import { Grid, Container, Typography, Menu, MenuItem } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"

import TabPanel from ".."
import Account, { StudentAccount } from "./Account"
import sendInviteLink from "../../../DataConnection/SendInviteLink"
//import { PermPhoneMsg } from "@mui/icons-material"
import TeacherListTitle, { StudentListTitle } from "./ListTitle"
import InvitationDialog from "./InvitationDialog"

const getIdFromUrl = (url) => {
  const arr = url.split("/")
  return arr[arr.length - 1]
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
  const [memberType, setMemberType] = useState("")
  // const [open, setOpen] = React.useState(false)

  // const handleClickOpen = () => {
  //   setOpen(true)
  // }

  // const handleClose = () => {
  //   setOpen(false)
  // }

  const handleSend = async (e) => {
    //console.log(itemInput)
    e.preventDefault()
    //console.log("chan ta");
    let url = location.pathname.split("/")
    // console.log(url[url.length - 1])
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

  const handleOpenPopup = (role) => {
    setMemberType(role)
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
        axios.interceptors.request.use((req) => {
          req.headers.authorization = localStorage.token
          return req
        })

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
            <TeacherListTitle
              role={role}
              handleOpenPopup={() => handleOpenPopup("teacher")}
            />
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
            <StudentListTitle
              role={role}
              handleOpenPopup={() => handleOpenPopup("student")}
              studentTotal={studentList ? studentList.length : 0}
            />
            <div>
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
            </div>
            <InvitationDialog
              memberType={memberType}
              openPopup={openPopup}
              itemInput={itemInput}
              handleCancel={handleCancel}
              handleSend={handleSend}
              handleClickOpen={handleOpenPopup}
              setItemInput={setItemInput}
            />
          </Container>
        </TabPanel>
        <StudentSettingMenu handleClose={handleClose} anchorEl={anchorEl} />
      </>
    )
  }
}
