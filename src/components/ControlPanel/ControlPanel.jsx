import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons'
import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons'
import AddEvent from '../AddEvent/AddEvent';
import AddPost from '../AddPost/AddPost';
import axios from 'axios';
import { customer, port, query, search } from '../../tools/apiPaths';
import Avatar from '../Avatar/Avatar';
import { connect } from 'react-redux';

const ControlPanel = (props) => {

    const [suggestion, setsuggestion] = useState([])

    const handleChange = async (e) => {

        try{

            let result = await axios.get(port+customer+search+query+e.target.value)
            setsuggestion(result.data)

        }catch(err){

        }
    }


    // Functions

    const checkUserProfile = (user) => {
        console.log(user)
    }

    return (
        <div className="controlPanelComponent">
            <div className="controlPanelLeft controlPanelContainers">
                <input 
                    type="text"
                    name="search"
                    onChange={handleChange}
                    style={props.style}
                    placeholder="Search people...    Enter"
                />
            </div>
            <div className="controlPanelRight controlPanelContainers">
                <AddEvent>
                    <FontAwesomeIcon icon={faCalendarPlus} className={'panelBtn'} />
                </AddEvent>
                <AddPost>
                    <FontAwesomeIcon icon={faPlusCircle} className={'panelBtn'} />
                </AddPost>
            </div>
            <div className="autocompleteDropdownContainer">
                {
                    suggestion?.map(user => {
                        if(user?._id === props.user?._id)
                            return;
                        else
                            return (
                                <div className="suggestion" key={user._id} onClick={()=>checkUserProfile(user)}>
                                    <div className="iconBtnAvatar">
                                        <Avatar src={port+'/'+ user?.profile_img}/>
                                    </div>
                                    <p>{user.name}</p>
                                    <FontAwesomeIcon icon={faSearch} className="lens"/>
                                </div>
                            )
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userReducer.user,
        location: state.userReducer.location
    }
}

export default connect(mapStateToProps)(ControlPanel) 
