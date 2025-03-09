import React from 'react';
import classes from './Profile.module.css'

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
            <div className={classes.main_post}>
                <h3 >My posts</h3>
                <input type="textarea" placeholder='Send...' className={classes.main_input} />
                <button className={classes.main_button}>Send...</button>
            </div>
            <div>
                <ul className={classes.main_list}>
                    <li className={classes.main_item}>Hey, why nobody love me?</li>
                    <li className={classes.main_item}>Hello World!!!</li>
                </ul>
            </div>
        </div>
    );
};

export default Profile;