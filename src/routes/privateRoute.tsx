import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  isAuthenticated : boolean;
}

export default ({
  component: Component,
  isAuthenticated,
	...rest
}: RouteProps & PrivateRouteProps) => {
	return (
		<Route
			{...rest}
			// tslint:disable-next-line:jsx-no-lambda
			render={props =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location }
						}}
					/>
				)
			}
		/>
	);
};
