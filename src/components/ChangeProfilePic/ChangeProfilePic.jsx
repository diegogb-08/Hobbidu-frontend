import React, { useState } from 'react'
import { connect } from 'react-redux'
import Avatar from '../Avatar/Avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios'
import { customer, port } from '../../tools/apiPaths';
import { UPDATE } from '../../redux/types/userType';

const ChangeProfilePic = (props) => {

    //AUTHORIZATION

    let token = props.token
    let auth = {
        headers: {
        'Authorization': `Bearer ${token}` 
        }};

    const [selectedFile, setSelectedFile] = useState(null)
    const [message, setMessage] = useState('');

    const fileSelectedHandler = (e) => {
        setSelectedFile(e.target.files[0])
        setMessage('Press save to upload your picture')
    }

    const fileUploadhandler = async () => {

        // Create an object of formData
        const formData = new FormData()
        // Update the formData object
        formData.append(
            'profile_img',
            selectedFile,
            selectedFile.name
        )

        const config = {
            onUploadProgress: progressEvent => {
                console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
            }
        }
  
        try{
            let result = await axios.put(port+customer+'/update_picture/'+ props.user._id, formData, auth, config)
            if(result){
                setMessage('Your picture was uploaded succesfully!')
                props.dispatch({type: UPDATE, payload: result.data})
            }else{
                setMessage('Something went wrong!')
            }

        }catch(err){
            console.log(err.message)
            setMessage('Something went wrong!')
        }
    }

    return (
        <div className="changeProfilePicComponent">
            <div className="pictureContainer">
                    <Avatar/>
            </div>
            <div className="inputChangePicture">
                <div className="inputFileContainer">
                    <input className="inputFile" type="file" name="file" id="file" onChange={fileSelectedHandler}/>
                    <label htmlFor="file"><FontAwesomeIcon icon={faImages} className="iconPic" /></label>
                </div>
               <div className="buttonFile" onClick={()=>fileUploadhandler()}>Save Picture</div>
            </div>
            <p>{message}</p>
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
