import React, { useEffect, useState } from 'react';
import { CardContent, InputAdornment, makeStyles, OutlinedInput } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Link } from "react-router-dom";
import "./Comment.scss";
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


function CommentForm(props) {
    const {userId, userName,postId } = props;
    const[text, setText]=useState("");
    const saveComment=()=>{
        fetch("/comments/create",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                postId:postId,
                userId:userId,
                text:text
            }),
        }).then((res)=>res.json())
        .catch((err)=>console.log("error"))
    }
    const handlesumbit=()=>{
        saveComment();
        setText("");
    }

    const handleChenge=(value)=>{
        setText(value)
    }
    return (
        <CardContent className='postContainer' >
            <OutlinedInput
                
                id="outlined-adorment-amount"
                multiline

                inputProps={{ maxLength: 100 }}
                fullWidth
                onChange={(i)=>handleChenge(i.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <Link className='link' to={{ pathname: '/users/' + userId }}>
                            <Avatar sx={{width:33,height:33, bgcolor: red[500] }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>{userName}</Link>

                    </InputAdornment>
                }
                endAdornment ={<InputAdornment position="end"><Button variant="contained" endIcon={<SendIcon />} onClick={handlesumbit}  >
                Send
            </Button></InputAdornment>}
                value={text}
                style={{color:"black", backgroundColor:"white"}}
            >
                
            </OutlinedInput>
        </CardContent>
    )
}
export default CommentForm;