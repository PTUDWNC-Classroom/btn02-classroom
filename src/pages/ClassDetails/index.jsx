import React from "react"

import StreamTabPanel from "../../Components/Class/TabPanel/StreamTabPanel"
import { tabsContext } from "../../context/TabsContext"
import PeopleTabPanel from "../../Components/Class/TabPanel/PeopleTabPanel"
import GradeTabPanel from "../../Components/Class/TabPanel/GradeTabPanel"
import { useLocation } from "react-router"

export default function ClassDetails() {
  const { value } = React.useContext(tabsContext)
  const location = useLocation()
  localStorage.setItem("classId",location.pathname.split("/")[2])
  return (
    <>
      <StreamTabPanel value={value} index={0} />
      <PeopleTabPanel value={value} index={2} />
      <GradeTabPanel value={value} index={3} />
    </>
  )
}
