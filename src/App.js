import React from 'react';
import {Container, Box, CssBaseline} from "@mui/material"
import {ThemeProvider} from '@mui/material/styles';
import socialNetworkTheme from './SocialNetwordTheme'
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Profile from "./Components/Profile/Profile";
import Dialogs from "./Components/Dialogs/Dialogs";


function App() {
    return (

        <BrowserRouter>
            <CssBaseline />
            <ThemeProvider theme={socialNetworkTheme}>
                <Container disableGutters sx={{bgcolor: "secondary.main",fontSize: 24}}>
                    <Header/>
                    <Box sx={{p: 0, display: "flex"}}>
                        <Sidebar/>
                        <Routes>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/dialogs" element={<Dialogs/>}/>
                            <Route path="/dialogs/:chatId" element={<Dialogs/>}/>
                            {/*<Route path="/news" element={<News/>}/>*/}
                            {/*<Route path="/settings" element={<Settings/>}/>*/}
                        </Routes>
                    </Box>
                </Container>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
