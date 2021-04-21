import React, { useState } from 'react'
import Modal from '../Modal/Modal';
import GeoLocation from '../GeoLocation/GeoLocation';
import { connect } from 'react-redux';
import Button from '../Button/Button';

const AddEvent = (props) => {
    // Modal Hook
    const [active, setActive] = useState(false);
    const toggle = () => {
        setActive(!active)
    } 

    const [selected, setSelected] = useState({});

    // Functions

    const selectHobby = (hobby_id) => {

        setSelected({[hobby_id]:{backgroundColor: '#f05356', color: 'white'}})
        console.log(hobby_id)
    }

    return (
        <div>
            <div className="configComponent" onClick={()=>toggle()}>{props.children}</div>
                <Modal active={active} toggle={()=>toggle()}>
                    <div className="AddEventContainer">
                        <h1>Create an Event</h1>
                        <div className="addEventInfo">
                            <div className="addEventSections">
                                <div className="inputEvent">
                                    <p className="titles" >Title</p>
                                    <input type="text"/>
                                </div>
                                <div className="inputEvent inputHobbies">
                                    <p className="titles">Select 1 of your hobbies</p>
                                    <div className="hobbies">
                                        {
                                            props.user.hobbies.map(hobby => {
                                                return(
                                                    <div className="hobby" style={selected[hobby._id]} key={hobby._id} onClick={()=>selectHobby(hobby._id)}>
                                                        <p>{hobby.hobby_name}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="inputEvent">
                                    <p className="titles">Date and time</p>
                                    <input type="text"/>
                                </div>
                                <div className="inputEvent">
                                    <p className="titles">Location</p>
                                    <GeoLocation />
                                </div>
                            </div>
                            <div className="addEventSections">
                                <div className="inputEvent">
                                    <p className="titles">Add a friend</p>
                                    <input type="text"/>
                                </div>
                                <div className="inputEvent">
                                    <p className="titles">Description</p>
                                    <textarea  cols="30" rows="8"/>
                                </div>
                                <div className="inputButton">
                                    <div className="eventButton">
                                        <Button><p>Create Event</p></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userReducer.user,
    }
}

export default connect(mapStateToProps)(AddEvent);
