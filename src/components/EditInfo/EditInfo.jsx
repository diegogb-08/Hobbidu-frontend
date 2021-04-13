import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from '../Button/Button'
import InputForm from '../InputForm/InputForm'
//import validate from "../../tools/validate";
import GeoLocation from '../GeoLocation/GeoLocation';

const EditInfo = (props) => {

    // Style variable error

    // const styles = {
    //     error: {
    //         borderColor: '#c92432',
    //         color: '#c92432',
    //         background: '#fffafa',
    //     },
    //     correct: {}
    // }

    // HOOKS

    const [user, setUser] = useState({
        name: props.user?.name ? props.user?.name : '',
        user_name: props.user?.user_name ? props.user?.user_name : '',
        birth_date: props.user?.birth_date ? props.user?.birth_date : '',
        phone_number: props.user?.phone_number ? props.user?.phone_number : '',
        location: props.user?.location ? props.user?.location : '',
        bio: props.user?.bio ? props.user?.bio : '',
    })


    const handleState = (e) => {
        setUser({...user, [e.target.name]: e.target.type === "number" ? + e.target.value : e.target.value});
    }

    const toggle = () => {

    }

    return (
        <div className="editInfoComponent">
            <div className="editInfoContainer">
                <div className="editSections">
                    <p className="title">Name</p>
                    <div className="inputAndDescription">
                        <div className="inputContainer">
                            <InputForm type="text" name="name" lenght="16" onChange={handleState} value={user.name} />
                        </div>
                        <p>To help people discover your account, use the name that people know you by,
                        like your full name, nickname, or business name.</p>
                    </div>
                </div>
                <div className="editSections">
                    <p className="title">User name</p>
                    <div className="inputAndDescription">
                        <div className="inputContainer">
                            <InputForm type="text" name="user_name" lenght="16" onChange={handleState} value={user.user_name}/>
                        </div>
                        <p>The user name must contain between 6 to 16 characters and special characters like "_" or ".".</p>
                    </div>
                </div>
                <div className="editSections">
                    <p className="title">Birth date</p>
                    <div className="inputAndDescription">
                        <div className="inputContainer">
                            <InputForm type="date" name="birth_date" lenght="16" onChange={handleState} value={user.birth_date}/>
                        </div>
                    </div>
                </div>
                <div className="editSections">
                    <p className="title">Phone number</p>
                    <div className="inputAndDescription">
                        <div className="inputContainer">
                            <InputForm type="text" name="phone_number" lenght="16" onChange={handleState} value={user.phone_number}/>
                        </div>
                    </div>
                </div>
                <div className="editSections">
                    <p className="title">Biography</p>
                    <div className="inputAndDescription">
                        <div className="inputContainer">
                            <textarea className="inputText" rows="3" cols="50" name="bio" maxLength="100" onChange={handleState} value={user.bio}/> 
                        </div>
                        <div className="spacer"></div>
                        <div className="spacer"></div>
                        <div className="spacer"></div>
                        <p>Provide your personal information, even if the account is used for a business. This information will not be included in your public profile. </p>
                    </div>
                </div>
                <div className="editSections">
                    <p className="title">Location</p>
                    <div className="inputAndDescription">
                        <div className="inputContainer geolocation">
                            <GeoLocation></GeoLocation>
                        </div>
                    </div>
                </div>
                <div className="buttonEditContainer">
                    <div className="buttonEdit">
                        <Button onClick={()=>toggle()}>
                            <p>Save</p>
                        </Button>
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
