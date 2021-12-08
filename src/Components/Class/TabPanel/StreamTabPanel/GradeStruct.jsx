import React, { useEffect, useState } from "react"
import axios from "axios"
import { Grid, Paper, Typography } from "@mui/material"
import { styled } from "@mui/system"
import { grey } from "@mui/material/colors"
import { useLocation } from "react-router"

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  border: `1px solid ${grey[300]}`,
}))

export default function GradeStruct() {
  const [gradeStruct, setGradeStruct] = useState([])
  const location = useLocation()
  const classId = location.pathname.split("/")[2]
  useEffect(() => {
    const getGradeStruct = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_HOST}assignment/getGradeAssignment`,
          { classId: classId }
        )

        if (res) {
          //console.log(res.data)
          setGradeStruct(res.data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    getGradeStruct()
  }, [classId])

  return (
    <StyledPaper elevation={0}>
      <Grid container direction="column" justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="body1">
            <b>Grade Struct</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {gradeStruct.length !== 0
            ? gradeStruct.map(({ gradeTitle, gradeDetail }, index) => {
                return (
                  <Typography key={index} variant="body2">
                    {gradeTitle}: {gradeDetail}
                  </Typography>
                )
              })
            : null}
        </Grid>
      </Grid>
    </StyledPaper>
  )
}
