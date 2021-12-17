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
import InputTableCell from "./InputTableCell"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ABB2B9",
}))

export default function GradeBoard() {
  const { gradeStruct } = useContext(tabsContext)
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

  // Call API to get real student list if class owner pre-uploaded

  return (
    <>
      <TableContainer component={Paper} elevation={6}>
        <Table sx={{ minWidth: 650 }} aria-label="grade board">
          <GradeBoardTableHead />
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
                      <InputTableCell
                        align="center"
                        key={index}
                        initValue={grade}
                      />
                    ))}
                  <StyledTableCell>0</StyledTableCell>
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
    </>
  )
}
