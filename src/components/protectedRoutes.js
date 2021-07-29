import React from 'react';
import ReportsView from './ReportsView';
import Dashboard from "./PostLogin/Dashboard"
import Module from './PostLogin/Module.js';

const protectedRoutes = [
	{
        name: 'dashboard',
		exact: true,
		path: '/dashboard',
		main: props => <Dashboard {...props} />,
		public: false,
	},
	{
		name: 'module',
		exact: true,
		path: '/dashboard/module',
		main: props => <Module {...props} />,
		public: false
	}
];

export default protectedRoutes;