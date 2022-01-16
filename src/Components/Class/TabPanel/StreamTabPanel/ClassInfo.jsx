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
  code
}) {
  const [showInfoBtn, setShowInfoBtn] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [copy, setCopy] = useState(false)
  const [copyCode, setCopyCode] = useState(false)
  const location = window.location.href.split("/classes")[0]
  const theme = useTheme()

  const handleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleCopyClassCode = (location) => {
    navigator.clipboard.writeText(location + `/join-student/${inviteCode}`)
    setCopy(true)
  }

  const handleCopyCode = ()=>{
    navigator.clipboard.writeText(code)
    setCopyCode(true)
  }

  const handleResetCopyState = () => {
    setCopy(false)
    setCopyCode(false)
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
            <Stack direction="column" spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  display="block"
                  variant="h6"
                  noWrap
                  overflow="hidden"
                  text-overflow="ellipsis"
                >
                  <b>Invitation link:</b>{" "}
                  {location + `/join-student/${inviteCode}`}
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
              
              <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                display="block"
                variant="h6"
                noWrap
                overflow="hidden"
                text-overflow="ellipsis"
              >
                <b>Invitation Code:</b>{" "}
                {`${code}`}
              </Typography>
                <Tooltip title={copyCode ? "Copied!" : "Click to copy"}>
                  <IconButton
                    sx={{ color: grey[50] }}
                    onClick={() => handleCopyCode()}
                    onMouseLeave={handleResetCopyState}
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>

              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </StyledPaper >
    )
}
