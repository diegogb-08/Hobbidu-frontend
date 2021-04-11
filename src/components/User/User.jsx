import React  from 'react'
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
                    <div className="userDetailsBottom">
                        <div className="name">
                            <p>{props.user.name}</p> 
                        </div>
                        <div className="hobbies">
                            {
                                props.user.hobbies.map(hobby => {
                                    return(
                                        <div className="hobby" key={hobby._id}>
                                            <p>{hobby.hobby_name}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="descritpion">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum mollitia quo corrupti labore qui</p> 
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
        hobby : state.hobbyReducer.hobby
    }
}

export default connect(mapStateToProps)(User);
