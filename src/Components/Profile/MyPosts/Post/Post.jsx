import React from 'react';
import classes from './Post.module.css'

const Post = (props) => {
    return (
        <li className={classes.main_item}>{props.props}</li>
    );
};

export default Post;