import React  from 'react'
import Footer from '../Footer/Footer';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import Avatar from '../Avatar/Avatar';
import ControlPanel from '../ControlPanel/ControlPanel';
import { port } from '../../tools/apiPaths';

const CheckUser = (props) => {
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
            <ControlPanel />
            <div className="userContainer">
                <div className="profilePic">
                    <Avatar src={port+'/'+props.checkUser?.profile_img}/>
                </div>
                <div className="userDetails">
                    <div className="userDetailsTop">
                        <p className="userName">{props.checkUser?.user_name}</p>
                        <div className="editProfile">
                            <p onClick={()=>editProfile()}>Follow</p>
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
                            <p className="name">{props.checkUser?.name}</p>
                            <p className="location">{props.checkUser?.location?.name}</p>
                        </div>
                        <div className="hobbies">
                            {
                                props.checkUser?.hobbies.map(hobby => {
                                    return(
                                        <div className="hobby" key={hobby?._id}>
                                            <p>{hobby?.hobby_name}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="descritpion">
                            <p>{props.checkUser?.bio}</p> 
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
        checkUser : state.userReducer.checkUser,
        hobby : state.hobbyReducer.hobby,
        user : state.userReducer.user
    }
}
export default connect(mapStateToProps)(CheckUser) 
