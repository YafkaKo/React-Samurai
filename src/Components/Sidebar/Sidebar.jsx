import React from 'react';
import { Box, List } from "@mui/material";
import CustomNavLink from "./CustomNavLink/CustomNavLink";

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
    {
        id: 5,
        name: "Users",
        link: "/users",
    },
];

const Sidebar = () => {
    return (
        <Box component='nav' sx={{
            p: '15px',
            borderRight: "2px solid",
            borderColor: "background.default"
        }}>
            <List sx={{ p: 0 }}>
                {
                    links.map(link => {
                        return (
                            <CustomNavLink key={link.id} to={link.link} text={link.name} />
                        )
                    })
                }
            </List>
        </Box>
    );
};

export default Sidebar;