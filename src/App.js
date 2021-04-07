import { BrowserRouter, Route, Switch } from "react-router-dom";
import Credentials from "./components/Credentials/Credentials";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      <Switch>

        <Route path="/" exact component={Credentials} />
        <Route path="/Home" exact component={Home}/>

      </Switch>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
