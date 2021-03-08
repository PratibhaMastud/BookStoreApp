import React from 'react';
import {Route,Redirect} from 'react-router-dom';

const PrivateRout = ({component: Component, ...rest}) => (
 
    <Route
        {...rest}
        render = { props => (
            localStorage.getItem('token') ? (
                <Component {...props}/>
            ):(
                <Redirect to="/login"/>
            )
        )

        }
    ></Route>
);

export default PrivateRout