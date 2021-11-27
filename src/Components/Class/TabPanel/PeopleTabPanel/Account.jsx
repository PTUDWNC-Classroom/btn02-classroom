import React from "react"
import Avatar from "@mui/material/Avatar"
import { Typography, Grid, Checkbox, IconButton } from "@mui/material"
import { styled } from "@mui/system"
import { grey } from "@mui/material/colors"
import MoreVertIcon from "@mui/icons-material/MoreVert"

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
  borderBottom: `1px solid ${grey[500]}`,
}))

export function StudentAccount({ userName, handleClick }) {
  return (
    <StyledGrid container>
      <Grid container item alignItems="center" spacing={1} xs={11}>
        <Grid item>
          <Checkbox />
        </Grid>
        <Grid item>
          <Avatar alt={userName} src="/user.svg" />
        </Grid>
        <Grid item>
          <Typography
            noWrap
            overflow="hidden"
            text-overflow="ellipsis"
            maxWidth={100}
          >
            {userName}
          </Typography>
        </Grid>
      </Grid>
      <Grid item textAlign="right" xs={1}>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      </Grid>
    </StyledGrid>
  )
}

export default function Account({ userName }) {
  return (
    <StyledGrid container>
      <Grid container item alignItems="center" spacing={1}>
        <Grid item>
          <Avatar alt={userName} src="/user.svg" />
        </Grid>
        <Grid item>
          <Typography>{userName}</Typography>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}
