import React from "react"
import {
  Grid,
  Typography,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
} from "@mui/material"

import EditIcon from "@mui/icons-material/Edit"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

import CancelButton from "../Button/CancelButton"

export function EditIDActionListItem({ handleEdit, handleAddStudentId }) {
  return (
    <ListItem>
      <Grid container alignItems="center">
        <Grid item sm={3}></Grid>
        <Grid item>
          <CancelButton
            variant="outlined"
            onClick={handleEdit}
            style={{ marginRight: "1rem" }}
          >
            Cancel
          </CancelButton>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={handleAddStudentId}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default function StudentIDListItem({
  edit,
  studentId,
  handleEdit,
  handleChangeStudentId,
  handleAddStudentId,
}) {
  const theme = useTheme()
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <>
      <ListItem>
        <Grid container alignItems="center">
          {matchDownSM ? (
            <>
              <Grid item xs>
                <ListItemText>
                  <b>Student ID</b>
                </ListItemText>
              </Grid>
              {!studentId && (
                <Grid item xs={1}>
                  <IconButton onClick={handleEdit}>
                    <EditIcon />
                  </IconButton>
                </Grid>
              )}
              <Grid item xs={12}>
                {edit ? (
                  <TextField
                    size="small"
                    fullWidth
                    value={studentId}
                    onChange={handleChangeStudentId}
                    helperText="You have 1 time to enter your student ID"
                    autoFocus
                  />
                ) : (
                  <Typography variant="subtitle1">{studentId}</Typography>
                )}
              </Grid>
            </>
          ) : (
            <>
              <Grid item sm={3} xs={12}>
                <ListItemText>
                  <b>Student ID</b>
                </ListItemText>
              </Grid>

              <Grid item sm={8} xs={11}>
                {edit ? (
                  <TextField
                    size="small"
                    value={studentId}
                    onChange={handleChangeStudentId}
                    helperText="You have 1 time to enter your student ID"
                    autoFocus
                  />
                ) : (
                  <Typography variant="subtitle1">{studentId}</Typography>
                )}
              </Grid>
              {!studentId && (
                <Grid item xs={1}>
                  <IconButton onClick={handleEdit}>
                    <EditIcon />
                  </IconButton>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </ListItem>
      {edit && (
        <EditIDActionListItem
          handleEdit={handleEdit}
          handleAddStudentId={handleAddStudentId}
        />
      )}
    </>
  )
}
