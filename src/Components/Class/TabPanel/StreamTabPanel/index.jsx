import React, { useState, useEffect } from "react"
import axios from "axios"
import { useLocation } from "react-router"

import { Grid, Container } from "@mui/material"

import ClassTopic from "./ClassTopic"
import ClassInfo from "./ClassInfo"
import UpcommingTask from "./UpcommingTask"
import ClassAnnoucement from "./ClassAnnounment"
import { tabsContext } from "../../../../context/TabsContext"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import TabPanel from ".."

export default function StreamTabPanel({ value, index }) {
  const [classInfo, setClassInfo] = useState({})
  const { handleClassDetails, setRole } = React.useContext(tabsContext)
  let location = useLocation()
  const theme = useTheme()
  const matchUpMD = useMediaQuery(theme.breakpoints.up("md"))

  console.log("userId")

  let userId = null
  if (localStorage.isSocialLogin) {
    userId = JSON.parse(localStorage.isSocialLogin)._id
  } else if (localStorage.isLogin) {
    console.log("vao localStorage")
    userId = JSON.parse(localStorage.isLogin)._id
  }
  console.log(userId)
  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        const res = await axios.get(
          process.env.REACT_APP_HOST + location.pathname.replace("/", "")
        )
        setClassInfo(res.data)
        handleClassDetails(res.data)

        document.title = res.data.className
        console.log("creatorId", res.data.creator)
        if (res.data.creator === userId) {
          localStorage.setItem("role", "creator")
          setRole("creator")
        } else {
          localStorage.setItem("role", "member")
          setRole("member")
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchClassDetail()
    // eslint-disable-next-line
  }, [userId])

  useEffect(() => {
    const fetchTeacherOfClass = async (classId) => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_HOST}classes/teachers-of-class/${classId}`
        )
        console.log(res.data)
        const pos = res.data.find((element) => element.userId === userId)
        console.log(pos)

        if (pos) {
          localStorage.setItem("role", "creator")
          setRole("creator")
        } else {
          localStorage.setItem("role", "member")
          setRole("member")
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (classInfo._id) fetchTeacherOfClass(classInfo._id)

    // eslint-disable-next-line
  }, [classInfo, userId])

  return (
    <TabPanel value={value} index={index}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ClassInfo
              role={localStorage.role}
              className={classInfo.className}
              section={classInfo.section}
              subject={classInfo.subject}
              room={classInfo.room}
              inviteCode={classInfo.inviteCode}
            />
          </Grid>

          {matchUpMD && (
            <Grid item xs={3}>
              <UpcommingTask />
            </Grid>
          )}

          <Grid container item md={9} sm={12} spacing={3}>
            <Grid item xs={12}>
              <ClassAnnoucement />
            </Grid>
            <Grid item xs={12}>
              <ClassTopic />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </TabPanel>
  )
}
