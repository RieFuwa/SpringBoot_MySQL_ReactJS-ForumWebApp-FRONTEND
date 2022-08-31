import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import "./Post.scss";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import { Link } from "react-router-dom";
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  
const ExpandMore = styled((props) => {

    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',

    transition: theme.transitions.create('transform', {

    }),
}));


function PostForm(props) {
    
    const { userId, userName,refreshPosts} = props;
    const [expanded, setExpanded] = React.useState(false);
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [isSend, setIsSend]=useState(false);

    const savePost=()=>{
        fetch("/post/create",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                title:title,
                userId:userId,
                text:text
            }),
        }).then((res)=>res.json())
        .catch((err)=>console.log("error"))
    }

    const handlesumbit = () => {
        savePost();
        setIsSend(true);
        setTitle("");
        setText("");
        refreshPosts();
  
    }

    const handleTitle = (value) => {
        setTitle(value);
        setIsSend(false);
    }
    const handleText = (value) => {
        setText(value);
        setIsSend(false);
    }
   
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setIsSend(false);
    };
    return (
      
        
     
        <div className='postContainer'>
        <Snackbar open={isSend} autoHideDuration={1200} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
            <Card sx={{ width: 600 }}>
                <CardHeader
                    avatar={
                        <Link className='link' to={{ pathname: '/users/' + userId }}>
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>{userName}</Link>
                    }

                    title={<OutlinedInput id="outlined-adorment-amount" multiline placeholder="Title" inputProps={{ maxLength: 100 }} fullWidth value={title} onChange={(i) => handleTitle(i.target.value)}>

                    </OutlinedInput>}

                />

                {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <OutlinedInput id="outlined-adorment-amount" multiline placeholder="Text" inputProps={{ maxLength: 1000 }} fullWidth value={text} onChange={(i) => handleText(i.target.value)}>

                        </OutlinedInput>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>


                    <ExpandMore

                    >


                    </ExpandMore>
                    <Button variant="contained" endIcon={<SendIcon />} onClick={handlesumbit}  >
                        Send
                    </Button>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>

                    </CardContent>
                </Collapse>
            </Card>

        </div>   
    )
}

export default PostForm;