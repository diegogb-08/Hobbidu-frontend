import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'

const ControlPanel = () => {
    return (
        <div className="controlPanelComponent">
            <div className="controlPanelLeft">

            </div>
            <div className="controlPanelRight">
                <FontAwesomeIcon icon={faPlusSquare} className={'iconBtn'} />
            </div>
        </div>
    )
}

export default ControlPanel
