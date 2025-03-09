import React from 'react';
import classes from './Sidebar.module.css'

const Sidebar = () => {
    return (
        <nav className={classes.nav}>
            <ul>
                <a href='#s'> <li>Profile</li></a>
                <a href='#s'><li>Messages</li></a>
                <a href='#s'><li>News</li></a>
                <a href='#s'><li>Settings</li></a>
            </ul>
        </nav>
    );
};

export default Sidebar;