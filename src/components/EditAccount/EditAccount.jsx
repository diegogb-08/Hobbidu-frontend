import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer';
import SideBar from '../SideBar/SideBar';
import Tab from '../Tab/Tab';

const EditAccount = (props) => {

    //Hooks

    const [tab, setTab] = useState({
        selected: 'Edit Profile',
    })

    console.log(tab)

    // FUNCTIONS
    const setSelected = (tab) => {
        setTab({selected: tab});
    }

    return (
        <div className="editAccountComponent">
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="editAccountContainer">
                <div className="sideBarLeft">
                    <SideBar className="sideBarLeft" tabs={['Edit profile', 'Change picture']} selected={tab.selected} setSelected={setSelected}/>
                </div>
                <div className="tabRight">
                    <Tab isSelected={tab.selected === 'Edit profile'}>
                        Esto es Edit Profile
                    </Tab>
                    <Tab isSelected={tab.selected === 'Change picture'}>
                        Esto change picture
                    </Tab>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default EditAccount
