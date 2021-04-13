import React, {  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle, faEnvelope, faCalendarCheck } from '@fortawesome/free-regular-svg-icons'
import { useHistory } from 'react-router';
import { connect } from 'react-redux';

const NavBar = (props) => {

    let history = useHistory()

    let userPath = props.user?.user_name

    // const [ isSelected, setIsSelected ] = useState({
    //     selected: 'home'
    // })

    // const active = (isSelected.elected ? 'selected' : '');


    const toggle = (path) => {
        // setIsSelected({selected: path})
        return setTimeout(()=> {history.push(`/${path}`)},500) 
    }

    return (
        <div className="navBarComponent">
            <FontAwesomeIcon icon={faHouseUser} className={'iconBtn'} onClick={()=>toggle('home')}/>
            <FontAwesomeIcon icon={faCalendarCheck} className={'iconBtn'}  onClick={()=>toggle('events')}/>
            <FontAwesomeIcon icon={faEnvelope} className={'iconBtn'}  onClick={()=>toggle('messages')}/>
            <FontAwesomeIcon icon={faUserCircle} className={'iconBtn'}  onClick={()=>toggle(userPath)}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userReducer.user,
    }
}

export default connect(mapStateToProps)(NavBar) 
