import React, { useState } from 'react'
import { connect } from 'react-redux'
import InputForm from '../InputForm/InputForm'

const EditInfo = (props) => {

    const [user, setUser] = useState({
        name: props.user?.name ? props.user?.name : '',
        user_name: props.user?.user_name ? props.user?.user_name : '',
        birth_date: props.user?.birth_date ? props.user?.birth_date : '',
        phone_number: props.user?.phone_number ? props.user?.phone_number : '',
        location: props.user?.location ? props.user?.location : '',
        bio: props.user?.bio ? props.user?.bio : '',
    })

    return (
        <div className="editInfoComponent">
            <div className="editInfoContainer">
                <div className="editSections">
                    <p className="title">Name</p>
                    <div className="inputContainer">
                        <InputForm />
                    </div>
                    {/* <p>To help people discover your account, use the name that people know you by, <br/>
                    like your full name, nickname, or business name.</p> */}
                </div>
                <div className="editSections">
                    <p className="title">User name</p>
                    <div className="inputContainer">
                        <InputForm />
                    </div>
                </div>
                <div className="editSections">
                    <p className="title">Birth date</p>
                    <div className="inputContainer">
                        <InputForm />
                    </div>
                </div>
                <div className="editSections">
                    <p className="title">Phone number</p>
                    <div className="inputContainer">
                        <InputForm />
                    </div>
                </div>
                <div className="editSections">
                    <p className="title">Location</p>
                    <div className="inputContainer">
                        <InputForm />
                    </div>
                </div>
                <div className="editSections">
                    <p className="title">Biography</p>
                    <div className="inputContainer">
                        <InputForm />
                    </div>
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userReducer.user,
    }
}

export default connect(mapStateToProps)(EditInfo); 
