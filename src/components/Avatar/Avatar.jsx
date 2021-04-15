import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { port } from '../../tools/apiPaths';

const Avatar = (props) => {


    console.log(props.user?.profile_img)
    return (
        <div className="avatarComponent">
            <div className="profilePic">
                {
                    props.user?.profile_img ? 
                    <>
                        <img className="profileImg" src={port+'/'+props.user?.profile_img} alt="Avatar"/>
                    </>
                    :
                    <>
                        <FontAwesomeIcon icon={faUserCircle} className="iconBtn" />
                    </>
                }
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userReducer.user,
    }
}

export default connect(mapStateToProps)(Avatar); 
