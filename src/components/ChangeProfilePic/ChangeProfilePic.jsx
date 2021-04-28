import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Avatar from '../Avatar/Avatar'
import axios from 'axios'
import { customer, port } from '../../tools/apiPaths';
import { UPDATE } from '../../redux/types/userType';
import ImageCropper from '../ImageCropper/ImageCropper';

const ChangeProfilePic = (props) => {

    //AUTHORIZATION

    let token = props.token

    let auth = {
        headers: {
        'Authorization': `Bearer ${token}` 
        }};

    const [message, setMessage] = useState('');
    const [formData, setformData] = useState({})

    const handleChange = (value) => {
        setformData(value)
       
    }

    useEffect(()=>{
        fileUploadhandler()
    },[formData])
    
    const fileUploadhandler = async () => {

            console.log()
            try{
                let result = await axios.put(port+customer+'/update_picture/'+ props.user._id, formData, auth)
                console.log(result)
                if(result){
                    setMessage('Your picture was uploaded succesfully!')
                    props.dispatch({type: UPDATE, payload: result.data})
                }else{
                    setMessage('Something went wrong!')
                }

            }catch(err){
                setMessage('Something went wrong!')
            }
    }

    return (
        <div className="changeProfilePicComponent">
            <div className="pictureContainer">
                    <Avatar src={port+'/'+props.user.profile_img}/>
            </div>
            {/* <p>{message}</p> */}
            <div className="inputChangePicture">
                <ImageCropper onChange={handleChange}/>
            </div>
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
