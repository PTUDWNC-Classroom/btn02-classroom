import React from "react"

import StreamTabPanel from "../../Components/Class/TabPanel/StreamTabPanel"
import { tabsContext } from "../../context/TabsContext"
import PeopleTabPanel from "../../Components/Class/TabPanel/PeopleTabPanel"


export default function ClassDetails() {
  const { value } = React.useContext(tabsContext)

  return (
    <>
      <StreamTabPanel value={value} index={0} />
      <PeopleTabPanel value={value} index={2} />
    </>
  )
}
