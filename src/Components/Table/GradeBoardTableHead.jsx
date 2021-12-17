import React, { useContext, useState, useEffect } from "react"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { tabsContext } from "../../context/TabsContext"
import { Divider, Grid, IconButton, MenuItem, Menu, Input } from "@mui/material"
import { styled } from "@mui/system"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { CSVLink } from "react-csv"
import Papa from "papaparse"
import classroomAxios from "../DataConnection/axiosConfig"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ABB2B9",
}))

const FixedTableCell = styled(StyledTableCell)(({ theme }) => ({
  border: "1px solid #ABB2B9",
  width: "10rem",
}))

const StyledCSVLink = styled(CSVLink)({
  color: "#000",
  textDecoration: "none",
})

const AssignmentMenu = ({ handleClose, anchorEl, assignmentId }) => {
  const assignmentTemplate = [["StudentId", "Grade"]]
  const [data, setData] = useState([])

  useEffect(() => {
    // Call API to upload an assignment
    classroomAxios.post("assignment/upload-assignment", {
      assignmentId: assignmentId,
      data: data,
    })
    console.log("upload-assignment")
  }, [data])

  return (
    <Menu
      id="menu-class-setting"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>
        <label htmlFor={`assignment-${assignmentId}`}>
          <Input
            hidden
            style={{ display: "none" }}
            accept=".csv"
            id={`assignment-${assignmentId}`}
            type="file"
            onChange={(e) => {
              const files = e.target.files
              console.log(files)
              if (files) {
                console.log(files[0])
                Papa.parse(files[0], {
                  complete: function (results) {
                    setData(results.data)
                  },
                })
              }
            }}
          />
          Upload
        </label>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <StyledCSVLink
          data={assignmentTemplate}
          separator=","
          filename={"assignment-template.csv"}
          className="btn btn-primary"
          target="_blank"
        >
          Download
        </StyledCSVLink>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose}>Return all</MenuItem>
    </Menu>
  )
}

export default function GradeBoardTableHead() {
  const { gradeStruct } = useContext(tabsContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const [assignmentId, setAssignmentId] = useState("")
  console.log(gradeStruct)
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event, id) => {
    console.log(id)
    setAssignmentId(id)
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <TableHead>
        <TableRow>
          <FixedTableCell>Students</FixedTableCell>
          <FixedTableCell>Student Id</FixedTableCell>
          {gradeStruct.length !== 0
            ? gradeStruct.map((grade, index) => (
                <StyledTableCell key={index}>
                  <Grid container direction={"column"}>
                    <Grid item>
                      <Grid
                        container
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Grid item>{grade.gradeTitle}</Grid>
                        <Grid item>
                          <IconButton
                            aria-label="menu of an assignment"
                            aria-controls="menu-assignment"
                            aria-haspopup="true"
                            onClick={(e) => handleClick(e, grade._id)}
                            color="inherit"
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid style={{ borderTop: "1px solid #ABB2B9" }}>
                      out of 100
                    </Grid>
                  </Grid>
                </StyledTableCell>
              ))
            : null}
          <StyledTableCell>Total</StyledTableCell>
        </TableRow>
      </TableHead>
      {gradeStruct.length !== 0 ? (
        <AssignmentMenu
          handleClose={handleClose}
          anchorEl={anchorEl}
          assignmentId={assignmentId}
        />
      ) : null}
    </>
  )
}
