import React from "react"
import Avatar from "@mui/material/Avatar"
import { Typography, Grid, Checkbox, IconButton } from "@mui/material"
import { styled } from "@mui/system"
import { grey } from "@mui/material/colors"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Link } from "react-router-dom"
import { blue } from '@mui/material/colors';

const StyledGrid = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
  borderBottom: `1px solid ${grey[500]}`,
}))

const StyledLink = styled(Link)(({ theme }) => ({
  textDecorationLine: "none",
  color: "#000",
  "&:hover": {
    color: blue[500],
    textDecorationLine: "underline"
  }
}))


export function StudentAccount({ userName, handleClick, userId, classId }) {
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
            maxWidth={300}
          >
            <StyledLink to={`/${classId}/member-details/${userId}`}>{userName}</StyledLink>
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

export default function Account({ userName, userId, classId }) {
  return (
    <StyledGrid container>
      <Grid container item alignItems="center" spacing={1}>
        <Grid item>
          <Avatar alt={userName} src="/user.svg" />
        </Grid>
        <Grid item>
          <Typography
            noWrap
            overflow="hidden"
            text-overflow="ellipsis"
            maxWidth={300}
          >
            <StyledLink to={`/${classId}/member-details/${userId}`} >
              {userName}
            </StyledLink>
          </Typography>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}
