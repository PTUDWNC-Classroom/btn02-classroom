import React, { useEffect, useContext } from "react"
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
import GradeStruct from "./GradeStruct"
import { ClassroomContext } from "../../../../context/ClassroomContext"

export default function StreamTabPanel({ value, index }) {
  const { handleClassDetails, setRole, role, classDetails } =
    React.useContext(tabsContext)
  const { user } = useContext(ClassroomContext)
  let location = useLocation()
  const theme = useTheme()
  const matchUpMD = useMediaQuery(theme.breakpoints.up("md"))

  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        // GET /classes/:id
        const res = await axios.get(
          process.env.REACT_APP_HOST + location.pathname.replace("/", "")
        )

        const res2 = await axios.get(
          `${process.env.REACT_APP_HOST}classes/teachers-of-class/${res.data._id}`
        )

        handleClassDetails(res.data)
        document.title = res.data.className

        if (res.data.creator === user._id) {
          setRole("creator")
        } else {
          setRole("member")
        }

        const pos = res2.data.findIndex(
          (element) => element.userId === user._id
        )

        if (pos >= 0) {
          setRole("creator")
        } else {
          setRole("member")
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchClassDetail()
    // eslint-disable-next-line
  }, [location.pathname, user._id])

  return (
    <TabPanel value={value} index={index}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ClassInfo
              role={role}
              className={classDetails.className}
              section={classDetails.section}
              subject={classDetails.subject}
              room={classDetails.room}
              inviteCode={classDetails.inviteCode}
            />
          </Grid>

          {matchUpMD && (
            <Grid container item xs={3} spacing={2}>
              <Grid item xs={12}>
                <UpcommingTask />
              </Grid>
              <Grid item xs={12}>
                <GradeStruct />
              </Grid>
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
