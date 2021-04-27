import React, { useEffect, useState }  from 'react'
import Footer from '../Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import Setting from '../Setting/Setting';
import { useHistory } from 'react-router';
import Avatar from '../Avatar/Avatar';
import ControlPanel from '../ControlPanel/ControlPanel';
import { customer, follow, port, meeting } from '../../tools/apiPaths';
import axios from 'axios';

const User = (props) => {

    let history = useHistory()

    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [events, setEvents] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        getFollows()
        getEvents()
        setPosts([])
        // eslint-disable-next-line
    },[]);

    // Functions

    const editProfile = () => {
        setTimeout(()=>{ history.push('/account/edit')})
    }

    const getFollows = async () => {

        try{

            let result = await axios.get(port+follow+customer+'/'+props.user._id)
            setFollowers(result.data.followers)
            setFollowing(result.data.following)
        }catch (err) {

        }
    }

    const getEvents = async () => {

        try{

            let result = await axios.get(port+meeting+customer+'/'+props.user._id)
            if(result.data)
                setEvents(result.data)
        }catch (err) {

        }
    }

    return (
        <div className="userComponent">
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <ControlPanel />
            <div className="userContainer">
                <div className="profilePic">
                    <Avatar src={port+'/'+props.user?.profile_img}/>
                </div>
                <div className="userDetails">
                    <div className="userDetailsTop">
                        <p className="userName">{props.user?.user_name}</p>
                        <div className="editProfile">
                            <p onClick={()=>editProfile()}>Edit profile</p>
                            <Setting>
                                <FontAwesomeIcon icon={faUserCog} className="iconBtn" />
                            </Setting>
                        </div>
                    </div>
                    <div className="userDetailsMiddle">
                        <div className="events sections">
                            <p className="number">{events.length}</p>
                            <p>events</p>
                        </div>
                        <div className="posts sections">
                            <p className="number">{posts.length}</p>
                            <p>posts</p>
                        </div>
                        <div className="following sections">
                            <p className="number">{following.length}</p>
                            <p>following</p>
                        </div>
                        <div className="followers sections">
                            <p className="number">{followers.length}</p>
                            <p>followers</p>
                        </div>
                    </div>
                    <div className="userDetailsBottom">
                        <div className="nameAndLocation">
                            <p className="name">{props.user.name}</p>
                            <p className="location">{props.user?.location?.name}</p>
                        </div>
                        <div className="hobbies">
                            {
                                props.user.hobbies.map(hobby => {
                                    return(
                                        <div className="hobby" key={hobby._id}>
                                            <p>{hobby.hobby_name}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="descritpion">
                            <p>{props.user.bio}</p> 
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userReducer.user,
        hobby : state.hobbyReducer.hobby
    }
}

export default connect(mapStateToProps)(User);
