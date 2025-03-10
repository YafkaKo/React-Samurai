import React from 'react';
import Link from '@mui/material/Link';
import {Box, List, ListItem} from "@mui/material";

const links = [
    {
        id: 1,
        name: "Profile",
        link: "/profile",
    },
    {
        id: 2,
        name: "Messages",
        link: "/dialogs",
    },
    {
        id: 3,
        name: "News",
        link: "/news",
    },
    {
        id: 4,
        name: "Settings",
        link: "/settings",
    },
];

const Sidebar = () => {
    return (
        <Box component='nav' sx={{bgcolor: "lightgray",p: '15px',fontWeight: "bold"}}>
                <List sx={{p:0}}>
                    {
                        links.map(link => {
                            return (
                                <ListItem
                                    key={link.id}
                                    disableGutters
                                >
                                    <Link key={link.id} href={link.link} color="inherit" underline="hover">
                                        {link.name}
                                    </Link>
                                </ListItem>
                            )
                        })
                    }
                </List>
        </Box>
    );
};

export default Sidebar;