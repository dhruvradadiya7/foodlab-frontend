import Landing from "./Components/Landing";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Components
import { Login } from "./Components/Authentication/Login";
import { Register } from "./Components/Authentication/Register";
import Cart from './Components/Cart';
import Favorites from './Components/Favs';
import Recipes from './Components/Recipes';
import ContactUs from "./Components/ContactUs";
import Profile from "./Components/Profile";

// ADMIN COMPONENTS
import { ManageRecipes } from "./Components/Admin/Recipes";
import { ManageUsers } from "./Components/Admin/Users";

import "./App.css";
import { isAdmin } from "./Components/shared/utils";

const Admin = ({ match }) => {
  if (!isAdmin()) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Route exact path={`${match.path}/recipes`} component={ManageRecipes} />
      <Route exact path={`${match.path}/users`} component={ManageUsers} />
    </>
  );
};

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/contact-us" component={ContactUs} />
        <Route exact path="/recipes" component={Recipes} />
        <Route exact path="/my-cart" component={Cart} />
        <Route exact path="/my-favorites" component={Favorites} />
        <Route exact path="/my-profile" component={Profile} />
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Landing} />
      </Switch>
    </Router>
  );
}

export default App;
