import React from 'react';
import ReportsView from './ReportsView';
import Dashboard from "./PostLogin/Dashboard"

const protectedRoutes = [
	{
        name: 'dashboard',
		exact: true,
		path: '/dashboard',
		main: props => <Dashboard {...props} />,
		public: false,
	},
];

export default protectedRoutes;