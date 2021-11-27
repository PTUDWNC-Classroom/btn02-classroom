import React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import HomeIcon from "@mui/icons-material/Home"
import SettingsIcon from "@mui/icons-material/Settings"
import { useHistory } from "react-router"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import { ListSubheader } from "@mui/material"

const stringToColor = (string) => {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = "#"

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.substr(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}`,
  }
}

const ClassListItem = ({ id, className, section }) => {
  const history = useHistory()
  const handleRedirectToClassDetail = () => {
    history.push(`/classes/${id}`)
  }
  return (
    <ListItem button onClick={() => handleRedirectToClassDetail()}>
      <ListItemAvatar>
        <Avatar {...stringAvatar(className)} />
      </ListItemAvatar>
      <ListItemText primary={className} secondary={section} />
    </ListItem>
  )
}

export default function NavigationDrawer({ open, handleClickOpen }) {
  const history = useHistory()

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    handleClickOpen(open)
  }

  const handleRedirectToClassList = () => {
    history.push("/")
  }

  return (
    <div>
      <React.Fragment>
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 300 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button onClick={() => handleRedirectToClassList()}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Classes "} />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListSubheader component="div" id="enrolled-class-list-subheader">
                Enrolled
              </ListSubheader>
              <ClassListItem id="1" className={"PTUDWNC"} section={"HK1"} />
            </List>
            <Divider />
            <List>
              <ListItem button onClick={() => alert("a")}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={"Setting"} />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  )
}
