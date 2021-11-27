import * as React from "react"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/system"
import { grey } from "@mui/material/colors"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

import { tabsContext } from "../../context/TabsContext"
import { useLocation } from "react-router"

const StyledTab = styled(Tab)`
  text-transform: none;
`

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  }
}

function Grades({ role, ...a11yProps }) {
  if (role === "member") {
    return null
  } else return <StyledTab label="Grades" {...a11yProps} />
}

export function TabsManagerUpMD({ role, gridNumber }) {
  const { value, handleChange } = React.useContext(tabsContext)

  return (
    <Grid item xs={gridNumber}>
      <Tabs
        TabIndicatorProps={{ style: { background: `${grey[50]}` } }}
        textColor="inherit"
        value={value}
        onChange={handleChange}
        centered
      >
        <StyledTab label="Stream" {...a11yProps(0)} />
        <StyledTab label="Classwork" {...a11yProps(1)} />
        <StyledTab label="People" {...a11yProps(2)} />
        <Grades role={role} {...a11yProps(3)} />
      </Tabs>
    </Grid>
  )
}

export function TabsManagerDownMD({ role }) {
  const { value, handleChange } = React.useContext(tabsContext)
  const theme = useTheme()
  const matchDownMD = useMediaQuery(theme.breakpoints.down("md"))
  let location = useLocation()
  const isHomepage = location.pathname !== "/"

  if (matchDownMD && isHomepage) {
    return (
      <Grid container item xs={12} justifyContent="center">
        <Tabs
          TabIndicatorProps={{ style: { background: `${grey[50]}` } }}
          textColor="inherit"
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <StyledTab label="Stream" {...a11yProps(0)} />
          <StyledTab label="Classwork" {...a11yProps(1)} />
          <StyledTab label="People" {...a11yProps(2)} />
          <Grades role={role} {...a11yProps(3)} />
        </Tabs>
      </Grid>
    )
  } else return null
}

export default function ClassDetailsTabs({ role }) {
  const { classDetails } = React.useContext(tabsContext)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid container item xs={matches ? 3 : 10}>
        <Grid item xs={12}>
          <Typography
            noWrap
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {classDetails.className}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" noWrap>
            {classDetails.section}
          </Typography>
        </Grid>
      </Grid>
      {matches && (
        <>
          <TabsManagerUpMD role={role} gridNumber={6} />
          <Grid item xs={3} />
        </>
      )}
    </Grid>
  )
}
