import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { customer, port, POST } from '../../tools/apiPaths'
import ControlPanel from '../ControlPanel/ControlPanel'
import Footer from '../Footer/Footer'
import Post from '../Post/Post'

const Home = (props) => {


    const [posts, setPosts] = useState([])
    

    console.log(posts)

    
    useEffect(()=>{

        // this function gets all the posts from the main user and all the users that he/she is following
        const getMyPosts = async () => {
    
            try{
                let result = await axios.get(port+POST+customer+'/'+props.user._id)
                if(result.data){
                    setPosts(result.data)
                }
            }catch(err){
    
            }
        }
    
        getMyPosts()

    },[props.user._id])

   
    
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
                    {
                        posts ?
                        <>
                            {
                                posts.map(post => {
                                    return <Post 
                                                post={post}
                                                key={post._id}
                                            />
                                })
                            }
                        </>
                        :
                        <>
                        <div>no hay posts</div>
                        </>
                    }
                </div>
            </div>
            
            <Footer/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userReducer.user,
        hobby : state.hobbyReducer.hobby
    }
}


export default connect(mapStateToProps)(Home); 
