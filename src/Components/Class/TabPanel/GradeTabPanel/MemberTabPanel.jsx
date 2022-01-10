import { Box, Tabs } from '@mui/material'
import React from 'react'
import PropTypes from "prop-types"
import Tab from "@mui/material/Tab"
import { Container } from "@mui/material"
import Grade from './Grade'
import Review from './Review'

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

export default function MemberTabPanel() {
  const [valueAssignment, setValue] = React.useState(0)
  console.log('membertabpanel')
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
          <Tab label="Grade" {...a11yProps(0)} />
          <Tab label="Review" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <AssignmentTabPanel valueAssignment={valueAssignment} index={0}>
        <Container maxWidth="md">
          <Grade />
        </Container>
      </AssignmentTabPanel>
      <AssignmentTabPanel valueAssignment={valueAssignment} index={1}>
        <Review />
      </AssignmentTabPanel>
    </Box>
  )
}
