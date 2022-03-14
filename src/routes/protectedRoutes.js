import React from 'react';
import IntakeSurvey from '../components/IntakeSurvey/IntakeSurvey';
import CreateUser from '../components/IntakeSurvey/CreateUser';
import BrandPage from '../components/BrandPage/BrandPage';
import UserName from '../components/PostLogin/Announcements/UserName';
import CompletedTraining from '../components/PostLogin/Views/DailyPuzzle/completedTraining';
import Settings from '../components/PostLogin/Views/Settings/Settings';
import FeatureSuggestion from '../components/PostLogin/Views/FeatureSuggestion/FeatureSuggestion.js';
import OpeningsDashboardTest from '../components/PostLogin/Views/Openings/OpeningsDashboardTest.js'; 
import Module from "../components/Module/Module";
import TestModule from '../testing/TestModule';

const PrePuzzlePage = React.lazy(() => import('../components/PrePuzzle/PrePuzzle'));
const Opening = React.lazy(() => import('../components/Module/Opening/OpeningManager'));
const Home = React.lazy(() => import('../components/PostLogin/Views/Home'));


const protectedRoutes = [
	{
		name: 'module',
		exact: true,
		path: '/dashboard/module',
		main: props => <Module {...props} />,
		public: false
	}
	//,{
	// 	name: "PostPuzzlePage",
	// 	path: "/PuzzleComplete",
	// 	exact: true,
	// 	main: () => <PostPuzzleMockup />
	// }
	, {
		name: "PrePuzzlePage",
		path: "/PuzzleInfo",
		exact: true,
		main: () => <PrePuzzlePage />
	},{
		name: "IntakeSurvey",
		path: "/survey",
		exact: true,
		main: props => <IntakeSurvey {...props} />
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
	},{
		name: "FeatureSuggestion",
		path: "/feature_suggestion",
		exact: true,
		main: () => <FeatureSuggestion />
	},{
		name: "OpeningsDashboardTest",
		path: "/openings-dashboard-test/:moves",
		exact: false,
		main: () => <OpeningsDashboardTest />
	},
	{
		name: "ModuleTest",
		path: "/module-test",
		exact: true,
		main: () => <TestModule />
	}
	// {
	// 	name: "PreOpeningTest",
	// 	path: "/pre-opening-test/:moves",
	// 	exact: false,
	// 	main: (props) => <PreOpeningTest {...props} />
	// }
];

export default protectedRoutes;