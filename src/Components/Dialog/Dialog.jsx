import React from 'react';
import {Box, Typography} from "@mui/material";


export default function Dialog() {
    return (
        <Box sx={{
            bgcolor: "lightgray",
            width: "100%",
            display: "flex"
        }}>
            <Typography sx={{fontWeight: "bold"}} variant="h4" component="h4">Dialogs</Typography>
        </Box>
    );
};