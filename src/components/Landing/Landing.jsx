import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import FirstHobbies from '../FirstHobbies/FirstHobbies'
import Login from '../Login/Login'
import Register from '../Register/Register'

const Landing = (props) => {

    const [active, setActive] = useState(true)
    const [hobbies, setHobbies] = useState(false)
    
    const register = () => {
        setTimeout(()=>{
            setActive(!active)
        },500)
    }


    useEffect(()=>{
        if(props.user?.hobbies[0] === undefined) {
            setTimeout(()=>{
                setHobbies(!hobbies) 
            },500)
        }
        // eslint-disable-next-line
    },[active])

    return (
        <div className="landingsComponent">
            <div className="landingContainers landingLeft">
                <div className="slogan top">
                    <p>FIND YOUR HOBBY</p>
                </div>
                <div className="slogan bottom">
                    <p>CONNECT WITH PEOPLE</p>
                </div>
            </div>
            <div className="landingContainers landingRight">
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                {
                    active ? 
                    <>
                        {
                            hobbies ?
                            <>
                                <FirstHobbies/>
                            </>
                            :
                            <>
                                <Login/> 
                                <div className="registerLanding">
                                    <p>Don't have an account?</p>
                                    <p className="register" onClick={register}>Register</p>
                                </div>
                            </>
                            
                        }
                    </>
                    : 
                    <>
                        {
                            !hobbies ?
                            <>
                                <FirstHobbies/>
                            </>
                            :
                            <>
                                <Register/>
                                <div className="registerLanding">
                                    <p>Do you have an account?</p>
                                    <p className="register" onClick={register}>Sign In</p>
                                </div>
                            </>
                        }
                    </>
                }
                
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userReducer.user
    }
}

export default connect(mapStateToProps)(Landing);
