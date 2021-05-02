import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { meeting, port, comment } from '../../tools/apiPaths'
import ControlPanel from '../ControlPanel/ControlPanel'
import Footer from '../Footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faUserPlus, faCheck  } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import moment from 'moment'
import Avatar from '../Avatar/Avatar'
import EditEvent from '../AddEvent/EditEvent'
import { CHECKUSER } from '../../redux/types/userType'
import { useHistory } from 'react-router'

const Event = (props) => {

    let history = useHistory()

    const [event, setEvent] = useState({});
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('')

    let leftSpots = event.maxJoiners - event.joiners?.length;

    useEffect(()=>{
        getEvent()
        getPosts()
        // eslint-disable-next-line
    },[])

    // it detects the changes from the input and on key press Enter, sends the info to multiSearch()
    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter" || event.keyCode === 13) {
                post()
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
  
    // Functions

    const joinUser = async (event) => {

        let body = {
            user_id : props.user._id
        }

        try{

            let result = await axios.put(port+meeting+'/join/'+event._id, body)
            if(result)
                setEvent(result.data)

        }catch (err){

        }

    }

    const getEvent = async () => {

        try{
            let result = await axios.get(port+meeting+'/'+props.event._id)
            if(result.data)
                setEvent(result.data)
        }catch(err){

        }
    }

    // This function set up the FontAwesome icon for each event taking into consideration if the user is a joiner or not
    const getJoiners = (joiners) => {

        if(joiners?.find(element => element._id === props.user._id) !== undefined)
            return faCheck;
        else
            return faUserPlus;
        
    }

    const setJoinGoin = (joiners) => {

        if(joiners?.find(element => element._id === props.user._id) !== undefined)
            return 'Going';
        else
            return 'Join';
        
    }

    // Get all posts from the backend once it mount

    const getPosts = async () => {
        
        try{
            let result = await axios.get(port+comment+meeting+'/'+props.event._id);
            if(result.data)
                setComments(result.data)

        }catch (err) {

        }
    }

    // post new comments and brings all new comments

    const post = async () => {

        let body = {
            event_id: props.event._id,
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


    return (
        <div className="eventComponent">
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <ControlPanel/>
            <div className="eventCointainer">
                <h2 className="title">{event.title}</h2>
                {
                    event?.user_id?._id === props.user?._id ?
                    <>
                        <div className="edit">
                            <EditEvent event={event} >
                                <FontAwesomeIcon icon={faEdit} />
                            </EditEvent>
                        </div>
                    </>
                    :
                    <>
                    </>
                }
                <div className="eventInfoContainer">
                    <div className="eventInfo">
                        <div className="eventInfoLeft">
                            <div className="location">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="icon"/>
                                <p>{event.location?.name}</p>
                            </div>
                            <h3>{moment(event?.event_date).format('Do MMMM YYYY, h:mm a')}</h3>
                            <div className="createdBy">
                                <div className="iconBtnAvatar">
                                    <Avatar src={port+'/'+ event?.user_id?.profile_img}/>
                                </div>
                                <p>{event?.user_id?.user_name}</p>
                                <div className="hobbyTagContainer">
                                    <div className="hobbyTag">
                                        <p>{event?.hobby_id?.hobby_name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="spacer"></div>
                            <div className="spacer"></div>
                            <div className="spacer"></div>
                            <div className="description">
                                <p>{event.description}</p>
                            </div>
                        </div>
                        <div className="eventInfoRight">
                            <div className="eventInfoRightContainer">
                                <div className="joiners">
                                    <p>{event.joiners?.length} joiner/s</p>
                                    <p className="spotsLeft"> {leftSpots} spots left!</p>
                                </div>
                                <div className="vehicleContainer">
                                    <p><b>Own vehicle:</b> {event.vehicle ? 'Yes' : 'No'}</p>
                                    {
                                        event.vehicle ?
                                        <>
                                            <p>{event.seats} seat/s left</p>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                </div>
                                <div className="addJoiner">
                                    <div className="signUp" onClick={()=>joinUser(event)}>
                                        <FontAwesomeIcon icon={getJoiners(event?.joiners)} className="joinUserIcon"/>
                                        <p>{setJoinGoin(event?.joiners)}</p>
                                    </div>
                                </div>
                                <div className="renderJoiners">
                                    {
                                        event.joiners?.map(joiner => {
                                            
                                            return (
                                                <div className="joiner" key={joiner._id} onClick={()=>checkUserProfile(joiner)}>
                                                    <div className="iconBtnAvatar">
                                                        <Avatar src={port+'/'+joiner.profile_img}/>
                                                    </div>
                                                    <p>{joiner.name}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="commentContainer">
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
                        <div className="postComment">
                            <input type="text" name="content" placeholder="Add a comment" onChange={handleChange}/>
                            <p onClick={()=>post()}>Post</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="spacer"></div>
            <div className="sapcer"></div>
            <div className="sapcer"></div>
            <div className="sapcer"></div>

            <Footer/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userReducer.user,
        location: state.userReducer.location,
        event : state.eventReducer.event
    }
}

export default connect(mapStateToProps)(Event) 
