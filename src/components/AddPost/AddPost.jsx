import React, { useState } from 'react'
import Modal from '../Modal/Modal';

import ImageCropper from '../ImageCropper/ImageCropper';
import { connect } from 'react-redux';

const AddPost = (props) => {


    const [nextStep, setNextStep] = useState(false)
    const [selected, setSelected] = useState({});
    const [hobby, setHobby] = useState('')

    // Modal Hook
    const [active, setActive] = useState(false);
    const toggle = () => {
        setActive(!active)
    } 

    // Image cropper formData

    const [formData, setformData] = useState({});

    const handleChange = (value) => {
        setformData(value)
        setNextStep(true)
    }


    const selectHobby = (hobby_id) => {
        setSelected({[hobby_id]:{backgroundColor: '#f05356', color: 'white'}})
        setHobby(hobby_id)
        //setMessage('')
    }




    return (
        <div>
            <div className="configComponent" onClick={()=>toggle()}>{props.children}</div>
                <Modal active={active} toggle={()=>toggle()}>
                    <div className="addPostContainer">
                        <h1>New Post</h1>
                        <div className="addPostInfo">

                            { ! nextStep ?
                                <>
                                    <h2>Choose a picture from your gallery</h2>
                                    <ImageCropper onChange={handleChange}>
                                        Continue
                                    </ImageCropper>
                                </>
                                :
                                <>
                                    <div className="secondStepContainer">
                                        <div className="inputEvent inputHobbies">
                                            <p className="titles">Select 1 of your hobbies</p>
                                            <div className="hobbies">
                                                {
                                                    props.user.hobbies.map(hobby => {
                                                        return(
                                                            <div className="hobby" style={selected[hobby._id]} key={hobby._id} onClick={()=>selectHobby(hobby._id)}>
                                                                <p>{hobby.hobby_name}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userReducer.user,
        location: state.userReducer.location
    }
}

export default connect(mapStateToProps)(AddPost); 
