import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      <Header/>
      <Switch>

        <Route path="/" exact component={Landing} />
        <Route path="/Home" exact component={Home}/>

      </Switch>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
