import React from 'react';
import ReportsView from './ReportsView';
import Dashboard from "./PostLogin/Views/PatternRecognition/PatternRecognition"
import Module from './PostLogin/Module.js';
import PostPuzzleMockup from './PostModule/PostModule';
import DailyPuzzle from "./PostLogin/Views/DailyPuzzle/DailyPuzzle"
import PrePuzzlePage from "./PrePuzzle/PrePuzzle"
import Openings from "./PostLogin/Views/Openings/Openings"
import ProfilePage from "./PostLogin/Views/ProfilePage/ProfilePage"
import IntakeSurvey from './IntakeSurvey/IntakeSurvey';
import CreateUser from './IntakeSurvey/CreateUser';
import Opening from './Puzzle/Opening/OpeningManager';

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
	},
	{
		name: "Opening Module",
		path: "/opening",
		exact: true,
		main: props => <Opening {...props} />
	}
];

export default protectedRoutes;