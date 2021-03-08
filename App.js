import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import login from "./Pages/Login/Login";
import register from "./Pages/Register/Register";

import DisplayBook from './Components/Books/DisplayBook';
import Appbar from './Components/Dashbord/Appbar/Appbar';
import Cart from './Components/Books/Cart';
import CartAdded from './Components/Books/Cart/CartAdded';
import DisplayWishList from './Components/Dashbord/DisplayWishList';
import Thank from './Components/Dashbord/Thank/Thank';
import dashboard from './Components/Dashbord/Dashboard';
import PrivateRout from './authguard/PrivateRout';
import Page from './Components/Dashbord/Pagination/Page';

const App = () => {
    return(
    <div>
      <Router>
      <Switch>
            <Route path="/" exact component={login} />
            <Route path="/login" exact component={login} />
            <Route path="/register" exact component={register} />
            <Route path="/displayBooks" exact component={DisplayBook} />
            <Route path="/appbar" exact component={Appbar} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/cartAdded" exact component={CartAdded} />
            <Route path="/list" exact component={DisplayWishList} />
            <Route path="/thankyou" exact component={Thank} />
            <PrivateRout path="/dashboard" component={dashboard} />
            <Route path="/page" exact component={Page} />

        </Switch>
      </Router>
    </div>   
    );
}
export default App;
