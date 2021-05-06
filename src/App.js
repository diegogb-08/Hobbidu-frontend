import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChangeEmail from "./components/ChangeEmail/ChangeEmail";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import EditAccount from "./components/EditAccount/EditAccount";
import Event from "./components/Event/Event";
import EventView from "./components/EventView/EventView";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import User from "./components/User/User";
import CheckUser from './components/User/UserCheck'

function App(props) {

  let userPath = props.user?.user_name;

  return (
    <div className="App">
      <BrowserRouter>

      <Header/>
      <Switch>

        <Route path="/" exact component={Landing} />
        <Route path="/home" exact component={Home}/>
        <Route path={`/${userPath}`} exact component={User} />
        <Route path="/account/edit" exact component={EditAccount}/>
        <Route path="/change_password" exact component={ChangePassword}/>
        <Route path="/change_email" exact component={ChangeEmail}/>
        <Route path="/events" exact component={EventView} />
        <Route path={`/event/${props.event?._id}`} exact component={Event} />
        <Route path={`/${props.checkUser?.user_name}`} exact component={CheckUser} />
        
      </Switch>
      
      </BrowserRouter>
      
    </div>
  );
}

const mapStateToProps = state => {
  return {
      user : state.userReducer.user,
      event: state.eventReducer.event,
      checkUser: state.userReducer.checkUser
  }
}

export default connect(mapStateToProps)(App);
