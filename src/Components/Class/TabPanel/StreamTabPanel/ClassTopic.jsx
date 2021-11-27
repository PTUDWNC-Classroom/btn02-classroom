import React from "react"
import { Paper, Typography } from "@mui/material"
import { styled } from "@mui/system"
import { grey } from "@mui/material/colors"

const StyledPaper = styled(Paper)(({ theme }) => ({
  border: `1px solid ${grey[300]}`,
  padding: theme.spacing(3),
}))

export default function ClassTopic() {
  return (
    <StyledPaper elevation={0}>
      <Typography variant="h5">Communicate with your class here</Typography>
    </StyledPaper>
  )
}
