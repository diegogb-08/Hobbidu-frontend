import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChangeEmail from "./pages/ChangeEmail/ChangeEmail";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import EditAccount from "./pages/EditAccount/EditAccount";
import Event from "./pages/Event/Event";
import EventView from "./pages/EventView/EventView";

import Header from "./pages/Header/Header";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import User from "./pages/User/User";
import CheckUser from "./pages/User/UserCheck";

function App(props) {
  const userPath = props.user?.user_name;

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/home" exact component={Home} />
          <Route path={`/${userPath}`} exact component={User} />
          <Route path="/account/edit" exact component={EditAccount} />
          <Route path="/change_password" exact component={ChangePassword} />
          <Route path="/change_email" exact component={ChangeEmail} />
          <Route path="/events" exact component={EventView} />
          <Route path={`/event/${props.event?._id}`} exact component={Event} />
          <Route
            path={`/${props.checkUser?.user_name}`}
            exact
            component={CheckUser}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    event: state.eventReducer.event,
    checkUser: state.userReducer.checkUser,
  };
};

export default connect(mapStateToProps)(App);
