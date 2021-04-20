import React from 'react'
import ControlPanel from '../ControlPanel/ControlPanel'
import Footer from '../Footer/Footer'

const EventView = () => {
    return (
        <div className="eventViewComponent">
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <ControlPanel/>
            <div className="eventViewContainer">

            </div>

            <Footer/>
        </div>
    )
}

export default EventView
