import React from 'react'
import Login from '../Login/Login'


const Landing = () => {
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
                <Login/>
            </div>
        </div>
    )
}

export default Landing
