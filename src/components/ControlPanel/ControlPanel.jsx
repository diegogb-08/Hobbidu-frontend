import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons'
import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons'
import AddEvent from '../AddEvent/AddEvent';
import AddPost from '../AddPost/AddPost';
import axios from 'axios';
import { customer, port, query, search } from '../../tools/apiPaths';
import Avatar from '../Avatar/Avatar';
import { connect } from 'react-redux';
import { CHECKUSER } from '../../redux/types/userType';
import { useHistory } from 'react-router';

const ControlPanel = (props) => {

    let history = useHistory()
    const node = useRef();

    const [suggestion, setsuggestion] = useState([])


    // Handling change of input and calling api to get user

    const handleChange = async (e) => {

        try{

            let result = await axios.get(port+customer+search+query+e.target.value)
            setsuggestion(result.data)

        }catch(err){

        }
    }

    // Detect when pressing or clicking outside dropdownmenu

    useEffect(() => {
        document.addEventListener('keydown', handleEscape);
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener("mousedown", handleClick);
        };
    },[]);

    // Functions

    const checkUserProfile = (user) => {
        props.dispatch({type: CHECKUSER, payload: user})
        setTimeout(()=>{history.push(`/${user.user_name}`)})
    }


    const handleClick = e => {
        if (node.current.contains(e.target)) {
          // inside click
          return;
        }
        // outside click 
        setsuggestion([]);
    };

    const handleEscape = (event) => {
        if (event.key === 'Escape' || event.keyCode === 27) {
            setsuggestion([]);
        }
    };


    return (
        <div className="controlPanelComponent">
            <div className="controlPanelLeft controlPanelContainers">
                <input 
                    type="text"
                    name="search"
                    onChange={handleChange}
                    style={props.style}
                    placeholder="Search for people..."
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
                <div ref={node}>
                    {
                        suggestion?.map(user => {
                            if(user?._id === props.user?._id)
                                // eslint-disable-next-line
                                return;
                            else
                                return (
                                    <div className="suggestion" key={user._id} onClick={()=>checkUserProfile(user)}>
                                        <div className="iconBtnAvatar">
                                            <Avatar src={port+user?.profile_img}/>
                                        </div>
                                        <p>{user.name}</p>
                                        <p>@{user.user_name}</p>
                                        <FontAwesomeIcon icon={faSearch} className="lens"/>
                                    </div>
                                )
                        })
                    }
                </div>
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
