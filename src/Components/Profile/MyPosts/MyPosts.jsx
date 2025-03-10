import React, {useState} from 'react';
import Post from "./Post/Post";
import SendIcon from '@mui/icons-material/Send';
import {Box, Typography, TextareaAutosize, Button, List, ListItem} from "@mui/material";


const MyPosts = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            user: "Алексей",
            avatar: "A",
            text: "Отличный пост!",
            likes: 10,
        },
        {
            id: 2,
            user: "Мария",
            avatar: "M",
            text: "Спасибо за информацию!",
            likes: 5,
        },
        {
            id: 3,
            user: "Иван",
            avatar: "I",
            text: "Интересно, жду продолжения.",
            likes: 3,
        },
    ]);

    const [textValue, setTextValue] = useState("");

    const handleTextareaChange = (event) => {
        setTextValue(event.target.value); // Обновляем состояние
    };

    function addPost(name, likes) {
        let lastElement = posts.length - 1

        let newElement =
            {
                id: posts[lastElement].id + 1,
                user: name,
                avatar: name.slice(0, 1).toUpperCase(),
                text: textValue,
                likes: likes,
            }
        setPosts([...posts, newElement])
        setTextValue("");
    }


    return (
        <Box>
            <Box sx={{margin: "32px 0 32px 0", display: "flex", flexDirection: "column"}}>
                <Typography variant="h3" gutterBottom>My posts</Typography>
                <Box sx={{marginBottom: "15px"}}>
                    <TextareaAutosize
                        value={textValue}
                        onChange={handleTextareaChange}
                        minRows={3}
                        placeholder="Send..."
                        style={{width: "100%"}} // Добавьте стили здесь
                    />
                </Box>
                <Button sx={{marginTop: "15px"}} variant="contained" color="inherit" endIcon={<SendIcon/>}
                        onClick={() => addPost("name", 0)}
                >Send...</Button>
            </Box>
            <List>
                {posts.map((post) => (
                    <ListItem key={post.id} sx={{p: 0, mb: "15px"}}>
                        <Post
                            key={post.id}
                            user={post.user}
                            avatar={post.avatar}
                            text={post.text}
                            likes={post.likes}
                        />
                    </ListItem>
                ))
                }
            </List>
        </Box>
    );
};


export default MyPosts;