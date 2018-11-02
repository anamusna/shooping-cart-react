import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Start from './pages/Start';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Start} />
			<Route exact path="/signup" component={SignUp} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
);

export default Router;
