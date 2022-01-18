import React from 'react'
import GoldenLayout from "golden-layout";
import { GoldenLayoutComponent } from "./GoldenLayout/goldenLayoutComponent";
import "golden-layout/src/css/goldenlayout-base.css";
import "golden-layout/src/css/goldenlayout-light-theme.css";
import { Demo } from './GoldenLayout/Test';


class GL extends React.Component {
  render() {
    return (
      <div id="gl-container">
        <GoldenLayoutComponent //config from simple react example: https://golden-layout.com/examples/#qZXEyv
          htmlAttrs={{
            style: { height: "100vh", width: "100%", overflow: "auto" }
          }}
          config={{
            content: [{
              type: 'row',
              content: [{
                type: 'react-component',
                title: "1st",
                component: 'counter',
                props: { count: 0 }
              }, {
                type: 'column',
                content: [{
                  type: 'react-component',
                  title: "Second",
                  component: 'counter',
                  props: { count: 0 }
                }, {
                  type: 'react-component',
                  title: "Third",
                  component: 'counter',
                  props: { count: 0 }
                }]
              }]
            }]
          }}
          registerComponents={myLayout => {
            myLayout.registerComponent("counter", Demo)
          }}
        />
      </div>
    )
  }
}

class Index extends React.Component {
  render() {
    return (
      <div>
        {/* <div>
          <h1>Standalone Component</h1>
          <Counts />
        </div> */}
        <div>
          <h1>Demo With Antd & Golden Layout Using Redux Toolkit</h1>
          <GL />
        </div>
      </div>
    )
  }
}
export default Index;