import React, { useEffect, useState } from 'react'
import EditInfo from '../EditInfo/EditInfo';
import FirstHobbies from '../FirstHobbies/FirstHobbies';
import Footer from '../Footer/Footer';
import SideBar from '../SideBar/SideBar';
import Tab from '../Tab/Tab';

const EditAccount = (props) => {

    //Hooks

    const [tab, setTab] = useState({
        selected: 'Edit Profile',
    })

    // FUNCTIONS
    const setSelected = (tab) => {
        setTab({selected: tab});
    }

    useEffect(()=>{
        setSelected('Edit profile')
    },[])

    return (
        <div className="editAccountComponent">
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="editAccountContainer">
                <div className="sideBarLeft">
                    <SideBar className="sideBarLeft" tabs={['Edit profile', 'Change picture', 'Change hobbies']} selected={tab.selected} setSelected={setSelected}/>
                </div>
                <div className="tabRight">
                    <Tab isSelected={tab.selected === 'Edit profile'}>
                        <EditInfo/>
                    </Tab>
                    <Tab isSelected={tab.selected === 'Change picture'}>
                        Esto change picture
                    </Tab>
                    <Tab isSelected={tab.selected === 'Change hobbies'}>
                        <FirstHobbies/>
                    </Tab>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default EditAccount
