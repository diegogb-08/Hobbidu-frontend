import React from 'react'
import { connect } from 'react-redux'
import ControlPanel from '../ControlPanel/ControlPanel'
import Footer from '../Footer/Footer'

const Event = (props) => {
    return (
        <div className="eventComponent">
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <ControlPanel/>
            <div className="eventCointainer">
                    
            </div>

            <Footer/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userReducer.user,
        location: state.userReducer.location,
        event : state.eventReducer
    }
}

export default connect(mapStateToProps)(Event) 
