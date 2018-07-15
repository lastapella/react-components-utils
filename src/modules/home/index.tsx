import { Button } from 'antd';
import * as React from 'react';
import './home.css';

import logo from './logo.svg';

const homeComponent :React.SFC = () => (
	<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h1 className="App-title">Welcome to React</h1>
		</header>{' '}
		<Button type="primary"> Bouton ici </Button>
		<p className="App-intro">
			To get started, edit <code>src/App.tsx</code> and save to reload.
		</p>
	</div>
);
export default homeComponent;
