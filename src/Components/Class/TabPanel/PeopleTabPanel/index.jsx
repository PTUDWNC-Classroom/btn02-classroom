import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import { useLocation } from "react-router"

import { Grid, Container, Typography, Menu, MenuItem, Stack, Alert, Collapse, IconButton } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"

import TabPanel from ".."
import Account, { StudentAccount } from "./Account"
import sendInviteLink from "../../../DataConnection/SendInviteLink"
//import { PermPhoneMsg } from "@mui/icons-material"
import TeacherListTitle, { StudentListTitle } from "./ListTitle"
import InvitationDialog from "./InvitationDialog"
import { tabsContext } from "../../../../context/TabsContext"
import { Close } from "@mui/icons-material"

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
  const [itemInput, setItemInput] = useState("")
  let location = useLocation()
  const [openPopup, setOpenPopup] = useState(false)
  const [memberType, setMemberType] = useState("")
  const [errorEmail, setErrorEmail] = useState(null);
  const message = "Nhập email sai format hoặc bỏ trống !"
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { role } = useContext(tabsContext)

  const checkEmail = async () => {
    setErrorEmail(!itemInput.match(/.+@.+/));
    //console.log("error")
  }
  const handleSend = async () => {
    console.log(itemInput)
    //e.preventDefault()
    //console.log( itemInput === null);

    await checkEmail();

    //console.log("handlesend")
    //console.log(itemInput);
    if ((!itemInput.match(/.+@.+/)) === false) {
      let url = location.pathname.split("/")
      console.log(url[url.length - 1])
      //sendMailInviteLink
      const sended = await sendInviteLink(
        url[url.length - 1],
        itemInput,
        memberType
      )
      if (sended === true) {
        setAlertMessage("Đã gửi thành công !");
        setOpenAlert(true);
      } else {
        alert("Chưa gửi được!")
      }
      setOpenPopup(false)
    }
    console.log(errorEmail);
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setOpenPopup(false)
  }

  //const role = localStorage.role

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleOpenPopup = (type) => {
    setItemInput("");
    setErrorEmail(null);
    setMemberType(type)
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
        <Container maxWidth="xs">
          <Stack sx={{ width: "100%" }}>
            <Collapse in={openAlert}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenAlert(false);
                    }}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {alertMessage}
              </Alert>
            </Collapse>
          </Stack>
        </Container>
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
              {studentList && role === "creator"
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
              handleSend={() => { handleSend() }}
              setItemInput={setItemInput}
              errorEmail={errorEmail}
              message={message}
            />
          </Container>
        </TabPanel>
        <StudentSettingMenu handleClose={handleClose} anchorEl={anchorEl} />
      </>
    )
  }
}
