import React from 'react';
import classes from './Profile.module.css'
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return (
        <div className={classes.main}>
            <img className={classes.main_background}
                 src="https://i.pinimg.com/736x/82/b5/80/82b580dab030b6397b874244058c13df.jpg" alt=""/>
            <div className={classes.main_profile}>
                <img className={classes.main_img}
                     src="https://avatars.mds.yandex.net/i?id=419a79925d7b795e5ee9e5110747b2b1_l-12160792-images-thumbs&n=13"
                     alt=""/>
                <div>
                    <h3 className={classes.main_title}>Dmitry K.</h3>
                    <ul>
                        <li>Date of Birth: 2 january</li>
                        <li>City: Minsk</li>
                        <li>Education: BSU</li>
                        <li>Web-Site: blablabla</li>
                    </ul>
                </div>
            </div>
            <MyPosts/>
        </div>
    );
};

export default Profile;