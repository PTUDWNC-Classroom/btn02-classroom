
import { useContext, useEffect, useState } from "react"
import { ClassroomContext } from "../../../../context/ClassroomContext";
import { tabsContext } from "../../../../context/TabsContext";
import classroomAxios from "../../../DataConnection/axiosConfig";
import List from '@mui/material/List';
import { Avatar, ListItem, ListItemAvatar, ListItemButton } from "@mui/material";
//import WorkIcon from '@mui/icons-material/Work';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Review() {
    const [data, setData] = useState([]);
    const { user } = useContext(ClassroomContext);
    const { role } = useContext(tabsContext)
    const history = useHistory();
    //console.log(user);
    const classId = localStorage.classId;
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await classroomAxios.post(`review/getReviews`,
                    {
                        userId: user._id,
                        classId: classId,
                        role: role
                    })
                console.log(res.data)
                setData(res.data)
                //console.log(res.data)
            } catch (error) {
                console.error(error);
            }
        }

        getData();

    }, [user._id, role, classId])


    const clickHandler = (reviewId)=>
    {
        //console.log(`${window.location.origin}/Comment/${reviewId._id}`)
        history.push(`/Comment/${reviewId._id}`)
    }


    return (
        <>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {data &&
                data.map(function (val, index) {
                    return (
                            <ListItem key={index}>
                                <ListItemButton onClick={
                                    ()=>clickHandler(val)
                                    }>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AccountCircleIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={`Request ${val.title} grade review. StudentId: ${val.ID}`} secondary={val.DateCreate.split("T")[0]} />
                                </ListItemButton>
                            </ListItem>
                    )
                })
            }
            </List>
        </>
    )
}