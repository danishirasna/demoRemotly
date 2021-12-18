import React from "react";
import { Route, Redirect,RouteProps } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Store from "../stores";

interface MyComponentProps extends RouteProps {
    component:any
    path:string
    authenticated:boolean
   }


    class PrivateRoute extends React.Component<MyComponentProps> {
        render() {
            const {component:Component, authenticated, ...rest} = this.props;
            return (
                <Route {...rest} render ={props => 
                    this.props.authenticated === true ? (
                        <this.props.component {...props}/>
                    ):
                    <Redirect to="/"/>
                } />
            )
        }
    }

export default PrivateRoute;
