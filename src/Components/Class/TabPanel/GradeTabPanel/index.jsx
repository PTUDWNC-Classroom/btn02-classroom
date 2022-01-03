import React, { useContext } from "react"
import PropTypes from "prop-types"
import Box from "@mui/material/Box"
import TabPanel from ".."
import { tabsContext } from "../../../../context/TabsContext"
import MemberTabPanel from "./MemberTabPanel"
import CreatorTabPanel from "./CreatorTabPanel"

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



export default function GradeTabPanel({ value, index }) {
  const { role } = useContext(tabsContext)

  return (
    <TabPanel value={value} index={index}>
      {role === "member" ? <MemberTabPanel /> : <CreatorTabPanel />}
    </TabPanel>
  )
}
