import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from './store';
import { subscribeAuth } from './store/actions';

import Routes from './routes';
import { compose } from 'recompose';
import { withStore } from './store';
import Loader from './shared/ui/defaultLoader';

// import logo from './logo.svg';

class App extends React.Component<AppProps> {
	private unSubscribe: firebase.Unsubscribe;

	public componentDidMount() {
		this.props
			.subscribeAuth()
			.then(unSubscribe => (this.unSubscribe = unSubscribe));
	}
	public componentWillUnmount() {
		if (typeof this.unSubscribe === 'function') {
			this.unSubscribe();
		}
	}
	public render() {
		const { loadingUser } = this.props;
		return <> {loadingUser ? <Loader /> : <Routes />} </>;
	}
}

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;
interface OwnProps {
	[key: string]: any;
}

type AppProps = PropsFromDispatch & PropsFromState;

const mapStateToProps = (state: RootState, props: any) => {
	return {
		loadingUser: state.user.loading
	};
};
const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, void, Action>
) => {
	return {
		subscribeAuth: () => dispatch(subscribeAuth())
	};
};

const AppContainer = connect<PropsFromState, PropsFromDispatch, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default compose(withStore)(AppContainer);
