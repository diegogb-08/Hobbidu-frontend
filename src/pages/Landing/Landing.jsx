import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import FirstHobbies from '../../components/FirstHobbies/FirstHobbies'
import Login from '../../components/Login/Login'
import Register from '../../components/Register/Register'

const Landing = ({ user, showHobbies }) => {
  const history = useHistory()

  const [isActive, setisActive] = useState(true)

  if (user?.hobbies?.length > 0) {
    history.push('/home')
  }

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
        {showHobbies ? (
          <>
            <FirstHobbies />
          </>
        ) : (
          <>
            {isActive ? (
              <>
                <Login />
                <div className="registerLanding">
                  <p>Don&apos;t have an account?</p>
                  <p
                    className="register"
                    onClick={() => setisActive(!isActive)}
                  >
                    Register
                  </p>
                </div>
              </>
            ) : (
              <>
                <Register />
                <div className="registerLanding">
                  <p>Do you have an account?</p>
                  <p
                    className="register"
                    onClick={() => setisActive(!isActive)}
                  >
                    Sign In
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    showHobbies: state.hobbyReducer.showHobbies,
  }
}

export default connect(mapStateToProps)(Landing)
