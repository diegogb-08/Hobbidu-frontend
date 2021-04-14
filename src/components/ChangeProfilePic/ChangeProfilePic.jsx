import React from 'react'
import { connect } from 'react-redux'

const ChangeProfilePic = () => {
    return (
        <div className="changeProfilePicComponent">
            Change picture HERE
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userReducer.user,
        token : state.userReducer.token
    }
}

export default connect(mapStateToProps)(ChangeProfilePic);
