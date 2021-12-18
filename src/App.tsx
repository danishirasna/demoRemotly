import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Store from './stores';
import { UserStore } from './stores/user.store';
import PrivateRoute from './helpers/PrivateRoute';
import { inject, observer } from 'mobx-react';
const Login = React.lazy(() => import("./components/auth/Login"))


interface IApp {
  Store: Store
}

const App = inject("Store")(observer(
  class App extends React.Component<IApp>{
    render() {
      return (
        <Router>

          <Suspense fallback={<div> Loading .... </div>}>
            <Switch>

              <div className="App">
                <Route exact path="/" component={Login} />

              </div>

            </Switch>
          </Suspense>
        </Router>
      );
    }

  }


))

export default App;
