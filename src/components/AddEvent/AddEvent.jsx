import React, { useState } from 'react'
import Modal from '../Modal/Modal';


const AddEvent = (props) => {
    // Modal Hook
    const [active, setActive] = useState(false);
    const toggle = () => {
        setActive(!active)
    } 

    return (
        <div>
            <div className="configComponent" onClick={()=>toggle()}>{props.children}</div>
                <Modal active={active} toggle={()=>toggle()}>
                    <div className="AddEventContainer">
                        <h2>Create an Event</h2>
                        <div className="addEventInfo">
                            <div className="inputEvent">
                                <p>Title</p>
                                <input type="text"/>
                            </div>
                            <div className="inputEvent">
                                <p>Select 1 of your hobbies</p>
                            </div>
                            <div className="inputEvent">
                                <p>Date and time</p>
                                <input type="text"/>
                            </div>
                            <div className="inputEvent">
                                <p>Location</p>
                                <input type="text"/>
                            </div>
                            <div className="inputEvent">
                                <p>Description</p>
                                <input type="text"/>
                            </div>
                            <div className="inputEvent">
                                <p>Add a friend</p>
                                <input type="text"/>
                            </div>
                            <div className="inputEvent">
                                <p>Content</p>
                                <textarea />
                            </div>
                            <div className="inputEvent">
                                <p>Price</p>
                                <input type="text"/>
                            </div>
                        </div>
                    </div>
                </Modal>
        </div>
    )
}

export default AddEvent
