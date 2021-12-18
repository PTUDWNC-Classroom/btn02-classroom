import React, { useState } from "react"
import InputAdornment from "@mui/material/InputAdornment"
import FormControl from "@mui/material/FormControl"
import { Grid, TableCell, Input } from "@mui/material"

import { styled } from "@mui/system"
import classroomAxios from "../DataConnection/axiosConfig"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ABB2B9",
  height: "4rem",
  width: "8rem",
  padding: 0,
}))

export default function InputTableCell({ studentId, assignmentId, initValue }) {
  const [grade, setGrade] = useState(initValue)
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [isNull, setIsNull] = useState(initValue === "" ? true : false)

  const handleChangeGrade = (e) => {
    setGrade(e.target.value)
  }

  const handleClickInCell = () => {
    if (isNull) {
      setIsDisplayed(false)
    } else setIsDisplayed(true)
  }

  const handleSubmit = async (e) => {
    let value = parseFloat(e.target.value)

    if (isNaN(value) || value < 0 || value > 100) {
      // validate
      setGrade("")
      value = ""
      setIsNull(true)
      setIsDisplayed(false)
    } else {
      setGrade(value)
      setIsNull(false)
    }

    if (value === grade) {
      setIsDisplayed(false)
      setIsNull(true)
      return
    }

    try {
      console.log(value)
      console.log(studentId, assignmentId)
      const res = await classroomAxios.put("assignment/update-grade", {
        studentId: studentId,
        assignmentId: assignmentId,
        grade: value,
      })
      if (value !== "") setIsDisplayed(true)
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  if (isNaN(parseFloat(initValue))) {
    return (
      <StyledTableCell
        onMouseEnter={() => setIsDisplayed(true)}
        onMouseDown={() => handleClickInCell()}
      >
        {isDisplayed && (
          <Grid container justifyContent="center" p="auto">
            <Grid item>
              <FormControl variant="standard" sx={{ width: "6rem" }}>
                <Input
                  value={grade}
                  onChange={handleChangeGrade}
                  id="standard-adornment-grade"
                  onBlur={handleSubmit}
                  min="0"
                  max="100"
                  size="small"
                  endAdornment={
                    <InputAdornment position="end">/100</InputAdornment>
                  }
                  aria-describedby="standard-grade-helper-text"
                  inputProps={{
                    "aria-label": "grade",
                    style: { textAlign: "right" },
                    autoFocus: true,
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        )}
      </StyledTableCell>
    )
  } else {
    return (
      <StyledTableCell>
        <Grid container justifyContent="center" p="auto">
          <Grid item>
            <FormControl variant="standard" sx={{ width: "6rem" }}>
              <Input
                value={grade}
                onChange={handleChangeGrade}
                id="standard-adornment-grade"
                onBlur={handleSubmit}
                min="0"
                max="100"
                size="small"
                endAdornment={
                  <InputAdornment position="end">/100</InputAdornment>
                }
                aria-describedby="standard-grade-helper-text"
                inputProps={{
                  "aria-label": "grade",
                  style: { textAlign: "right" },
                  autoFocus: true,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </StyledTableCell>
    )
  }
}
