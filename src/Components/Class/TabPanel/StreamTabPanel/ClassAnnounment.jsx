import React from "react"
import { Paper, Avatar, Stack, Typography } from "@mui/material"
import { styled } from "@mui/system"
import { grey } from "@mui/material/colors"

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  border: `1px solid ${grey[300]}`,
}))

export default function ClassAnnounment({ avatar }) {
  return (
    <StyledPaper>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar src="/user.svg" />{" "}
        <Typography> Annonuce something to your class</Typography>
      </Stack>
    </StyledPaper>
  )
}
