import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Avatar from '../Avatar/Avatar'
import axios from 'axios'
import { USER, port } from '../../helper/apiPaths'
import { UPDATE } from '../../redux/types/userType'
import ImageCropper from '../ImageCropper/ImageCropper'

const ChangeProfilePic = (props) => {
  // AUTHORIZATION

  const token = props.token

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const [formData, setformData] = useState({})

  const handleChange = (value) => {
    setformData(value)
  }

  useEffect(() => {
    fileUploadhandler()
    // eslint-disable-next-line
  }, [formData])

  const fileUploadhandler = async () => {
    try {
      const result = await axios.put(
        port + USER + '/update_picture/' + props.user._id,
        formData,
        auth
      )
      if (result.data) {
        props.dispatch({ type: UPDATE, payload: result.data })
      }
    } catch (err) {}
  }

  return (
    <div className='changeProfilePicComponent'>
      <div className='pictureContainer'>
        <Avatar src={port + props.user.profile_img} />
      </div>

      <div className='inputChangePicture'>
        <ImageCropper onChange={handleChange}>Upload</ImageCropper>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    token: state.userReducer.token,
  }
}

export default connect(mapStateToProps)(ChangeProfilePic)
