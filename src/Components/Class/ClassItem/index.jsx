import React from "react"
import { Grid, Paper, IconButton, Typography, Tooltip } from "@mui/material"
import { styled } from "@mui/system"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import FolderIcon from "@mui/icons-material/Folder"
import MovingIcon from "@mui/icons-material/Moving"
import { blue, grey } from "@mui/material/colors"
import { Link as LinkRR } from "react-router-dom"
import axios from "axios"

const StyledInfoGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: blue[700],
  color: grey[50],
  padding: theme.spacing(2),
  borderRadius: "4px 4px 0 0",
}))

const MoreVertIconButton = styled(IconButton)`
  &:hover {
    background-color: ${blue[800]};
  }
`

const StyledLinkRR = styled(LinkRR)(({ theme }) => ({
  textOverflow: "ellipsis",
  overflow: "hidden",
  paddingTop: 0.5,
  color: grey[50],
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}))

export default function ClassItem({ id, className, section, handleClick }) {
  const [shadow, setShadow] = React.useState(2)
  const [studentList, setStudentList] = React.useState([])

  React.useEffect(() => {
    const getStudentList = async (classId) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST}classes/students-of-class/${classId}`
        )

        setStudentList(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    getStudentList(id)

    // eslint-disable-next-line
  }, [])

  return (
    <Grid item md={3} sm={6} xs={12}>
      <Paper
        elevation={shadow}
        onMouseEnter={() => setShadow(6)}
        onMouseLeave={() => setShadow(2)}
      >
        <StyledInfoGrid
          container
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Grid container item xs={10} minHeight="60px">
            <StyledLinkRR to={`/classes/${id}`}>
              <Grid item xs={12}>
                <Tooltip title={className}>
                  <Typography variant="h6" noWrap textAlign="left">
                    {className}
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid item>
                <Typography variant="body1" noWrap textAlign="left">
                  {section}
                </Typography>
              </Grid>
            </StyledLinkRR>
          </Grid>

          <Grid item xs={2} textAlign="right">
            <MoreVertIconButton
              aria-label="menu of class setting"
              aria-controls="menu-class-setting"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <MoreVertIcon />
            </MoreVertIconButton>
          </Grid>
          <Grid item xs={12} textAlign="left" mt={1}>
            {studentList.length}
            {studentList.length <= 1 ? " student" : " students"}
          </Grid>
        </StyledInfoGrid>

        <Grid
          container
          alignItems="center"
          justifyContent="flex-start"
          sx={{ padding: 4 }}
        ></Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="flex-end"
          sx={{ padding: 1, borderTop: "2px solid #eeeeee" }}
        >
          <Grid item>
            <IconButton>
              <MovingIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <FolderIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}
