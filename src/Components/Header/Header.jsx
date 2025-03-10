import React from 'react';
import {Container, Box} from "@mui/material";

const Header = () => {
    return (
        <Container component="header" sx={{pt: 2, pb:2, marginBottom: 2,bgcolor: "lightgray" }}>
            <Box component="img" src="https://www.svgrepo.com/show/455351/logo.svg" alt="Logo" sx={{height: 60,width: 60, display: "flex",alignItems: "center"}}></Box>
        </Container>
    );
};

export default Header;