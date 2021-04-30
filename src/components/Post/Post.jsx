import React from 'react'
import { port } from '../../tools/apiPaths';
import Avatar from '../Avatar/Avatar';

const Post = (props) => {

    let post = props.post;

    console.log(post)



    return (
        <div className="postComponent">
            <div className="creator">
                <div className="iconBtnAvatar">
                    <Avatar src={port+'/'+ post?.user_id?.profile_img}/>
                </div>
                <p>{post?.user_id?.user_name}</p>
            </div>
            <div className="picture">
                <img src={port+'/'+post.image} alt="postImage"/>
            </div>
            <div className="comments">

            </div>
        </div>
    )
}

export default Post
