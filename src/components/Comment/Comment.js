import React from "react";
import { CardContent, InputAdornment, makeStyles, OutlinedInput } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Link } from "react-router-dom";
import "./Comment.scss";

function Comment(props) {
    const { text, userId, userName } = props;
  

    return (
        <CardContent className='postContainer' >
            <OutlinedInput
                disabled
                id="outlined-adorment-amount"
                multiline

                inputProps={{ maxLength: 100 }}
                fullWidth
                value={text}
                startAdornment={
                    <InputAdornment position="start">
                        <Link className='link' to={{ pathname: '/users/' + userId }}>
                            <Avatar sx={{width:33,height:33, bgcolor: red[500] }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>{userName}</Link>

                    </InputAdornment>
                }style={{color:"black", backgroundColor:"white"}}
            >

            </OutlinedInput>
        </CardContent>
    )
}
export default Comment;