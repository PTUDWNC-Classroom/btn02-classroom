import React, { useContext, useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { tabsContext } from "../../context/TabsContext"
import { MenuItem, Menu, Divider } from "@mui/material"
import { styled } from "@mui/system"
import GradeBoardTableHead from "./GradeBoardTableHead"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ABB2B9",
}))

const AssignmentMenu = ({ handleClose, anchorEl }) => {
  return (
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
      <MenuItem onClick={handleClose}>Upload</MenuItem>
      <MenuItem onClick={handleClose}>Download</MenuItem>
      <Divider />
      <MenuItem onClick={handleClose}>Return all</MenuItem>
    </Menu>
  )
}

export default function GradeBoard() {
  const { gradeStruct } = useContext(tabsContext)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  // fake data
  //const realStudentList = []
  const realStudentList = [
    {
      studentId: 1,
      fullName: "Nguyen Van A",
      grades: [10, 9.5, 9],
    },
    {
      studentId: 2,
      fullName: "Nguyen Van B",
      grades: [10, 9.5, 9],
    },
    {
      studentId: 3,
      fullName: "Nguyen Van C",
      grades: [10, 9.5, 9],
    },
  ]

  return (
    <>
      <TableContainer component={Paper} elevation={6}>
        <Table sx={{ minWidth: 650 }} aria-label="grade board">
          <GradeBoardTableHead handleClick={handleClick} />
          <TableBody>
            {realStudentList.length > 0 ? (
              realStudentList.map((student) => (
                <TableRow
                  key={student.studentId}
                  sx={{
                    "&:last-child td, &:last-child th": { borderBottom: 0 },
                  }}
                >
                  <StyledTableCell component="th" scope="row">
                    <b>{student.fullName}</b>
                  </StyledTableCell>
                  <StyledTableCell>{student.studentId}</StyledTableCell>
                  {gradeStruct.length > 0 &&
                    student.grades.map((grade, index) => (
                      <StyledTableCell align="center" key={index}>
                        {grade}
                      </StyledTableCell>
                    ))}
                  <StyledTableCell align="center">0</StyledTableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <StyledTableCell
                  colSpan={2 + gradeStruct.length + 1}
                  align="center"
                >
                  <i>Chưa upload danh sách sinh viên</i>
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <AssignmentMenu handleClose={handleClose} anchorEl={anchorEl} />
    </>
  )
}
