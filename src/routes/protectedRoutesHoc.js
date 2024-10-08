import React, {useContext} from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { bool, any, object } from 'prop-types';
import {AuthContext} from '../providers/Auth.js';
// import {UserContext} from '../GlobalState'

//This component checks to see if the user is logged in or not. 
const ProtectedRouteHoc = ({ component: Component, ...rest }) => {
	//If the user is authenticated, let them pass. If not, redirect them. 

	const {currentUser} = useContext(AuthContext)
	// const {contextLoading} = useContext(UserContext)
	// const {path} = rest;

	if (currentUser || rest.public) {
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