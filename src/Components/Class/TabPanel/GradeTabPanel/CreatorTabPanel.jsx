import { Box, Tabs } from '@mui/material'
import React from 'react'
import ManageBoard from './ManageBoard'
import PropTypes from "prop-types"
import Tab from "@mui/material/Tab"
import { Container } from "@mui/material"
import AssignmentStruct from "./AssignmentStruct"
import Review from './Review'
//import Review from './Review'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

function AssignmentTabPanel(props) {
  const { children, valueAssignment, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={valueAssignment !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {valueAssignment === index && (
        <Box sx={{ p: 2 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  )
}

AssignmentTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  valueAssignment: PropTypes.number.isRequired,
}

export default function CreatorTabPanel() {
  const [valueAssignment, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={valueAssignment}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Grade Structure" {...a11yProps(0)} />
          <Tab label="Manage Board" {...a11yProps(1)} />
          <Tab label="Review" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <AssignmentTabPanel valueAssignment={valueAssignment} index={0}>
        <Container maxWidth="md">
          <AssignmentStruct />
        </Container>
      </AssignmentTabPanel>
      <AssignmentTabPanel valueAssignment={valueAssignment} index={1}>
        <ManageBoard />
      </AssignmentTabPanel>
      <AssignmentTabPanel valueAssignment={valueAssignment} index={2}>
        <Review />
      </AssignmentTabPanel>
    </Box>
  )
}
