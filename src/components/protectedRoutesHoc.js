import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { bool, any, object } from 'prop-types';


//This component checks to see if the user is logged in or not. 
const ProtectedRouteHoc = ({ component: Component, isLoggedIn, ...rest }) => {
	//If the user is authenticated, let them pass. If not, redirect them. 
	if (isLoggedIn || rest.public) {
		console.log('reports')
		console.log({isLoggedIn: isLoggedIn})
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
	isLoggedIn: bool,
	rest: object,
	props: object,
};

export default withRouter(ProtectedRouteHoc);