import React from "react";
import {NavLink} from "react-router-dom";
import {ListItem, ListItemText} from "@mui/material";

function CustomNavLink({to, text}) {
    return (
        <NavLink to={to} style={{textDecoration: "none", color: "inherit",}}>
            <ListItem>
                <ListItemText sx={{
                    "& span": {fontWeight: "bold", fontSize: "inherit"},
                    "&:hover": {textDecoration: "underline"}
                }} primary={text}/>
            </ListItem>
        </NavLink>
    );
}

export default CustomNavLink;