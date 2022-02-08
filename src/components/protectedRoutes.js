import React from 'react';
import Module from './PostLogin/Module.js';
import PostPuzzleMockup from './PostModule/PostModule';
import PrePuzzlePage from "./PrePuzzle/PrePuzzle"
import IntakeSurvey from './IntakeSurvey/IntakeSurvey';
import CreateUser from './IntakeSurvey/CreateUser';
import Opening from './Puzzle/Opening/OpeningManager';
import BrandPage from './BrandPage/BrandPage';
import UserName from './PostLogin/Announcements/UserName';
import CompletedTraining from './PostLogin/Views/DailyPuzzle/completedTraining';
import Settings from './PostLogin/Views/Settings/Settings';
import Home from './PostLogin/Views/Home';
import BoardDevTest from './Puzzle/PuzzleManager';
import FeatureSuggestion from './PostLogin/Views/FeatureSuggestion/FeatureSuggestion.js';

const protectedRoutes = [
	{
		name: 'module',
		exact: true,
		path: '/dashboard/module',
		main: props => <Module {...props} />,
		public: false
	},{
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
	}, {
		name: "BoardDevTest",
		path: "/board-dev-test",
		exact: true,
		main: () => <BoardDevTest />
	}, {
		name: "FeatureSuggestion",
		path: "/feature_suggestion",
		exact: true,
		main: () => <FeatureSuggestion />
	}
];

export default protectedRoutes;