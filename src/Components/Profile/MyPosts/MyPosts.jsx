import React from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";

const posts = [
    'hello',
    'world',
    'post',
]

let i = 0

const MyPosts = () => {
    return (
        <div>
            <div className={classes.main_post}>
                <h3 >My posts</h3>
                <input type="textarea" placeholder='Send...' className={classes.main_input} />
                <button className={classes.main_button}>Send...</button>
            </div>
            <ul className={classes.main_list}>
                {posts.map((post) => (
                    <Post key={i++} props = {post} />
                ))
                }
            </ul>
        </div>
);
};

export default MyPosts;