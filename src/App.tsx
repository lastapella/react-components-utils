// import { Button } from 'antd';
import * as React from 'react';
// import withLayout from './HOC/withLayout';
// import './App.css';
import Routes from './routes';
import withFirebaseUser from './shared/HOC/firebase/withFirebaseUser';

// import logo from './logo.svg';

class App extends React.Component {
	public render() {
		return <Routes />;
	}
}

export default withFirebaseUser(App);
