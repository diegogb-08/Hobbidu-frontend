import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import ChangeProfilePic from "../ChangeProfilePic/ChangeProfilePic";
import EditInfo from "../EditInfo/EditInfo";
import FirstHobbies from "../FirstHobbies/FirstHobbies";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";
import Tab from "../Tab/Tab";

const EditAccount = (props) => {
  let history = useHistory();

  //Hooks

  const [tab, setTab] = useState({
    selected: "Edit Profile",
  });

  // FUNCTIONS
  const setSelected = (tab) => {
    setTab({ selected: tab });
  };

  useEffect(() => {
    setSelected("Edit profile");
  }, []);

  // Validate that no one can get inside the app without login or registering
  useEffect(() => {
    if (!props.user?._id) history.push("/");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="editAccountComponent">
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="spacer"></div>
      <div className="editAccountContainer">
        <div className="sideBarLeft">
          <SideBar
            className="sideBarLeft"
            tabs={["Edit profile", "Change picture", "Change hobbies"]}
            selected={tab.selected}
            setSelected={setSelected}
          />
        </div>
        <div className="tabRight">
          <Tab isSelected={tab.selected === "Edit profile"}>
            <EditInfo />
          </Tab>
          <Tab isSelected={tab.selected === "Change picture"}>
            <ChangeProfilePic />
          </Tab>
          <Tab isSelected={tab.selected === "Change hobbies"}>
            <FirstHobbies />
          </Tab>
        </div>
      </div>
      <div className="spacer"></div>
      <div className="spacer"></div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    token: state.userReducer.token,
  };
};

export default connect(mapStateToProps)(EditAccount);
