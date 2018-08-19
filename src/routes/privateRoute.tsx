import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { message } from 'antd';

interface PrivateRouteProps  {
	component: React.ComponentType<any>;
	messageText: string;
	redirectPath?: string;
	isAuthorized: boolean;
}

export default ({
	component: Component,
	isAuthorized,
	messageText,
	redirectPath,
	...rest
}: RouteProps & PrivateRouteProps) => {
	const displayMessage = (onMessageClose: () => JSX.Element) =>
	{
		message.error(messageText);
		return onMessageClose();

	}
	return (
		<Route
			{...rest}
			// tslint:disable-next-line:jsx-no-lambda
			render={props =>
				isAuthorized ? (
					<Component {...props} />
				) : (
					displayMessage(() => (
						<Redirect
							to={{
								pathname: redirectPath ? redirectPath : '/login',
								state: { from: props.location }
							}}
						/>
					))
				)
			}
		/>
	);
};
