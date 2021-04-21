import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { port } from '../../tools/apiPaths';

const Avatar = (props) => {

    const profilePic = props.profilePic;

    return (
        <div className="avatarComponent" onClick={props.onClick}>
                {
                    props.user?.profile_img ? 
                    <>
                        <div className="imageCropper">
                            <img className="profileImg" src={profilePic ? port+'/'+profilePic : port+'/'+props.user?.profile_img} alt="Avatar"/>
                        </div>
                    </>
                    :
                    <>
                        <div className="profilePic">
                            <FontAwesomeIcon icon={faUserCircle} className="iconBtn" />
                        </div>
                    </>
                }

        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userReducer.user,
    }
}

export default connect(mapStateToProps)(Avatar); 
