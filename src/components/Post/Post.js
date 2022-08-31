
import "./Post.scss";
import React, { useEffect, useState, useRef } from 'react';

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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Moment from 'moment';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";
import { Container } from "@mui/system";
import CommentForm from "../Comment/CommentForm";

const ExpandMore = styled((props) => {

  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


function Post(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const isInitialMount = useRef(true);
  const { title, text, userId, userName, postId } = props;
  const [expanded, setExpanded] = React.useState(false);
  const formatDate = Moment().format("MMM Do YY");
  const [liked, setLiked] = React.useState(false);

  const handleLike = () => {
    setLiked(!liked);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComment();
    console.log(commentList)
  };
  
  const refreshComment = () => {
    fetch("/comments/getAll?postId=" + postId).then(res => res.json()).then(
      (result) => {
        setIsLoaded(true);
        setCommentList(result)
      }, (error) => {
        console.log("error");
        setIsLoaded(true);
        setError(error);
      })
  }
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;

    }
    else {
      refreshComment();
    }

  }, [commentList])

  return (
    <div className='postContainer'>
      <Card sx={{ width: 600 }}>
        <CardHeader
          avatar={
            <Link className='link' to={{ pathname: '/users/' + userId }}>
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>{userName}</Link>
          }

          title={title}
          subheader={formatDate}
        />

        {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={handleLike} aria-label="add to favorites">
            <FavoriteIcon style={liked ? { color: "red" } : null} />

          </IconButton>
          <IconButton aria-label="add to favorites">
            <CommentIcon />

          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
         <div >
            { error? "error": isLoaded? commentList.map(comment=>(<Comment userId={104} userName={"Ahmet"} text={comment.text}></Comment>)):"Loading"}
            <CommentForm userId={104} userName={"Ahmet"}postId = {postId}></CommentForm>
            </div>
        </Collapse>
      </Card>

    </div>
  )
}

export default Post;