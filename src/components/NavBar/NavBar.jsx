import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons'
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import Avatar from '../Avatar/Avatar';
import { port } from '../../tools/apiPaths';

const NavBar = (props) => {

    let history = useHistory()

    let userPath = props.user?.user_name

    const toggle = (path) => {
        return setTimeout(()=> {history.push(`/${path}`)},500) 
    }
  

    return (
        <div className="navBarComponent">
            <FontAwesomeIcon icon={faHouseUser} className={'iconBtn'} onClick={()=>toggle('home')}/>
            <FontAwesomeIcon icon={faCalendarCheck} className={'iconBtn'}  onClick={()=>toggle('events')}/>
            {/* <FontAwesomeIcon icon={faCommentDots} className={'iconBtn'}  onClick={()=>toggle('messages')}/> */}
            <div className="iconBtnAvatar">
                <Avatar src={port+props.user.profile_img} onClick={()=>toggle(userPath)}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userReducer.user,
    }
}

export default connect(mapStateToProps)(NavBar) 
