import React from 'react';
import ReportsView from './ReportsView';
import Dashboard from "./PostLogin/Dashboard"
import Module from './PostLogin/Module.js';
import PostPuzzleMockup from '../PostPuzzleMockup/PostPuzzleMockup';
import DailyPuzzle from "./DailyPuzzle/DailyPuzzle"
import PrePuzzlePage from "./PrePuzzle/PrePuzzle"

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
	},
	{
		name: "DailyPuzzle", 
		path: "/dailyPuzzle", 
		exact: true, 
		main: () => <DailyPuzzle />
	},
	{
		name: "PostPuzzlePage",
		path: "/PuzzleComplete",
		exact: true,
		main: () => <PostPuzzleMockup />
	}, {
		name: "PrePuzzlePage",
		path: "/PuzzleInfo",
		exact: true,
		main: () => <PrePuzzlePage />
	}
];

export default protectedRoutes;