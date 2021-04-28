import React from 'react'
import ControlPanel from '../ControlPanel/ControlPanel'
import Footer from '../Footer/Footer'

const Home = () => {




    
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

export default Home
