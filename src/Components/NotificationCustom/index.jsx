import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
//import { Button } from '@mui/material';
import { styled } from "@mui/system"
import IconButton from "@mui/material/IconButton"
import { grey } from "@mui/material/colors"
import { useContext, useEffect, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import classroomAxios from '../DataConnection/axiosConfig';
//import { tabsContext } from '../../context/TabsContext';
import { ClassroomContext } from '../../context/ClassroomContext';
import { useLocation } from "react-router"

const NofifyIconButton = styled(IconButton)`
  &:hover {
    background-color: ${grey[800]};
  }
`


export default function NotificationCustom() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationList, setNotificationList] = useState([]);
    const [nameList,setNameList] = useState([]);
    //const { classDetails } = useContext(tabsContext)
    const {user} = useContext(ClassroomContext)

    //console.log(user);
    let location = useLocation()

    useEffect(() => {
        console.log("getNotification")
        const getNotification = async () => {
            try {
                const res = await classroomAxios.post("notification/getNotification",
                {
                    uesrId: user._id, 
                })

                setNotificationList(res.data.data)
                setNameList(res.data.nameList);

            } catch (error) {
                console.error(error)
            }
        }

        getNotification()
    }, [user._id,location.pathname])

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleClick = (event) => {

        setAnchorEl(event.currentTarget)
    }
    return (
        <>
            <NofifyIconButton
                size="large"
                aria-label="menu of create class"
                aria-controls="menu-create-class"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <Badge badgeContent={notificationList.length} color="primary">
                    <NotificationsNoneIcon />
                </Badge>
            </NofifyIconButton>
            <Menu
                id="menu-create-class"
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
                {notificationList.length !== 0 ?
                    notificationList.map((notification, index) => {
                           return (
                            <MenuItem key={index}>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            {`${nameList[index]} ${" "} ${notification.Message}`}
                        </MenuItem>
                           )
                    })
                    : null}
            </Menu>
        </>

    )
}