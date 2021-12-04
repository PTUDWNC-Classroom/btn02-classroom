import React, { useEffect, useState } from "react"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { grey } from "@mui/material/colors"
import { styled } from "@mui/system"
import { Grid } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import PropTypes from "prop-types"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import Slide from "@mui/material/Slide"
import axios from "axios"

import { useLocation } from "react-router-dom"

import ClassDetailsTabs, { TabsManagerDownMD } from "./ClassDetailsTabs"
import CreateClassButton from "../Button/CreateClassButton"
import AccountUser from "../Button/AccountUserButton"
import { tabsContext } from "../../context/TabsContext"
import NavigationDrawer from "./NavigationDrawer"
import { ClassroomContext } from "../../context/ClassroomContext"

const StyledAppBar = styled(AppBar)`
  background-color: ${grey[900]};
  color: ${grey[100]};
`

const MenuIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  "&:hover": {
    backgroundColor: grey[800],
  },
}))

const MainAppBar = ({ path }) => {
  const pathArr = path.split("/")
  const { role } = React.useContext(tabsContext)
  //pathArr.shift();

  switch (pathArr[1]) {
    case "classes":
      return <ClassDetailsTabs role={role} />
    default:
      return (
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          textAlign="left"
        >
          Classroom
        </Typography>
      )
  }
}

const HideOnScroll = (props) => {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
}

export default function MenuAppBar({ handleRender }) {
  const [openDrawer, setOpenDrawer] = useState(false)
  let location = useLocation()
  const theme = useTheme()
  let isLogin = null
  const { role } = React.useContext(tabsContext)
  const { updateClassList, login, user } = React.useContext(ClassroomContext)

  // isLogin là social hoặc login bình thường
  if (localStorage.getItem("isSocialLogin")) {
    isLogin = JSON.parse(localStorage.isSocialLogin)
  } else if (localStorage.getItem("isLogin")) {
    //console.log("create button")
    isLogin = JSON.parse(localStorage.isLogin)
  }

  const handleClickOpen = () => {
    setOpenDrawer(!openDrawer)
  }

  useEffect(() => {
    const getClassList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST}classes/class-list`
        )

        updateClassList(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    const getUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_HOST}user/${isLogin._id}`
        )
        login(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    if (!user._id) {
      getUser()
      getClassList()
    }

    // eslint-disable-next-line
  }, [])

  if (isLogin === null) {
    return null
  } else {
    return (
      <>
        <HideOnScroll>
          <StyledAppBar elevation={0} position="sticky">
            <Toolbar>
              <MenuIconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleClickOpen}
              >
                <MenuIcon />
              </MenuIconButton>
              <NavigationDrawer
                open={openDrawer}
                handleClickOpen={handleClickOpen}
              />
              <MainAppBar path={location.pathname} />
              <CreateClassButton handleRender={handleRender} />
              <AccountUser />
            </Toolbar>
            <Grid
              container
              justifyContent="center"
              style={{ marginBottom: theme.spacing(1) }}
            >
              <TabsManagerDownMD role={role} gridNumber={12} />
            </Grid>
          </StyledAppBar>
        </HideOnScroll>
      </>
    )
  }
}
