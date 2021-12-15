import React, { useContext } from "react"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { tabsContext } from "../../context/TabsContext"
import { Grid, IconButton } from "@mui/material"
import { styled } from "@mui/system"
import MoreVertIcon from "@mui/icons-material/MoreVert"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ABB2B9",
}))

export default function GradeBoardTableHead({ handleClick }) {
  const { gradeStruct } = useContext(tabsContext)

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell>Students</StyledTableCell>
        <StyledTableCell>Student Id</StyledTableCell>
        {gradeStruct.length > 0 &&
          gradeStruct.map((grade, index) => (
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
                        onClick={handleClick}
                        color="inherit"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid style={{ borderTop: "1px solid #ABB2B9" }}>
                  out of {grade.gradeDetail}
                </Grid>
              </Grid>
            </StyledTableCell>
          ))}
        <StyledTableCell>Total</StyledTableCell>
      </TableRow>
    </TableHead>
  )
}
