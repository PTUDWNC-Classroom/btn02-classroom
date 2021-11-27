import React from "react"

import { Grid, Typography, IconButton } from "@mui/material"
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"

import { styled } from "@mui/system"
import { blue } from "@mui/material/colors"
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

const StudentTotal = ({ total }) => {
  if (total === 0) {
    return null
  } else if (total === 1) {
    return "1 student"
  } else {
    return `${total} students`
  }
}

export default function TeacherListTitle({ role, handleOpenPopup }) {
  const handleInviteTeacher = async () => {
    localStorage.setItem("inviteRole", "Teacher")

    handleOpenPopup(true)
  }

  return (
    <TeachersGrid container justifyContent="space-between" alignItems="center">
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
  )
}

export function StudentListTitle({ role, handleOpenPopup, studentTotal }) {
  const handleInviteStudent = async () => {
    localStorage.setItem("inviteRole", "Student")

    handleOpenPopup(true)
  }

  return (
    <StudentGrid container alignItems="center">
      <Grid item flexGrow={1}>
        <BlueTextTypography variant="h4">Students</BlueTextTypography>
      </Grid>
      <Grid item style={{ marginRight: 10 }}>
        <BlueTextTypography>
          <StudentTotal total={studentTotal} />
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
  )
}
