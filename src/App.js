import React from 'react';
import {Container, Box} from "@mui/material"
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Profile from "./Components/Profile/Profile";
import Dialog from "./Components/Dialog/Dialog";


function App() {
    return (
        <BrowserRouter>
            <Container disableGutters sx={{fontSize: 24}}>
                <Header/>
                <Box sx={{p: 0, display: "flex", gap: "15px"}}>
                    <Sidebar/>
                    <Routes>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/dialogs" element={<Dialog/>}/>
                        {/*<Route path="/news" element={<News/>}/>*/}
                        {/*<Route path="/settings" element={<Settings/>}/>*/}
                    </Routes>
                </Box>
            </Container>
        </BrowserRouter>
    );
}

export default App;
