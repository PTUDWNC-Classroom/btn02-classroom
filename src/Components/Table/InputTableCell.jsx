import React, { useState, useContext, useEffect } from "react"
import InputAdornment from "@mui/material/InputAdornment"
import FormControl from "@mui/material/FormControl"
import { Grid, TableCell, Input, IconButton } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import { styled } from "@mui/system"
import classroomAxios from "../DataConnection/axiosConfig"
import { tabsContext } from "../../context/TabsContext"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ABB2B9",
  height: "4rem",
  width: "10rem",
  padding: 0,
}))

export default function InputTableCell({ studentId, assignmentId, initValue }) {
  const { updateTotalGradeCol, classDetails, updateGradeStruct } =
    useContext(tabsContext)
  const [grade, setGrade] = useState(initValue)
  const [originalGrade, setOriginalGrade] = useState(initValue)
  const [showEdit, setShowEdit] = useState(false)

  const handleChangeGrade = (e) => {
    setGrade(e.target.value)
  }

  const handleSubmit = async (e) => {
    let value = parseFloat(grade)

    if (isNaN(value) || value < 0 || value > 100) {
      // validate
      setGrade("")
      value = ""
    } else {
      setGrade(value)
    }

    if ("" === grade || grade === originalGrade) {
      return
    }

    try {
      await classroomAxios.put("assignment/update-grade", {
        studentId: studentId,
        assignmentId: assignmentId,
        grade: value,
      })

      const res = await classroomAxios.get(
        `assignment/total-grade-column/${classDetails._id}`
      )

      const response = await classroomAxios.post(
        `assignment/getGradeAssignment`,
        {
          classId: classDetails._id,
        }
      )
      if (response) {
        updateGradeStruct(response.data)
      }

      updateTotalGradeCol(res.data)

      setOriginalGrade(value)
    } catch (error) {
      console.error(error)
    }
  }

  const handleMouseLeave = () => {
    setShowEdit(false)
    setGrade(originalGrade)
  }

  const handleMouseEnter = () => {
    setShowEdit(true)
  }

  useEffect(() => {
    setGrade(initValue)
  }, [initValue])

  return (
    <StyledTableCell
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseLeave()}
    >
      <Grid container justifyContent="center" p="auto">
        <Grid item>
          <FormControl variant="standard" sx={{ width: "8rem" }}>
            <Input
              id="standard-adornment-grade"
              //onBlur={handleSubmit}
              min="0"
              max="100"
              size="small"
              name="grade"
              startAdornment={
                <InputAdornment position="start">
                  <IconButton onClick={handleSubmit}>
                    {showEdit && <CheckIcon />}
                  </IconButton>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">/100</InputAdornment>
              }
              aria-describedby="standard-grade-helper-text"
              inputProps={{
                "aria-label": "grade",
                style: { textAlign: "right" },
                autoFocus: true,
                value: `${grade}`,
                onChange: handleChangeGrade,
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </StyledTableCell>
  )
}
