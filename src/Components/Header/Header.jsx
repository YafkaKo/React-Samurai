import React from 'react';
import {Container, Link} from "@mui/material";
import socialNetworkTheme from "../../SocialNetwordTheme";
import {ThemeProvider} from "@mui/material/styles";
import CallEndSharpIcon from '@mui/icons-material/CallEndSharp';


const Header = () => {
    return (
        <ThemeProvider theme={socialNetworkTheme}>
            <Container component="header" sx={{pt: 2, pb: 2,
                borderBottom: "2px solid",
                borderColor: "background.default"
            }}>
                <Link href="/profile">
                    <CallEndSharpIcon sx={{ fontSize: 60, color: 'primary.main' , display:"flex",alignItems:"center"}} />
                </Link>
            </Container>
        </ThemeProvider>
    );
};

export default Header;