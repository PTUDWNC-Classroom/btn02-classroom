import React, { useEffect, useCallback, useState } from "react"
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  ListItem,
  List,
  ListItemText,
  Button,
} from "@mui/material"
import { styled } from "@mui/system"
import { useHistory, useLocation } from "react-router"
import classroomAxios from "../../Components/DataConnection/axiosConfig"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}))

export default function MemberDetails() {
  const [memberDetails, setMemberDetails] = useState({})
  let location = useLocation()
  let history = useHistory()

  const goBack = useCallback(() => {
    history.goBack()
  }, [history])


  useEffect(() => {
    const getMemberDetail = async () => {
      try {
        const response = await classroomAxios.get("classes" + location.pathname)
        setMemberDetails(response.data)
        
      } catch (error) {
        console.error(error)
      }
    }

    getMemberDetail()
  }, [location.pathname])

  useEffect(() => {
    document.title = "Member details"
  }, [])

  return (
    <Grid container justifyContent="center" spacing={3}>
      <Grid container item xs={12} alignItems="center" direction="column">
        <Grid>
          <Avatar
            sx={{ width: "5rem", height: "5rem", marginBottom: "1rem" }}
            src="/user.svg"
          />
        </Grid>
        <Grid item>
          <Typography variant="h5">{memberDetails.username}</Typography>
        </Grid>
      </Grid>

      <Grid item md={6} xs={12}>
        <StyledPaper elevation={1}>
          <Grid container spacing={1}>
            <Grid item xs>
              <Typography variant="h5">Member details</Typography>
            </Grid>

            <Grid item xs={12}>
              <List>
              <ListItem>
                  <Grid container alignItems="center">
                    <Grid item sm={3} xs={12}>
                      <ListItemText>
                        <b>Fullname</b>
                      </ListItemText>
                    </Grid>
                    <Grid item sm={9} xs={12}>
                      <Typography variant="subtitle1">{memberDetails?.fullName}</Typography>
                    </Grid>
                  </Grid>
                  <ListItemText />
                </ListItem>
                <ListItem>
                  <Grid container alignItems="center">
                    <Grid item sm={3} xs={12}>
                      <ListItemText>
                        <b>Email</b>
                      </ListItemText>
                    </Grid>
                    <Grid item sm={9} xs={12}>
                      <Typography variant="subtitle1">{memberDetails?.email}</Typography>
                    </Grid>
                  </Grid>
                  <ListItemText />
                </ListItem>
                <ListItem>
                  <Grid container alignItems="center">
                    <Grid item sm={3} xs={12}>
                      <ListItemText>
                        <b>Student Id</b>
                      </ListItemText>
                    </Grid>
                    <Grid item sm={9} xs={12}>
                      <Typography variant="subtitle1">{memberDetails?.studentId}</Typography>
                    </Grid>
                  </Grid>
                  <ListItemText />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </StyledPaper>
      </Grid>

      <Grid item xs={12} textAlign={"center"}>
        <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={goBack}>Back</Button>
      </Grid>
    </Grid>
  )
}
