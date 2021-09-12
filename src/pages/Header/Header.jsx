import React from "react"
import { connect } from "react-redux"
import logo from "../../img/website_logo_transparent_background.png"
import NavBar from "../../components/NavBar/NavBar"

const Header = (props) => {
  return (
    <div className="headerComponent">
      <img loading="lazy" className="logo" src={logo} alt={logo} />
      {props?.active && (
        <div className="navbar">
          <NavBar />
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    active: state.userReducer.active,
  }
}

export default connect(mapStateToProps)(Header)
