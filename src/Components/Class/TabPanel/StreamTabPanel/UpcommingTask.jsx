import React from "react"

import { Grid, Paper, Typography, Button } from "@mui/material"
import { styled } from "@mui/system"
import { grey } from "@mui/material/colors"

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  border: `1px solid ${grey[300]}`,
}))

const ViewAllButton = styled(Button)`
  padding: 0;
`

export default function UpcommingTask() {
  return (
    <StyledPaper elevation={0}>
      <Grid container direction="column" justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="body1">
            <b>Upcomming</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">No work due soon</Typography>
        </Grid>
        <Grid container item justifyContent="flex-end">
          <ViewAllButton variant="text">View all</ViewAllButton>
        </Grid>
      </Grid>
    </StyledPaper>
  )
}
