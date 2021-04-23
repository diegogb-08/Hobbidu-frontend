import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { meeting, port } from '../../tools/apiPaths';
import ControlPanel from '../ControlPanel/ControlPanel';
import moment from 'moment';
import Footer from '../Footer/Footer'
import GeoLocation from '../GeoLocation/GeoLocation';

const EventView = (props) => {

    // Hooks

    const [distance, setDistance] = useState(25000)
    const [events, setEvents] = useState([])
    const [message, setMessage] = useState('')

    // Handlers

    const handleChange = (e) => {
        setDistance(parseInt(e.target.value))
    }

    useEffect(()=>{
        filterEventsCall()
        // eslint-disable-next-line 
    },[distance,props.location.coordinates])

    // Functions

    const filterEventsCall = async () => {

        let body = {
            distance: distance,
            coords: props.location.coordinates
        }

        try{

            let result = await axios.post(port+meeting+'/distance', body);
            
            if (result)
                return setEvents(result.data);
            else
                return setMessage('Not events found. Try to set up other params or start posting your events.')
            
        }catch (err){
            setMessage('Not events found. Try to set up other params or start posting your events.')
        }

    }

    const openEvent = () => {

    }


    return (
        <div className="eventViewComponent">
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <ControlPanel/>
            <div className="eventViewContainer">
                <div className="filterEvents">
                    <div className="filterDistance">
                        <p>Within</p>
                        <select className="selector" name="distance" onChange={handleChange}>
                            <option value={5000}   > 5 km </option>
                            <option value={10000}   > 10 km </option>
                            <option value={25000}  defaultChecked > 25 km </option>
                            <option value={50000}   > 50 km </option>
                            <option value={100000}  > 100 km </option>
                            <option value={1000000} > any dinstance </option>
                        </select>
                        <p>of</p>
                        <div className="geolocationEventContainer">
                            <GeoLocation/>
                        </div>
                    </div>
                </div>
                <div className="renderEventsContainer">
                    {
                        events?.length === 0 ?
                        <>
                            <div className="event">
                                <div className="notEvents">
                                    <h2>{message}</h2>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            
                            {
                                events.map(event => {
                                    let leftSpots = event.maxJoiners - event.joiners?.length
                                    if (new Date(event.event_date) >= new Date())
                                        if(props.user?.hobbies.find(element => element === event.hobby_id))
                                            return (
                                                <div className="event" key={event._id}>
                                                    <div className="date">
                                                        <p>{moment(event.event_date).format('ddd, Do MMM YYYY')}</p>
                                                    </div>
                                                    <div className="eventContent">
                                                        <div className="eventContentLeft">
                                                            <h2 onClick={()=>openEvent()}>{event.title}</h2>
                                                            <p>{event.location.name}</p>
                                                            <div className="joinersSpotsLeft">
                                                                <p>{event.joiners?.length} joiner</p>
                                                                <p className="spotsLeft"> {leftSpots} spots left!</p>
                                                            </div>
                                                        </div>
                                                        <div className="eventContentRight">
                                                            <p><b>Own vehicle:</b> {event.vehicle ? 'Yes' : 'No'}</p>
                                                            {
                                                                event.vehicle ?
                                                                <>
                                                                    <p>{event.seats} seats left</p>
                                                                </>
                                                                :
                                                                <>
                                                                </>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        else
                                            return (
                                                <div className="event" key={event._id}>
                                                    <div className="date">
                                                        <p>{moment(event.event_date).format('ddd, Do MMM YYYY')}</p>
                                                    </div>
                                                    <div className="eventContent">
                                                        <div className="eventContentLeft">
                                                            <h2 onClick={()=>openEvent()}>{event.title}</h2>
                                                            <p>{event.location.name}</p>
                                                            <div className="joinersSpotsLeft">
                                                                <p>{event.joiners?.length} joiner</p>
                                                                <p className="spotsLeft"> {leftSpots} spots left!</p>
                                                            </div>
                                                        </div>
                                                        <div className="eventContentRight">
                                                            <p><b>Own vehicle:</b> {event.vehicle ? 'Yes' : 'No'}</p>
                                                            {
                                                                event.vehicle ?
                                                                <>
                                                                    <p>{event.seats} seats left</p>
                                                                </>
                                                                :
                                                                <>
                                                                </>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        // eslint-disable-next-line
                                    return;
                                })
                            }

                        </>
                    }
                    <div className="spacer"></div>
                    <div className="spacer"></div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userReducer.user,
        location: state.userReducer.location
    }
}

export default connect(mapStateToProps)(EventView); 
