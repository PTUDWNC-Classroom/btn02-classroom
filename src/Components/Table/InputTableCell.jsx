import React, { useState, useContext, useEffect } from "react"
import InputAdornment from "@mui/material/InputAdornment"
import FormControl from "@mui/material/FormControl"
import { Grid, TableCell, Input, IconButton } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check';
import { styled } from "@mui/system"
import classroomAxios from "../DataConnection/axiosConfig"
import { tabsContext } from "../../context/TabsContext"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ABB2B9",
  height: "4rem",
  width: "10rem",
  padding: 0,
}))

export default function InputTableCell({ studentId, assignmentId, initValue, pos }) {
  const [grade, setGrade] = useState(initValue)
  const [isDisplayed, setIsDisplayed] = useState(isNaN(parseFloat(initValue)) ? false : true)
  const [isNull, setIsNull] = useState(initValue === "" ? true : false)
  const [originalGrade, setOriginalGrade] = useState(initValue)
  const [showEdit, setShowEdit] = useState(false)
  const { updateTotalGradeCol, classDetails } = useContext(tabsContext)

  //console.log("render input cell")
  const handleChangeGrade = (e) => {
    setGrade(e.target.value)
    if (e.target.value !== "") {
      setIsNull(false)
    } else {
      setIsDisplayed(false)
      setIsNull(true)
    }
  }

  const handleMouseLeave = () => {
    if (isNull) {
      setIsDisplayed(false)
    } else {
      setIsDisplayed(true)
      setGrade(originalGrade)
    }
    setShowEdit(false)
  }

  const handleMouseEnter = () => {
    setIsDisplayed(true)
    setShowEdit(true)
  }

  const handleSubmit = async (e) => {
    let value = parseFloat(grade)

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

    if ("" === grade) {
      setIsDisplayed(false)
      setIsNull(true)
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

      //console.log(res.data)
      updateTotalGradeCol(res.data)

      if (value !== "") setIsDisplayed(true)

      setOriginalGrade(value)
    } catch (error) {
      console.error(error)
    }
  }

  if (isNaN(parseFloat(initValue))) {
    return (
      <StyledTableCell
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
      >
        {isDisplayed && (
          <Grid container justifyContent="center" p="auto">
            <Grid item>
              <FormControl variant="standard" sx={{ width: "8rem" }}>
                <Input
                  value={grade}
                  onChange={handleChangeGrade}
                  id="standard-adornment-grade"
                  //onBlur={handleSubmit}
                  min="0"
                  max="100"
                  size="small"
                  startAdornment={<InputAdornment position="start">
                    <IconButton onClick={handleSubmit} color="success"><CheckIcon /></IconButton>
                  </InputAdornment>}
                  endAdornment={
                    <InputAdornment position="end">/100</InputAdornment>
                  }
                  aria-describedby="standard-grade-helper-text"
                  inputProps={{
                    "aria-label": "grade",
                    style: { textAlign: "right" },
                    autoFocus: true,
                    inputMode: 'numeric'
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
      <StyledTableCell
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() => handleMouseLeave()}
      >
        <Grid container justifyContent="center" p="auto">
          <Grid item>
            <FormControl variant="standard" sx={{ width: "8rem" }}>
              <Input
                value={grade}
                onChange={handleChangeGrade}
                id="standard-adornment-grade"
                //onBlur={handleSubmit}
                min="0"
                max="100"
                size="small"
                startAdornment={<InputAdornment position="start">
                  <IconButton onClick={handleSubmit}>{showEdit && <CheckIcon />}</IconButton>
                </InputAdornment>}
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
