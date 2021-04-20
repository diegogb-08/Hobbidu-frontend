import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faCalendarPlus } from '@fortawesome/free-regular-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import ModalRender from '../Modal/ModalRender';
import AddEvent from '../AddEvent/AddEvent';
import AddPost from '../AddPost/AddPost';

const ControlPanel = (props) => {
    return (
        <div className="controlPanelComponent">
            <div className="controlPanelLeft controlPanelContainers">
                <input 
                    type={props.type}
                    name={props.name}
                    maxLength={props.length}
                    onChange={props.onChange}
                    onKeyDown={props.onKeyDown}
                    value={props.value}
                    style={props.style}
                    placeholder="Search people and events... Enter"
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
        </div>
    )
}

export default ControlPanel
