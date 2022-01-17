import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { render } from "react-dom";
import { GoldenLayoutComponent } from "./components/GoldenLayout/goldenLayoutComponent";
// import { MyGoldenPanel } from "./myGoldenPanel";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/table/lib/css/table.css";

const Demo = React.lazy(() => import("./components/index"))



class App extends React.Component {
  render() {
    return (
      < Router >
        <Suspense fallback={<div> Loading .... </div>}>
          <Switch>
            <div className="App">
              <Demo />
            </div>
          </Switch>
        </Suspense>
      </Router >
    );
  }

}



export default App;
