import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { CHECKUSER } from '../../redux/types/userType';
import { comment, port, POST } from '../../tools/apiPaths';
import Avatar from '../Avatar/Avatar';

const Post = (props) => {

    let post = props.post;
    let history = useHistory()

    const node = useRef();

    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('')
    const [dropDownMenu, setDropDownMenu] = useState('')
   
    useEffect(()=>{
        let isMounted = true; 
        getComments()

        // eslint-disable-next-line
        return () => { isMounted = false };
        // eslint-disable-next-line
    },[])

    const handleHideDropdown = (event) => {
        if (event.key === 'Escape') {
            setDropDownMenu('');
        }
    };

    const handleClick = e => {
        if (node.current.contains(e.target)) {
          // inside click
          return;
        }
        // outside click 
        setDropDownMenu('');
    };

    useEffect(() => {
        document.addEventListener('keydown', handleHideDropdown, true);
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener('keydown', handleHideDropdown, true);
            document.removeEventListener("mousedown", handleClick);
        };
    },[]);

    // it detects the changes from the input and on key press Enter, sends the info to multiSearch()
    useEffect(() => {

        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter" || event.keyCode === 13) {
                postComment()
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
        document.removeEventListener("keydown", listener);
        };
        // eslint-disable-next-line
    },[content]);


    // handlestate

    const handleChange = (e) => {
        setContent(e.target.value)
    }
  
    // Get all comments from the backend once it mount

    const getComments = async () => {
        
        try{
            let result = await axios.get(port+comment+POST+'/'+post._id);
            if(result.data)
                setComments(result.data)

        }catch (err) {

        }
    }

    const postComment = async (id) => {

        let body = {
            post_id: id,
            user_id: props.user._id,
            content: content
        }
        
        try{
            let result = await axios.post(port+comment, body);
            if(result.data)
                setComments(result.data)
                setContent('')
                Array.from(document.querySelectorAll('input')).forEach(
                    input => (input.value = "")
                );
        }catch (err) {

        }
    }

    const checkUserProfile = (user) => {

        props.dispatch({type: CHECKUSER, payload: user})
        setTimeout(()=>{history.push(`/${user.user_name}`)})
    }

    const openMenu = async (id) => {

        if (dropDownMenu === '')
            setDropDownMenu({[id] : {display : 'flex'}})
        else
            setDropDownMenu('')

    }

    return (
        <div className="postComponent">
            <div className="creator">
                <div className="avatarName">
                    <div className="iconBtnAvatar">
                        <Avatar src={port+'/'+ post?.user_id?.profile_img} onClick={()=>checkUserProfile(post?.user_id)}/>
                    </div>
                    <p>{post?.user_id?.user_name}</p>
                    <p className="location">{post?.location.name}</p>
                </div>
                <div className="hobby">
                    <p>#{post?.hobby_id.hobby_name}</p>
                </div>
                <div className="menu">
                    <div className="dropDownMenu" style={dropDownMenu[post._id]}>
                        <div className="sections"><p>Edit</p></div>
                        <div className="sections" onClick={props.onClick}><p>Delete</p></div>
                    </div>
                    <div ref={node}>
                        <FontAwesomeIcon icon={faEllipsisV} className="threeDots" onClick={()=>openMenu(post._id)}/>
                    </div>
                </div>
            </div>
            <div className="picture">
                <img src={port+'/'+post.image} alt="postImage"/>
            </div>
            <div className="description">
                <p><b onClick={()=>checkUserProfile(post?.user_id)}>{post?.user_id?.user_name}</b> {post.description}</p>
            </div>
            <p className="timer">{moment(post.creation_date).startOf('hour').fromNow()}</p>
            <div className="commentsContainer">
                <div className="commentCollection">
                    {
                        comments.map(comment => {
                            return(
                                <div className="comment" key={comment._id}>
                                    <p className="userName" onClick={()=>checkUserProfile(comment.user_id)}>{comment.user_id.user_name}</p>
                                    <p>{comment.content}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="inputComments">
                    <input type="text" name="content" placeholder="Add a comment" onChange={handleChange}/>
                    <p onClick={()=>postComment(post._id)}>Post</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userReducer.user,
        location: state.userReducer.location,
    }
}

export default connect(mapStateToProps)(Post) 
