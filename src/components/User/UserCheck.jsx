import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import { connect } from 'react-redux'
import Avatar from '../Avatar/Avatar'
import ControlPanel from '../ControlPanel/ControlPanel'
import { port, follow, USER, EVENT, POST } from '../../helper/apiPaths'
import axios from 'axios'

const CheckUser = (props) => {
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])
  const [followBtn, setFollowBtn] = useState('')
  const [events, setEvents] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getFollows()
    getEvents()
    getPosts()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (
      followers.find((element) => element?.follower_id === props.user._id) ===
      undefined
    ) {
      setFollowBtn('Follow')
    } else {
      setFollowBtn('Following')
    }
    // eslint-disable-next-line
  }, [followers])

  // Functions

  const getFollows = async () => {
    try {
      const result = await axios.get(
        port + follow + USER + '/' + props.checkUser._id
      )
      setFollowers(result.data.followers)
      setFollowing(result.data.following)
    } catch (err) {}
  }

  const getEvents = async () => {
    try {
      const result = await axios.get(
        port + EVENT + USER + '/' + props.checkUser._id
      )
      if (result.data) setEvents(result.data)
    } catch (err) {}
  }

  const getPosts = async () => {
    try {
      const result = await axios.get(
        port + POST + '/own/' + props.checkUser._id
      )

      if (result.data) setPosts(result.data)
    } catch (err) {}
  }

  const followUser = async (state) => {
    if (state === 'Following') {
      try {
        const element = followers.find(
          (element) => element?.follower_id === props.user._id
        )
        const result = await axios.delete(port + follow + '/' + element._id)
        if (result.data) getFollows()
      } catch (err) {}
    } else {
      try {
        const body = {
          user_id: props.checkUser._id,
          follower_id: props.user._id,
        }

        const result = await axios.post(port + follow, body)
        if (result.data) getFollows()
      } catch (err) {}
    }
  }

  return (
    <div className='userComponent'>
      <div className='spacer'></div>
      <div className='spacer'></div>
      <div className='spacer'></div>
      <div className='spacer'></div>
      <ControlPanel />
      <div className='userContainer'>
        <div className='profilePic'>
          <Avatar src={port + props.checkUser?.profile_img} />
        </div>
        <div className='userDetails'>
          <div className='userDetailsTop'>
            <p className='userName'>{props.checkUser?.user_name}</p>
            <div className='editProfile'>
              <p onClick={() => followUser(followBtn)}>{followBtn}</p>
            </div>
          </div>
          <div className='userDetailsMiddle'>
            <div className='events sections'>
              <p className='number'>{events.length}</p>
              <p>events</p>
            </div>
            <div className='posts sections'>
              <p className='number'>{posts.length}</p>
              <p>posts</p>
            </div>
            <div className='following sections'>
              <p className='number'>{following.length}</p>
              <p>following</p>
            </div>
            <div className='followers sections'>
              <p className='number'>{followers.length}</p>
              <p>followers</p>
            </div>
          </div>
          <div className='userDetailsBottom'>
            <div className='nameAndLocation'>
              <p className='name'>{props.checkUser?.name}</p>
              <p className='location'>{props.checkUser?.location?.name}</p>
            </div>
            <div className='hobbies'>
              {props.checkUser?.hobbies.map((hobby) => {
                return (
                  <div className='hobby' key={hobby?._id}>
                    <p>{hobby?.hobby_name}</p>
                  </div>
                )
              })}
            </div>
            <div className='descritpion'>
              <p>{props.checkUser?.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    checkUser: state.userReducer.checkUser,
    hobby: state.hobbyReducer.hobby,
    user: state.userReducer.user,
  }
}
export default connect(mapStateToProps)(CheckUser)
