import React, { useState } from "react";
import Modal from "../Modal/Modal";

import ImageCropper from "../ImageCropper/ImageCropper";
import { connect } from "react-redux";
import GeoLocation from "../GeoLocation/GeoLocation";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { port, POST } from "../../tools/apiPaths";
import { useHistory } from "react-router";

const AddPost = (props) => {
  let history = useHistory();

  const [nextStep, setNextStep] = useState(false);
  const [selected, setSelected] = useState({});
  const [hobby, setHobby] = useState("");
  const [description, setDescription] = useState("");

  // Modal Hook
  const [active, setActive] = useState(false);
  const toggle = () => {
    setActive(!active);
  };

  // Image cropper formData

  const [formData, setformData] = useState({});

  const handleChange = (value) => {
    setformData(value);
    setNextStep(true);
  };

  const handleState = (e) => {
    setDescription(e.target.value);
  };

  // Functions

  const selectHobby = (hobby_id) => {
    setSelected({ [hobby_id]: { backgroundColor: "#f05356", color: "white" } });
    setHobby(hobby_id);
  };

  const goBack = () => {
    setTimeout(() => {
      setNextStep(false);
    }, 500);
  };

  const post = async () => {
    let location = JSON.stringify(props.location);
    await formData.append("user_id", props.user._id);
    await formData.append("hobby_id", hobby);
    await formData.append("location", location);
    await formData.append("description", description);

    try {
      let result = await axios({
        method: "post",
        url: port + POST,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.data) {
        setDescription("");
        setNextStep(false);
        setSelected({});
        setHobby("");
        setActive(!active);
        setTimeout(() => {
          history.push("/");
        }, 500);
      }
    } catch (err) {}
  };

  return (
    <div>
      <div className="configComponent" onClick={() => toggle()}>
        {props.children}
      </div>
      <Modal active={active} toggle={() => toggle()}>
        <div className="addPostContainer">
          <h1>New Post</h1>
          <div className="addPostInfo">
            {!nextStep ? (
              <>
                <h2>Choose a picture from your gallery</h2>
                <ImageCropper onChange={handleChange}>Continue</ImageCropper>
              </>
            ) : (
              <>
                <div className="secondStepContainer">
                  <div className="topContainer">
                    <div className="secondStepDivision">
                      <div className="sections">
                        <p className="titles">Select 1 of your hobbies</p>
                        <div className="hobbies">
                          {props.user.hobbies.map((hobby) => {
                            return (
                              <div
                                className="hobby"
                                style={selected[hobby._id]}
                                key={hobby._id}
                                onClick={() => selectHobby(hobby._id)}
                              >
                                <p>{hobby.hobby_name}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="secondStepDivision">
                      <div className="sections">
                        <p className="titles">Location</p>
                        <div className="geoContainer">
                          <GeoLocation />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bottomContainer">
                    <p className="titles">Write a Caption</p>
                    <textarea
                      name="description"
                      id=""
                      cols="70"
                      rows="10"
                      onChange={handleState}
                    />
                    <div className="bottomArea">
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginRight: "10px" }}
                        onClick={() => goBack()}
                      >
                        Go Back
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => post()}
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    location: state.userReducer.location,
  };
};

export default connect(mapStateToProps)(AddPost);
