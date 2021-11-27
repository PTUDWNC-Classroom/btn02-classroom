import React, { useState, useEffect } from "react"

import {
  Grid,
  Paper,
  IconButton,
  Typography,
  Stack,
  Tooltip,
} from "@mui/material"
import { styled } from "@mui/system"
import { grey, blue } from "@mui/material/colors"
import InfoIcon from "@mui/icons-material/Info"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { useTheme } from "@mui/material/styles"

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: blue[700],
  color: grey[50],
}))

const InfoGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#000",
  padding: theme.spacing(3),
  borderRadius: "0 0 4px 4px",
}))

const StyledTypography = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ShowDetail = ({ subject, room }) => {
  const theme = useTheme()

  return (
    <InfoGrid item xs style={{ padding: theme.spacing(3) }}>
      {subject && (
        <StyledTypography variant="body1">
          <b>Topic: </b>
          {subject}
        </StyledTypography>
      )}
      {room && (
        <StyledTypography variant="body1">
          <b>Room:</b> {room}
        </StyledTypography>
      )}
    </InfoGrid>
  )
}

export default function ClassInfo({
  role,
  className,
  section,
  subject,
  room,
  inviteCode,
}) {
  const [showInfoBtn, setShowInfoBtn] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [copy, setCopy] = useState(false)
  const location = window.location.href.split("/classes")[0]
  const theme = useTheme()

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleCopyClassCode = (location) => {
    navigator.clipboard.writeText(location + `/join-Student/${inviteCode}`)
    setCopy(true)
  }

  const handleResetCopyState = () => {
    setCopy(false)
  }

  useEffect(() => {
    if (subject || room) {
      setShowInfoBtn(true)
    }
  }, [subject, room])

  if (role === "member") {
    return (
      <StyledPaper elevation={6}>
        <Grid
          container
          alignItems="flex-end"
          style={{ minHeight: 180, padding: theme.spacing(3) }}
        >
          <Grid item xs={11}>
            <StyledTypography variant="h4">{className}</StyledTypography>
            <StyledTypography variant="h6">{section}</StyledTypography>
          </Grid>

          {showInfoBtn && (
            <Grid container item xs={1} justifyContent="flex-end">
              <Tooltip title="View class information">
                <IconButton
                  aria-label="display topic and room"
                  onClick={handleShowDetails}
                >
                  <InfoIcon sx={{ color: grey[50] }} />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
        </Grid>
        {showDetails && <ShowDetail subject={subject} room={room} />}
      </StyledPaper>
    )
  } else
    return (
      <StyledPaper elevation={6}>
        <Grid
          container
          alignItems="flex-start"
          style={{ minHeight: 180, padding: theme.spacing(3) }}
          direction="row"
        >
          <Grid item xs={12}>
            <StyledTypography variant="h4">{className}</StyledTypography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                display="block"
                variant="h6"
                noWrap
                overflow="hidden"
                text-overflow="ellipsis"
              >
                <b>Invitation link:</b> {location + `/join-Student/${inviteCode}`}
              </Typography>
              <Tooltip title={copy ? "Copied!" : "Click to copy"}>
                <IconButton
                  sx={{ color: grey[50] }}
                  onClick={() => handleCopyClassCode(location)}
                  onMouseLeave={handleResetCopyState}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      </StyledPaper>
    )
}
