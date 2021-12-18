import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Store from './stores';
import { Provider } from 'mobx-react';
import jwtDecode from 'jwt-decode';
import ajaxService from './services/auth/ajax.service';
const rootStore = new Store()
if(localStorage.jwtToken) {
  try {
    const decoded:any = jwtDecode(localStorage.jwtToken)

    const currentTime = Date.now()/1000;
    if(decoded.exp < currentTime) {
      localStorage.removeItem("jwtToken")
      window.location.href = "/";
    }
    ajaxService.setAuthToken(localStorage.jwtToken)
    rootStore.UserStore.setUser(decoded);
  }
  catch (e) {
    localStorage.removeItem("jwtToken")
    window.location.href = "/";
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider
    Store = {rootStore}
    >
    <App Store={rootStore} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
