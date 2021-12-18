import React, { useContext, useEffect, useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { tabsContext } from "../../context/TabsContext"
import { styled } from "@mui/system"
import GradeBoardTableHead from "./GradeBoardTableHead"
import InputTableCell from "./InputTableCell"
import classroomAxios from "../DataConnection/axiosConfig"
//import { CircularProgress } from "@mui/material"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ABB2B9",
}))

export default function GradeBoard() {
  const { gradeStruct, classDetails } = useContext(tabsContext)
  const [realStudentList, setRealStudentList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Call API to get real student list if class owner pre-uploade
  useEffect(() => {
    const getStudentList = async () => {
      try {
        const res = await classroomAxios.get(
          `assignment/real-student-list/${classDetails._id}`
        )
        setIsLoading(false)
        setRealStudentList(res.data)
      } catch (error) {
        console.error(error)
      }
    }

    getStudentList()
  }, [classDetails])

  return (
    <>
      <TableContainer component={Paper} elevation={6}>
        <Table sx={{ minWidth: 650 }} aria-label="grade board">
          <GradeBoardTableHead />
          {isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={2 + gradeStruct.length + 1} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {realStudentList.length > 0 ? (
                realStudentList[0].map((student, index) => (
                  <TableRow
                    key={student}
                    sx={{
                      "&:last-child td, &:last-child th": { borderBottom: 0 },
                    }}
                  >
                    <StyledTableCell>{student}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <b>{realStudentList[1][index]}</b>
                    </StyledTableCell>

                    {gradeStruct.length > 0 &&
                      gradeStruct.map((item, index2) => (
                        <InputTableCell
                          align="center"
                          key={index2}
                          initValue={item.gradeList[index].grade}
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
                    <i>You haven't uploaded your student list yet.</i>
                  </StyledTableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  )
}
