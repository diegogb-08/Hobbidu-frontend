import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { customer, meeting, port } from '../../tools/apiPaths'
import ControlPanel from '../ControlPanel/ControlPanel'
import Footer from '../Footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import Avatar from '../Avatar/Avatar'

const Event = (props) => {

    const [event, setEvent] = useState({})
    const [creator, setCreator] = useState({})

    //console.log(event)
    console.log(creator)

    useEffect(()=>{
        getEvent()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        getUser()
        // eslint-disable-next-line
    },[event])


    // Functions

    const getEvent = async () => {

        try{
            let result = await axios.get(port+meeting+'/'+props.event._id)
            if(result.data)
                setEvent(result.data)
        }catch(err){
            
        }
    }

    const getUser = async () => {

        try{
            let result = await axios.get(port+customer+'/'+event.user_id)
            if(result.data)
                return setCreator(result.data)
        }catch(err){
            
        }
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
                                            <Avatar src={port+'/'+creator.profile_img}/>
                                        </div>
                                    <p>{creator.user_name}</p>
                                </div>
                            </div>
                            <div className="evenInfoRight">

                            </div>
                        </div>
                        <div className="comments">

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
        location: state.userReducer.location,
        event : state.eventReducer.event
    }
}

export default connect(mapStateToProps)(Event) 
