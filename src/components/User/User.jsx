import React from 'react'
import Footer from '../Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

const User = (props) => {
    return (
        <div className="userComponent">
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="userContainer">
                <div className="profilePic">
                    <FontAwesomeIcon icon={faUserCircle} className="iconBtn" />
                </div>
                <div className="userDetails">
                    <div className="userDetailsTop">
                        <p className="userName">{props.user?.user_name}</p>
                        <div className="editProfile">
                            <p>Edit profile</p>
                            <FontAwesomeIcon icon={faUserCog} className="iconBtn" />
                        </div>
                    </div>
                    <div className="userDetailsMiddle">
                        <div className="events sections">
                            <p className="number">#</p>
                            <p>events</p>
                        </div>
                        <div className="posts sections">
                            <p className="number">#</p>
                            <p>posts</p>
                        </div>
                        <div className="following sections">
                            <p className="number">#</p>
                            <p>following</p>
                        </div>
                        <div className="followers sections">
                            <p className="number">#</p>
                            <p>followers</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userReducer.user,
    }
}

export default connect(mapStateToProps)(User);
