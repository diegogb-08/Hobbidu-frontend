import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { USER, PORT, POST } from '../../helper/apiPaths'
import ControlPanel from '../../components/ControlPanel/ControlPanel'
import Footer from '../../components/Footer/Footer'
import Post from '../../components/Post/Post'

const Home = (props) => {
  const history = useHistory()

  const [posts, setPosts] = useState([])

  useEffect(() => {
    let isMounted = true
    // this function gets all the posts from the main user and all the users that he/she is following

    if (isMounted) getMyPosts()

    return () => {
      isMounted = false
    }
    // eslint-disable-next-line
  }, [props.user._id])

  // Validate that no one can get inside the app without login or registering
  useEffect(() => {
    if (!props.user?._id) history.push('/')
    // eslint-disable-next-line
  }, [])

  const getMyPosts = async () => {
    if (props.user?._id) {
      try {
        const result = await axios.get(
          PORT + POST + USER + '/' + props.user._id
        )
        if (result.data) {
          setPosts(result.data)
        }
      } catch (err) {}
    }
  }

  const deletePost = async (id) => {
    try {
      const result = await axios.delete(PORT + POST + '/' + id)
      if (result.data) {
        getMyPosts()
      }
    } catch (err) {}
  }

  const likePost = async (id) => {
    const body = {
      like: props.user._id,
    }

    try {
      const result = await axios.put(PORT + POST + '/like/' + id, body)
      if (result.data) {
        getMyPosts()
      }
    } catch (err) {}
  }

  return (
    <div className="homeComponent">
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="spacer"></div>
      <ControlPanel />
      <div className="spacer"></div>
      <div className="homeContainer">
        <div className="homeDivisionPost">
          {posts?.length > 0 ? (
            <>
              {posts?.map((post) => {
                return (
                  <Post
                    post={post}
                    key={post._id}
                    onClick={() => deletePost(post._id)}
                    likePost={() => likePost(post._id)}
                  />
                )
              })}
            </>
          ) : (
            <>
              <div className="noPosts">
                <h2>
                  There is no post just yet. <br />
                  Start posting something!
                </h2>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    hobby: state.hobbyReducer.hobby,
  }
}

export default connect(mapStateToProps)(Home)
