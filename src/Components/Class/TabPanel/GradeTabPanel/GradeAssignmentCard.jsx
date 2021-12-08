import React, { useState } from "react"
import Grid from "@mui/material/Grid"
import BorderColorIcon from "@mui/icons-material/BorderColor"
import { Button, Paper, Stack, TextField } from "@mui/material"
import { Add, Delete, Save } from "@mui/icons-material"
import axios from "axios"

export function GradeAssignmentCard({
  _id,
  gradeTitle,
  gradeDetail,
  disableState,
  index,
  handleDisable,
  setOpen,
}) {
  const [gradeTitleState, setGradeTitle] = useState(gradeTitle)
  const [gradeDetailState, setGradeDetail] = useState(gradeDetail)

  const handleChangeGradeTitle = (e) => {
    setGradeTitle(e.target.value)
  }

  const handleChangeGradeDetail = (e) => {
    setGradeDetail(e.target.value)
  }

  const handleUpdate = async (_id) => {
    //console.log(gradeTitleState);
    //console.log(gradeDetailState);
    // Update gradeTitleState và gradeDetailState
    // theo đường dẫn /assignment/updateAssignment
    const UpdateAssignment = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_HOST}assignment/updateAssignment`,
          {
            classId: "vd",
            _id: _id,
            gradeTitle: gradeTitleState,
            gradeDetail: gradeDetailState,
          }
        )
        if (response) {
          setOpen(true)
          return true
        }
      } catch (error) {
        console.error(error)
      }
    }

    //console.log(await UpdateAssignment());
    UpdateAssignment()
  }

  const handleDelete = async (_id) => {
    //console.log(gradeTitleState)
    //console.log(gradeDetailState)
    // Update gradeTitleState và gradeDetailState
    // theo đường dẫn /assignment/deleteAssignment
    const DeleteAssignment = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_HOST}assignment/deleteAssignment`,
          {
            classId: "vd",
            _id: _id,
          }
        )
        if (response) {
          setOpen(true)
          return true
        }
      } catch (error) {
        console.error(error)
      }
    }

    //console.log(await DeleteAssignment());
    DeleteAssignment()
  }
  return (
    <Grid container wrap="nowrap" spacing={4}>
      <Grid item xs zeroMinWidth>
        <Stack component="form" spacing={2} noValidate autoComplete="off">
          <TextField
            hiddenLabel
            disabled={disableState}
            //defaultValue={gradeTitle}
            variant="filled"
            size="small"
            value={gradeTitleState}
            onChange={handleChangeGradeTitle}
          />
          <TextField
            hiddenLabel
            disabled={disableState}
            //defaultValue={gradeDetail}
            variant="filled"
            size="small"
            value={gradeDetailState}
            onChange={handleChangeGradeDetail}
          />
        </Stack>
      </Grid>
      <Grid item>
        <Stack>
          {disableState ? (
            <Button
              onClick={() => {
                //console.log(index)
                handleDisable(_id)
              }}
            >
              <BorderColorIcon />
            </Button>
          ) : (
            <Button
              color="success"
              onClick={() => {
                //console.log(index)
                handleDisable(_id)
                handleUpdate(_id)
              }}
            >
              <Save />
            </Button>
          )}
          <Button
            color="error"
            onClick={() => {
              handleDelete(_id)
            }}
          >
            <Delete />
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}

export function AddGradeAssignmentCard({ setOpen, classId }) {
  const [gradeTitle, setGradeTitle] = useState("")
  const [gradeDetail, setGradeDetail] = useState("")

  const handleChangeGradeTitle = (e) => {
    setGradeTitle(e.target.value)
  }

  const handleChangeGradeDetail = (e) => {
    setGradeDetail(e.target.value)
  }
  const handleSubmit = async () => {
    if (gradeTitle === "") {
      alert("Grade title cannot be left blank!")
      return
    }
    if (gradeDetail === "") {
      alert("Grade detail cannot be left blank!")
      return
    }
    // console.log(gradeTitle)
    //console.log(gradeDetail)
    // Truyền gradeTitle gradeDetail về API để AddAssignment theo
    // đường dẫn /assignment/addAssignment
    const AddAssignment = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_HOST}assignment/addAssignment`,
          {
            classId: classId,
            gradeTitle: gradeTitle,
            gradeDetail: gradeDetail,
          }
        )
        if (response) {
          setOpen(true)
          setGradeTitle("")
          setGradeDetail("")
          //updateCharacters(data)
          return true
        }
      } catch (error) {
        console.error(error)
      }
    }

    //console.log(await AddAssignment())
    AddAssignment()
  }
  return (
    <Paper
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, my: 1, mx: "auto", p: 2 }}
    >
      <Grid container wrap="nowrap" spacing={4}>
        <Grid item xs zeroMinWidth>
          <Stack component="form" spacing={2} noValidate autoComplete="off">
            <TextField
              hiddenLabel
              variant="filled"
              size="small"
              value={gradeTitle}
              onChange={handleChangeGradeTitle}
              required
            />
            <TextField
              hiddenLabel
              variant="filled"
              size="small"
              value={gradeDetail}
              onChange={handleChangeGradeDetail}
              required
              type="number"
            />
          </Stack>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            onClick={() => {
              handleSubmit()
            }}
          >
            <Add />
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}
