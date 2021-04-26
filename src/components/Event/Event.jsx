import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { meeting, port } from '../../tools/apiPaths'
import ControlPanel from '../ControlPanel/ControlPanel'
import Footer from '../Footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faUserPlus, faCheck  } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import Avatar from '../Avatar/Avatar'

const Event = (props) => {

    const [event, setEvent] = useState({});

    let leftSpots = event.maxJoiners - event.joiners?.length;

    useEffect(()=>{
        getEvent()
        // eslint-disable-next-line
    },[])
  
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
            console.log(err)
        }
    }

    // This function set up the FontAwesome icon for each event taking into consideration if the user is a joiner or not
    const getJoiners = (joiners) => {

        if(joiners?.find(element => element === props.user._id) !== undefined)
            return faCheck;
        else
            return faUserPlus;
        
    }


    return (
        <div className="eventComponent">
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <ControlPanel/>
            <div className="eventCointainer">
                <h2 className="title">{props.event.title}</h2>
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
                                        <p>Join</p>
                                    </div>
                                </div>
                                <div className="renderJoiners">
                                    {
                                        event.joiners?.map(joiner => {
                                            
                                            return (
                                                <div className="joiner" key={joiner._id}>
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
                    <div className="comments">

                    </div>
                </div>
            </div>
            <div className="spacer"></div>
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
