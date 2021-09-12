import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "../Button/Button";
import InputForm from "../InputForm/InputForm";
import validate from "../../helper/validate";
import GeoLocation from "../GeoLocation/GeoLocation";
import axios from "axios";
import { customer, port } from "../../tools/apiPaths";
import { UPDATE } from "../../redux/types/userType";

const EditInfo = (props) => {
  // Style variable error

  const styles = {
    error: {
      borderColor: "#c92432",
      color: "#c92432",
      background: "#fffafa",
    },
    correct: {},
  };

  // AUTHORIZATION

  const token = props.token;
  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // HOOKS
  const [user, setUser] = useState({
    name: props.user?.name ? props.user?.name : "",
    user_name: props.user?.user_name ? props.user?.user_name : "",
    birth_date: props.user?.birth_date ? props.user?.birth_date : "",
    phone_number: props.user?.phone_number ? props.user?.phone_number : "",
    location: props.user?.location ? props.user?.location : "",
    bio: props.user?.bio ? props.user?.bio : "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState([]);

  const handleState = (e) => {
    setUser({
      ...user,
      [e.target.name]:
        e.target.type === "number" ? +e.target.value : e.target.value,
    });
    setMessage("");
    if (Object.keys(errors).length > 0) {
      setErrors(
        validate(
          {
            ...user,
            [e.target.name]: e.target.value,
            [e.target.name]: e.target.value,
          },
          "register"
        )
      );
    }
  };

  const toggle = async () => {
    const errs = validate(user, "register");
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    const body = {
      name: user.name,
      user_name: user.user_name,
      birth_date: user.birth_date,
      phone_number: user.phone_number,
      location: props.location,
      bio: user.bio,
    };

    try {
      const result = await axios.put(
        port + customer + "/" + props.user._id,
        body,
        auth
      );
      if (result) {
        setMessage("Your profile was succesfully updated!");
        props.dispatch({ type: UPDATE, payload: result.data });
      } else {
        setMessage("There was a problem updating your details");
      }
    } catch (err) {}
  };

  // it detects the changes from the input and on key press Enter, sends the info to multiSearch()
  useEffect(() => {
    const listener = (event) => {
      if (
        event.code === "Enter" ||
        event.code === "NumpadEnter" ||
        event.keyCode === 13
      ) {
        toggle();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="editInfoComponent">
      <div className="editInfoContainer">
        <div className="editSections">
          <p className="title">Name</p>
          <div className="inputAndDescription">
            <div className="inputContainer">
              <InputForm
                type="text"
                name="name"
                lenght="16"
                onChange={handleState}
                value={user.name}
                style={errors.name?.status ? styles.error : styles.correct}
              />
            </div>
            <p>
              To help people discover your account, use the name that people
              know you by, like your full name, nickname, or business name.
            </p>
          </div>
        </div>
        <div className="editSections">
          <p className="title">User name</p>
          <div className="inputAndDescription">
            <div className="inputContainer">
              <InputForm
                type="text"
                name="user_name"
                lenght="16"
                onChange={handleState}
                value={user.user_name}
                style={errors.user_name?.status ? styles.error : styles.correct}
              />
            </div>
            <p>
              The user name must contain between 6 to 16 characters and special
              characters like "_" or ".".
            </p>
          </div>
        </div>
        <div className="editSections">
          <p className="title">Birth date</p>
          <div className="inputAndDescription">
            <div className="inputContainer">
              <InputForm
                type="date"
                name="birth_date"
                lenght="16"
                onChange={handleState}
                value={user.birth_date}
              />
            </div>
          </div>
        </div>
        <div className="editSections">
          <p className="title">Phone number</p>
          <div className="inputAndDescription">
            <div className="inputContainer">
              <InputForm
                type="text"
                name="phone_number"
                lenght="16"
                onChange={handleState}
                value={user.phone_number}
                style={
                  errors.phone_number?.status ? styles.error : styles.correct
                }
                error={errors.phone_number?.help}
              />
            </div>
          </div>
        </div>
        <div className="editSections">
          <p className="title">Location</p>
          <div className="inputAndDescription">
            <div className="inputContainer geolocation">
              <GeoLocation />
            </div>
          </div>
        </div>
        <div className="editSections">
          <p className="title">Biography</p>
          <div className="inputAndDescription">
            <div className="inputContainer">
              <textarea
                className="inputText"
                rows="3"
                cols="50"
                name="bio"
                maxLength="100"
                onChange={handleState}
                value={user.bio}
              />
            </div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div>
            <p>
              Provide your personal information, even if the account is used for
              a business. This information will not be included in your public
              profile.{" "}
            </p>
          </div>
        </div>
        <p className="message">{message}</p>
        <div className="buttonEditContainer">
          <div className="buttonEdit">
            <Button onClick={() => toggle()}>
              <p>Save</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    token: state.userReducer.token,
    location: state.userReducer.location,
  };
};

export default connect(mapStateToProps)(EditInfo);
