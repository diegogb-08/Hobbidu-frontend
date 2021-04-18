import React from 'react'
import {useState} from 'react';
import Modal from '../Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faAt, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/types/userType';
import { CLEAN } from '../../redux/types/hobbyType';
import { useHistory } from 'react-router';


function Setting(props) {

    let history = useHistory()

    // Modal Hook
    const [active, setActive] = useState(false);

    const toggle = () => {
        setActive(!active)
    } 
    
    const logout = () => {
        setTimeout(()=> {
            props.dispatch({type: LOGOUT, payload: {} })
            props.dispatch({type: CLEAN, payload: [] })
            history.push('/')
            toggle()
        },500)
    }

    const sendMeTo = (path) => {
        setTimeout(()=>{history.push(path)},500)
    }

    

    return (
        <div>
            <div onClick={toggle}>{props.children}</div>
                <Modal active={active} toggle={toggle}>
                    <div className="settingContainer">
                        <div className="settingMenu" onClick={()=>sendMeTo('/change_email')}>
                            <FontAwesomeIcon icon={faAt} />
                            <p>Change Email</p>
                        </div>
                        <div className="settingMenu" onClick={()=>sendMeTo('/change_password')}>
                            <FontAwesomeIcon icon={faUnlockAlt} />
                            <p>Change Password</p>
                        </div>
                        <div className="settingMenu" onClick={()=>logout()}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                            <p>Log Out!</p>
                        </div>
                    </div>
                </Modal>
        </div>
    )
}

export default connect()(Setting);
