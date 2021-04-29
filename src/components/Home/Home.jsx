import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { customer, follow, port, POST } from '../../tools/apiPaths'
import ControlPanel from '../ControlPanel/ControlPanel'
import Footer from '../Footer/Footer'

const Home = (props) => {


    const [posts, setPosts] = useState([])
    //const [following, setFollowing] = useState([])

    console.log(posts)

    useEffect(()=>{
        getFollowers()
        getMyPosts()
    },[])

    const getFollowers = async () => {

        try{
            
            let result = await axios.get(port+follow+customer+'/'+props.user._id)
            if (result.data){
                result.data.following.map(element => {
                    getFollowingPosts(element.user_id)
    
                })
            }
        }catch(err){
            if(err)
                return err;
        }
    }

    const getMyPosts = async () => {

        try{
            let result = await axios.get(port+POST+customer+'/'+props.user._id)
            if(result.data){
            //setPosts({...posts, posts: [result.data]})
            }
        }catch(err){

        }
    }

    const getFollowingPosts = async (id) => {

        try{

            let result = await axios.get(port+POST+customer+'/'+id)
            if (result.data.length > 0){
                //setPosts([...posts, result.data])
            }

        }catch(err){
            if(err)
                return err;
        }
        
    }
    
    return (
        <div className="homeComponent">
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <ControlPanel />
            <h1>Hola esto es home</h1>
            <p>Hola esto es Home</p>
            This is Home view.
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
