import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { connect } from "react-redux"
import { port } from "../../helper/apiPaths"

const Avatar = (props) => {
  return (
    <div className="avatarComponent" onClick={props.onClick}>
      {props.src !== port + undefined ? (
        <>
          <div className="imageCropper">
            <img
              loading="lazy"
              className="profileImg"
              src={props.src}
              alt="Avatar"
            />
          </div>
        </>
      ) : (
        <>
          <div className="profilePic">
            <FontAwesomeIcon icon={faUserCircle} className="iconBtn" />
          </div>
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  }
}

export default connect(mapStateToProps)(Avatar)
