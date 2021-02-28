import "./App.css";
import theme from "./theming/default.theme.js";

import Header from "./components/Header/Header";
import NoMatch from "./components/NoMatch";
import CharacterList from "./components/CharacterList";
import LocationList from "./components/LocationList";
import EpisodeList from "./components/EpisodeList";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/character" />
          </Route>
          <Route path="/character" component={CharacterList} />
          <Route path="/location" component={LocationList} />
          <Route path="/episode" component={EpisodeList} />

          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  </ThemeProvider>
  );
}

export default App;
