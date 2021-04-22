import React, { useState } from 'react'
import { connect } from 'react-redux';
import ControlPanel from '../ControlPanel/ControlPanel';

import Footer from '../Footer/Footer'
import GeoLocation from '../GeoLocation/GeoLocation';

const EventView = (props) => {

    // Hooks

    const [distance, setDistance] = useState(5)

    // Handlers

    const handleChange = () => {
        
    }


    return (
        <div className="eventViewComponent">
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="halfSpacer"></div>
            <ControlPanel/>
            <div className="eventViewContainer">
                <div className="filterEvents">
                    <div className="filterDistance">
                        <p>Within</p>
                        <select className="selector" name="distance" onChange={handleChange}>
                            <option value={5}    > 5 km </option>
                            <option value={10}   > 10 km </option>
                            <option value={25}   > 25 km </option>
                            <option value={50}   > 50 km </option>
                            <option value={100}  > 100 km </option>
                            <option value={1000} > any dinstance </option>
                        </select>
                        <p>of</p>
                        <GeoLocation/>   
                    </div>
                </div>
                <div className="renderEventsContainer">

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
