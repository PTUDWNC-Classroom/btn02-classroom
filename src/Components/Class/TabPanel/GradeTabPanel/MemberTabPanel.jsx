import {
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { styled } from '@mui/system'
import React, { useContext, useState } from 'react'
import { ClassroomContext } from '../../../../context/ClassroomContext'
import { tabsContext } from '../../../../context/TabsContext'
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useEffect } from 'react'
import classroomAxios from '../../../DataConnection/axiosConfig'
import { Link } from 'react-router-dom'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ABB2B9",
}))

const FixedTableCell = styled(StyledTableCell)(({ theme }) => ({
  border: "1px solid #ABB2B9",
  width: "10rem",
}))

const GradeTableCell = ({ personalGB, length }) => {
  if (personalGB?.existsStudentIdInList) {
    return (
      <>
        {personalGB?.grades?.gradeList.map((grade, index) => (
          <StyledTableCell align="right" key={index}>
            {grade.grade}
          </StyledTableCell>
        ))}
        <StyledTableCell align="right">
          {personalGB?.grades?.gradeTotal}
        </StyledTableCell>
      </>
    )
  } else {
    return (
      <TableCell colSpan={length + 1} align="center">
        <i style={{ color: "#ff0000" }}>
          Your student Id is not exist in student list of this class.
        </i>
      </TableCell>
    )
  }
}

const NoGradeBoard = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} textAlign="center">
        <Typography variant="h5" style={{ color: "#ff0000" }}>
          You cannot view personal grade board if you don't update your student ID.
        </Typography>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Typography variant="body1">
          <i>You can update it from <Link to="/profile">here</Link> or in your Profile.</i>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default function MemberTabPanel() {
  const { user } = useContext(ClassroomContext)
  const { gradeStruct, classDetails } = useContext(tabsContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const [personalGB, setPersonalGB] = useState(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  useEffect(() => {
    const getPersonalGradeBoard = async (classId) => {
      try {
        const res = await classroomAxios.get(`assignment/personal-grade-board/${classId}`)

        if (res) setPersonalGB(res.data)
      } catch (error) {
        console.error(error)
      }
    }

    getPersonalGradeBoard(classDetails._id)
  }, [classDetails._id])

  return (
    <div>
      {user.studentId === "" ? (<NoGradeBoard />) : (
        <>
          <TableContainer component={Paper} elevation={2}>
            <Table sx={{ minWidth: 650 }} aria-label="grade board">
              <TableHead>
                <TableRow>
                  <FixedTableCell>Student Id</FixedTableCell>
                  <FixedTableCell>Fullname</FixedTableCell>
                  {gradeStruct.length !== 0
                    ? gradeStruct.map((grade, index) => (
                      <StyledTableCell key={index}>
                        <Grid container direction={"column"}>
                          <Grid item>
                            <Grid
                              container
                              alignItems={"center"}
                              justifyContent={"space-between"}
                            >
                              <Grid item>{grade.gradeTitle}</Grid>
                              <Grid item>
                                <IconButton
                                  aria-label="menu of an assignment"
                                  aria-controls="menu-assignment"
                                  aria-haspopup="true"
                                  onClick={(e) => handleClick(e, grade._id)}
                                  color="inherit"
                                >
                                  <MoreVertIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid style={{ borderTop: "1px solid #ABB2B9" }}>
                            out of 100
                          </Grid>
                        </Grid>
                      </StyledTableCell>
                    ))
                    : null}
                  <StyledTableCell align="right">Total</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <StyledTableCell>
                    {user.studentId}
                  </StyledTableCell>
                  <StyledTableCell>
                    {user.username}
                  </StyledTableCell>
                  {/* {personalGB?.existsStudentIdInList ? (<p>render</p>) : (
                    <TableCell colSpan={gradeStruct.length + 1} align="center">
                      <i style={{ color: "#ff0000" }}> Your student Id is not exist in student list of this class.</i>
                    </TableCell>
                  )} */}
                  <GradeTableCell personalGB={personalGB} length={gradeStruct.length} />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Menu
            id="menu-class-setting"
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
            <MenuItem onClick={handleClose}>
              Request grade review
            </MenuItem>
          </Menu>
        </>
      )}
    </div>
  )
}
