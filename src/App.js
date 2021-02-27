import "./App.css";

import Header from "./components/Header/Header.js";
import NoMatch from "./components/NoMatch";
import CharacterList from "./components/CharacterList.js";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/character" />
          </Route>
          <Route path="/character" component={CharacterList} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
