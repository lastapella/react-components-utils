import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeComponent from '../modules/home';
import withLayout from '../HOC/withLayout';
import LoginComponent from '../modules/login';

// import { RegisterConnector } from "../modules/register/RegisterConnector";
// import { LoginConnector } from "../modules/login/LoginConnector";

const Autre = () => (
	<div>
		<h2>Autre</h2>
	</div>
);

const About = () => (
	<div>
		<h2>About</h2>
	</div>
);

const Topic = () => (
	<div>
		<h3>Topic</h3>
	</div>
);
const SwitchRoutes = () => (
	<Switch>
		<Route exact={true} path="/" component={HomeComponent} />
		<Route exact={true} path="/about" component={About} />
		<Route exact={true} path="/topic" component={Topic} />
		<Route exact={true} path="/autre" component={Autre} />
		<Route exact={true} path="/login" component={LoginComponent} />
	</Switch>
);
const SwitchRoutesWithLayout = withLayout(SwitchRoutes);

export const Routes = () => (
	<BrowserRouter>
		<SwitchRoutesWithLayout />
	</BrowserRouter>
);
