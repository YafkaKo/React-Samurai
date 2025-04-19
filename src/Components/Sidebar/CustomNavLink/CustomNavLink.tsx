import React, { FC } from "react";
import {NavLink} from "react-router-dom";
import {ListItem, ListItemText, SxProps, Theme} from "@mui/material";

interface Props {
    to: string;
    text: string;
    sx?: SxProps<Theme>;
}

const CustomNavLink: FC<Props> = ({to, text, sx}) =>{
    return (
        <NavLink to={to} style={{textDecoration: "none", color: "inherit",}}>
            <ListItem>
                <ListItemText sx={{
                    "& span": {fontWeight: "bold", fontSize: "inherit"},
                    "&:hover": {textDecoration: "underline"},
                    ...sx
                }} primary={text}/>
            </ListItem>
        </NavLink>
    );
}

export default CustomNavLink;