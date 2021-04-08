import React from 'react'
import logo from '../../img/website_logo_transparent_background.png'

const Header = (props) => {

    
    return (
        <div className="headerComponent">
            <img className="logo" src={logo} alt={logo}/>
        </div>
    )
}

export default Header
