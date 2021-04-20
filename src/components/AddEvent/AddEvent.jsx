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

                    Esto es el event
                </Modal>
        </div>
    )
}

export default AddEvent
