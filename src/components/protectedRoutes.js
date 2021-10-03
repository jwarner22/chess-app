import React from 'react';
import ReportsView from './ReportsView';
import Dashboard from "./PostLogin/Dashboard"
import Module from './PostLogin/Module.js';
import PostPuzzleMockup from '../PostPuzzleMockup/PostPuzzleMockup';
import DailyPuzzle from "./DailyPuzzle/DailyPuzzle"
import PrePuzzlePage from "./PrePuzzle/PrePuzzle"
import Openings from "./Openings/Openings"
import ProfilePage from "./ProfilePage/ProfilePage"
import Chart from '../PostPuzzleMockup/ScoreChart';
import IntakeSurvey from './IntakeSurvey/IntakeSurvey';
import CreateUser from './IntakeSurvey/CreateUser';

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
	},{
		name: "Openings",
		path: "/openings",
		exact: true,
		main: () => <Openings />
	},{	
	name: "Profile",
	path: "/profile",
	exact: true,
	main: () => <ProfilePage />
	},
	{
		name: "IntakeSurvey",
		path: "/survey",
		exact: true,
		main: () => <IntakeSurvey />
	},
	{
		name: "CreateUser",
		path: "/create-user",
		exact: true,
		main: props => <CreateUser {...props}/>
	}
];

export default protectedRoutes;