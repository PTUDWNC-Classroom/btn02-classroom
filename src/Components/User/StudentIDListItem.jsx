import React, { useContext } from "react"
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
import { useForm } from "react-hook-form"
import classroomAxios from "../DataConnection/axiosConfig"
import { yupResolver } from "@hookform/resolvers/yup"

import * as yup from "yup"
import { ClassroomContext } from "../../context/ClassroomContext"

const schema = yup.object().shape({
  studentId: yup.string().required("Please enter your student ID!"),
})

export function EditIDActionListItem({ handleEdit }) {
  return (
    <ListItem>
      <Grid container alignItems="center">
        <Grid item sm={3}></Grid>
        <Grid item>
          <CancelButton
            variant="outlined"
            onClick={handleEdit}
            style={{ marginRight: "1rem" }}
            type="reset"
          >
            Cancel
          </CancelButton>
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" type="submit">
            Save
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default function StudentIDListItem({ studentId, handleAddStudentId }) {
  const theme = useTheme()
  const { login, user } = useContext(ClassroomContext)
  const [edit, setEdit] = React.useState(false)
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"))
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleEdit = () => {
    clearErrors("studentId")
    setEdit(!edit)
  }

  const onSubmit = async (data) => {
    try {
      //console.log(data)
      const response = await classroomAxios.post(`user/add-student-id`, {
        //userId: user._id,
        studentId: data.studentId,
      })

      if (response) {
        localStorage.setItem("isSocialLogin", JSON.stringify(response.data))
      }
      login(response.data)
      setEdit(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                    <>
                      <TextField
                        {...register("studentId")}
                        size="small"
                        fullWidth
                        helperText="You have 1 time to enter your student ID"
                        //autoFocus
                      />
                      {errors.studentId && (
                        <Typography color="error">
                          {errors.studentId?.message}
                        </Typography>
                      )}
                    </>
                  ) : (
                    <Typography variant="subtitle1">
                      {user.studentId}
                    </Typography>
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
                      {...register("studentId")}
                      size="small"
                      helperText="You have 1 time to enter your student ID"
                      autoFocus
                    />
                  ) : (
                    <Typography variant="subtitle1">
                      {user.studentId}
                    </Typography>
                  )}
                </Grid>

                {!user.studentId && (
                  <Grid item xs={1}>
                    <IconButton onClick={handleEdit}>
                      <EditIcon />
                    </IconButton>
                  </Grid>
                )}
                <Grid item sm={3} xs={12}></Grid>
                <Grid item sm={8} xs={11}>
                  {errors.studentId && (
                    <Typography color="error">
                      {errors.studentId?.message}
                    </Typography>
                  )}
                </Grid>
              </>
            )}
          </Grid>
        </ListItem>
        {edit && (
          <EditIDActionListItem
            handleEdit={() => handleEdit()}
            handleAddStudentId={handleAddStudentId}
          />
        )}
      </form>
    </>
  )
}
