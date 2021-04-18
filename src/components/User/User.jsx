import React  from 'react'
import Footer from '../Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import Setting from '../Setting/Setting';
import { useHistory } from 'react-router';
import Avatar from '../Avatar/Avatar';

const User = (props) => {

    let history = useHistory()

    const editProfile = () => {
        setTimeout(()=>{ history.push('/account/edit')})
    }

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
                    {
                        props.user?.profile_img ?
                        <Avatar/>
                        :
                        <FontAwesomeIcon icon={faUserCircle} className="iconBtn" />
                    }
                </div>
                <div className="userDetails">
                    <div className="userDetailsTop">
                        <p className="userName">{props.user?.user_name}</p>
                        <div className="editProfile">
                            <p onClick={()=>editProfile()}>Edit profile</p>
                            <Setting>
                                <FontAwesomeIcon icon={faUserCog} className="iconBtn" />
                            </Setting>
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
                        <div className="nameAndLocation">
                            <p className="name">{props.user.name}</p>
                            <p className="location">{props.user?.location}</p>
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
                            <p>{props.user.bio}</p> 
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
