import { Button, Container, List, Paper, Stack, TextField } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import { useContext, useEffect, useState } from "react";
import classroomAxios from "../../DataConnection/axiosConfig";
import { ClassroomContext } from "../../../context/ClassroomContext";
import { Avatar, ListItem, ListItemAvatar } from "@mui/material";
//import WorkIcon from '@mui/icons-material/Work';
import ListItemText from '@mui/material/ListItemText';


export default function Comment() {
    const reviewId = window.location.pathname.split('/')[2];
    const { user } = useContext(ClassroomContext);
    const [commentInput, setCommentInput] = useState('')
    //console.log(window.location.pathname.split('/'))
    const [headerData, setHeaderData] = useState({});
    const [expectGrade,setExpectGrade] = useState('');
    const [title,setTitle] = useState('');
    const [isDisable, setIsDisable] = useState(false);
    const [disableComment, setDisableComment] = useState(false);

    //console.log(user);
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await classroomAxios.post(`review/getReviewData`,
                    {
                        reviewId: reviewId,
                        userId: user._id,
                    })
                setHeaderData(res.data.data)
                setExpectGrade(res.data.data.expectationGrade)
                setTitle(res.data.data.title)
                setIsDisable(res.data.disable)
                setDisableComment(res.data.data.disableComment)
                //console.log(res.data)
                //console.log(res.data)
            } catch (error) {
                console.error(error);
            }
        }

        getData();

    }, [reviewId, user._id, commentInput])


    const sendHandler = async () => {
        //console.log(commentInput)
        try {
            const res = await classroomAxios.post(`review/addComment`,
                {
                    reviewId: reviewId,
                    userId: user._id,
                    comment: commentInput
                })

            if (res) {
                setCommentInput('');
                //console.log("setComment")
            }
            //console.log(res.data)
            //console.log(res.data)
        } catch (error) {
            console.error(error);
        }
    }

    const handleUpdate = async ()=>{
        try {
            const res = await classroomAxios.post(`assignment/updateGradeByReview`,
                {
                    reviewId: reviewId,
                    expectGrade: expectGrade,
                    title: title
                })

            if (res) {
                alert("Update grade thành công!")
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleClose = async()=>{
        setDisableComment(!disableComment);
        try {
            await classroomAxios.post(`review/closeComment`,
                {
                    reviewId: reviewId,
                    disableComment: !disableComment
                })

            if (!disableComment) {
                alert("Đã đóng comment!")
            }
            else {
                alert("Đã mở comment!")
            }
            

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Paper sx={{ maxWidth: 800, my: 1, mx: "auto", p: 2 }}>
                <Container>
                    <h1>
                        Request {headerData.title} grade review
                    </h1>
                    <h3>
                        Explanation message: {headerData.explanationMessge}
                    </h3>
                    <h3>Expectation grade:</h3>
                    <Stack spacing={2} direction="row">
                        <input disabled={isDisable} size={1} value={expectGrade} onChange={(e) => setExpectGrade(e.target.value)}></input>
                        {!isDisable && <Button variant="contained" onClick={handleUpdate}>Update</Button>}
                        {!isDisable && disableComment && <Button variant="contained" onClick={handleClose}>Open Comment</Button>}
                        {!isDisable && !disableComment && <Button variant="contained" onClick={handleClose}>Close Comment</Button>}
                    </Stack>
                </Container>
            </Paper>
            <Paper sx={{ maxWidth: 800, my: 1, mx: "auto", p: 2 }}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {headerData.commentList &&
                        (headerData.commentList).map(function (val, index) {
                            return (
                                <ListItem key={index}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AccountCircleIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={`${val.Name} ${val.date.split("T")[0]}`} secondary={val.comment} />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Paper>
            <Paper sx={{ maxWidth: 800, my: 1, mx: "auto", p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize: 40 }} />
                    <TextField
                        disabled = {disableComment}
                        label="Comment" size="small" sx={{ width: 500 }}
                        value = {commentInput}
                        onChange={(e) => setCommentInput(e.target.value)} />
                    <Button onClick={sendHandler}>
                        <SendIcon sx={{ fontSize: 30 }} />
                    </Button>
                </Box>
            </Paper>
        </>
    )
}