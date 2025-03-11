import React from 'react';
import MyPosts from "./MyPosts/MyPosts";
import {Box, Avatar, List, ListItem, Typography} from "@mui/material";

const Profile = () => {
    return (
        <Box sx={{p:"15px", width: "100%"}}>
            <Box component="img" sx={{width:"100%",height:"300px", mb:"15px"}} src="https://i.pinimg.com/736x/82/b5/80/82b580dab030b6397b874244058c13df.jpg" alt=""/>
            <Box sx={{display:"flex", gap: "15px"}}>
                <Avatar alt="Remy Sharp" sx={{ width: 200, height: 200 }} src="https://avatars.mds.yandex.net/i?id=419a79925d7b795e5ee9e5110747b2b1_l-12160792-images-thumbs&n=13" />
                <Box>
                    <Typography variant="h3" component="h3" >Dmitry K.</Typography>
                    <List>
                        <ListItem sx={{p:0,pb:"5px"}}>Date of Birth: 2 january</ListItem>
                        <ListItem sx={{p:0,pb:"5px"}}>City: Minsk</ListItem>
                        <ListItem sx={{p:0,pb:"5px"}}>Education: BSU</ListItem>
                        <ListItem sx={{p:0,pb:"5px"}}>Web-Site: blablabla</ListItem>
                    </List>
                </Box>
            </Box>
            <MyPosts/>
        </Box>
    );
};

export default Profile;