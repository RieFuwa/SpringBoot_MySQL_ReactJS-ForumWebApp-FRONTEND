import React, { useEffect, useState } from 'react';
import Post from "../Post/Post";
import Container from '@mui/material/Container';


import "./Home.scss";
import PostForm from '../Post/PostForm';

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    const refreshPosts=()=>{
        fetch("/post").then(res => res.json()).then(
            (result) => {
                setIsLoaded(true);
                setPostList(result)
            }, (error) => {
                console.log("error");
                setIsLoaded(true);
                setError(error);
            })
    }

    useEffect(() => {
        refreshPosts();
    }, [postList])

    if (error) {
        return <div>Error</div>;
    } else if (!isLoaded) {
        return <div>LOADING...</div>;
    } else {
        return (
         
               
         
               <Container fixed className='container'>
                <PostForm  userId="104" userName="Daaas"></PostForm>
                {postList.map(post => (
                    <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text}></Post>
                ))}
      
               
               </Container>
         
          
        );
    }

}
export default Home;
