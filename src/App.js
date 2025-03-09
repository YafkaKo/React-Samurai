import React from 'react';
import './App.css';
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Profile from "./Components/Profile/Profile";

function App() {
    return (
        <div className="App">
            <Header/>
            <Sidebar/>
            <Profile/>
        </div>
    );
}

export default App;
