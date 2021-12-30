import React, {useContext, useEffect} from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { bool, any, object } from 'prop-types';
import {AuthContext} from './Auth.js';
import {getAnalytics, logEvent} from "firebase/analytics";

//This component checks to see if the user is logged in or not. 
const ProtectedRouteHoc = ({ component: Component, ...rest }) => {
	//If the user is authenticated, let them pass. If not, redirect them. 
	const analytics = getAnalytics();
	const {currentUser} = useContext(AuthContext)
	const {path} = rest;

	if (currentUser || rest.public) {
		logEvent(analytics, 'screen_view', {'firebase_screen': path.substring(1)});
		return (
			<Route
				{...rest}
				render={props => {
					return <Component {...props}></Component>;
				}}
			/>
		);
	}
//this is causing the redirect problem when refreshing. 
//Something firebase.auth().setPersistence promises?
//It only happens in a protected route, not on login or sign in pages. 
	return <Redirect to={{ pathname: '/' }} />;
};

ProtectedRouteHoc.propTypes = {
	component: any,
	currentUser: bool,
	rest: object,
	props: object,
};

export default withRouter(ProtectedRouteHoc);