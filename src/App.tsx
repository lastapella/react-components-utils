// import { Button } from 'antd';
import * as React from 'react';
// import withLayout from './HOC/withLayout';
// import './App.css';
import Routes from './routes';
import withFirebaseUserContext from './firebase/withFirebaseUserContext';

// import logo from './logo.svg';

class App extends React.Component {
	public render() {
		return <Routes />;
	}
}

export default withFirebaseUserContext(App);
