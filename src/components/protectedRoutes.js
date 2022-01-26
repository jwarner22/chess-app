import React from 'react';
import ReportsView from './ReportsView';
import Dashboard from "./PostLogin/Views/PatternRecognition/PatternRecognition"
import Module from './PostLogin/Module.js';
import PostPuzzleMockup from './PostModule/PostModule';
import DailyPuzzle from "./PostLogin/Views/DailyPuzzle/DailyPuzzle"
import PrePuzzlePage from "./PrePuzzle/PrePuzzle"
import Openings from "./PostLogin/Views/Openings/OpeningsDashboard"
import ProfilePage from "./PostLogin/Views/ProfilePage/ProfilePage"
import IntakeSurvey from './IntakeSurvey/IntakeSurvey';
import CreateUser from './IntakeSurvey/CreateUser';
import Opening from './Puzzle/Opening/OpeningManager';
import BrandPage from './BrandPage/BrandPage';
import LeaderboardsPage from './PostLogin/Views/Leaderboards/Leaderboards';
import UserName from './PostLogin/Announcements/UserName';
import CompletedTraining from './PostLogin/Views/DailyPuzzle/completedTraining';
import Settings from './PostLogin/Views/Settings/Settings';
import Home from './PostLogin/Views/Home';

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
	},{
		name: "BrandPage",
		path: '/brandPage',
		exact: true,
		main: props => <BrandPage />
	},{
		name: "Leaderboards",
		path: "/leaderboards",
		exact: true,
		main: props => <LeaderboardsPage />
	},{
		name: "SetUserName",
		path: "/username",
		exact: true,
		main: () => <UserName />
	},
	{
		name: "CompletedDailyTraining",
		path: "/completed-training",
		exact: true,
		main: props => <CompletedTraining props={props} />
	},	{
		name: "Settings",
		path: "/settings",
		exact: true,
		main: props => <Settings />
	}, {
		name: "Home",
		path: "/home",
		exact: false,
		main: props => <Home />
	}
];

export default protectedRoutes;