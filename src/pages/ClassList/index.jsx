import { Grid, Typography } from "@mui/material"
import React, { useState, useEffect } from "react"

import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import CircularProgress from "@mui/material/CircularProgress"

import axios from "axios"
import ClassItem from "../../Components/Class/ClassItem"

const ClassList = ({ newClassId }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null)
  let _id = null
  let user = null
  if (localStorage.isSocialLogin) {
    //console.log("GET localStorage SOCIAL LOGIN CLASS LIST")
    //console.log(JSON.parse(localStorage.isSocialLogin))
    user = JSON.parse(localStorage.isSocialLogin)
    _id = user._id
  } else if (localStorage.isLogin) {
    //console.log("GET localStorage LOGIN CLASS LIST")
    //console.log(JSON.parse(localStorage.isLogin))
    user = JSON.parse(localStorage.isLogin)
    //console.log(user);
    _id = user._id
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  //console.log("userEffect")
  useEffect(() => {
    //console.log("vao userEffect")
    const getClassList = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_HOST}classes/class-list`,
          {
            _id: _id,
          }
        )
        //console.log("da response")
        //console.log(response.data)
        if (response) {
          setIsLoaded(true)
          setItems(response.data)
        }
      } catch (error) {
        //console.log("lỗi get classlist")
        //console.error(error)
        setIsLoaded(true)
        setError(error)
      }
    }

    getClassList()
  }, [newClassId, _id])

  if (error) {
    return (
      <Typography variant="h4" color="error" align="center" flexGrow={1}>
        Error: {error.message}
      </Typography>
    )
  } else if (!isLoaded) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "90vh" }}
      >
        <Grid item xs={3}>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  } else {
    return (
      <Grid container spacing={3}>
        {items.length > 0 ? (
          items.map((item) => (
            <ClassItem
              key={item._id}
              id={item._id}
              className={item.className}
              section={item.section}
              handleClick={handleClick}
            />
          ))
        ) : (
          <Typography variant="h4" color="error" align="center" flexGrow={1}>
            Class not found!
          </Typography>
        )}

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
          <MenuItem onClick={handleClose}>Change background</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
      </Grid>
    )
  }
}

export default ClassList
