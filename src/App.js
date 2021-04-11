import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EditAccount from "./components/EditAccount/EditAccount";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import User from "./components/User/User";

function App(props) {

  let userPath = props.user?.user_name

  return (
    <div className="App">
      <BrowserRouter>

      <Header/>
      <Switch>

        <Route path="/" exact component={Landing} />
        <Route path="/home" exact component={Home}/>
        <Route path={`/${userPath}`} exact component={User} />
        <Route path="/account/edit" exact component={EditAccount}/>

      </Switch>
      
      </BrowserRouter>
      
    </div>
  );
}

const mapStateToProps = state => {
  return {
      user : state.userReducer.user,
  }
}

export default connect(mapStateToProps)(App);
