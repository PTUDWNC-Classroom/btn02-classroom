import React, { useEffect, useContext } from "react"
import classroomAxios from "../../../DataConnection/axiosConfig"
import { Grid, Paper, Typography } from "@mui/material"
import { styled } from "@mui/system"
import { grey } from "@mui/material/colors"
import { useLocation } from "react-router"
import { tabsContext } from "../../../../context/TabsContext"

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  border: `1px solid ${grey[300]}`,
}))

export default function GradeStruct() {
  const { gradeStruct, updateGradeStruct } = useContext(tabsContext)
  const location = useLocation()
  const classId = location.pathname.split("/")[2]
  useEffect(() => {
    const getGradeStruct = async () => {
      try {
        const res = await classroomAxios.post(`assignment/getGradeAssignment`, {
          classId: classId,
        })

        if (res) {
          //console.log(res.data)
          updateGradeStruct(res.data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    getGradeStruct()
    // eslint-disable-next-line
  }, [classId])

  return (
    <StyledPaper elevation={0}>
      <Grid container direction="column" justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="body1">
            <b>Grade Structure</b>
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
