import React, { useState } from "react"
import InputAdornment from "@mui/material/InputAdornment"
import FormControl from "@mui/material/FormControl"
import { Grid, TableCell, Input } from "@mui/material"

import { styled } from "@mui/system"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ABB2B9",
  height: "4rem",
  width: "8rem",
  padding: 0,
}))

export default function InputTableCell({ studentId, assignmentId, initValue }) {
  const [grade, setGrade] = useState(initValue)

  const handleChangeGrade = (e) => {
    setGrade(e.target.value)
  }

  const handleSubmit = (e) => {
    const value = parseFloat(e.target.value)
    // validate
    if (isNaN(value) || value < 0 || value > 100) {
      setGrade("")
      return
    }

    // send data
    console.log(value)
  }

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
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </StyledTableCell>
  )
}
