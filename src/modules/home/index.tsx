import { Button, Tabs } from 'antd';
import * as React from 'react';
import './home.css';

import GatesFromList from '../gate';
import logo from './logo.svg';
const { TabPane } = Tabs;

const homeComponent: React.SFC = () => (
	<>
	<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to River Valley High School parking gate management app</h1>
				</header>
				<p className="App-intro">
					# Presentation
					# Readme
				</p>
			</div>
	<Tabs defaultActiveKey="1" type="card">
		<TabPane tab="Controllers/Gates" key="1">
			<GatesFromList />
		</TabPane>
		<TabPane tab="Show Events" key="2">
			IN PROGRESS
		</TabPane>
	</Tabs>
	</>
);
export default homeComponent;
