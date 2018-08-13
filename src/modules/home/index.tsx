import { Button, Tabs, Card, Row } from 'antd';
import * as React from 'react';
import './home.css';

import GatesFromList from '../hardware_management/gate';
import logo from './River_Valley_High_School_crest.svg';
const { TabPane } = Tabs;

const homeComponent: React.SFC = () => (
	<>
		<Row>
			<div className="App">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">
						Welcome to River Valley High School parking gate management app
					</h1>
					<p className="App-intro"># Presentation # Readme</p>
			</div>
		</Row>
		<Row>
			<Card>
				<Tabs defaultActiveKey="1" type="card">
					<TabPane tab="Controllers/Gates" key="1">
						<GatesFromList />
					</TabPane>
					<TabPane tab="Show Events" key="2">
						IN PROGRESS
					</TabPane>
				</Tabs>
			</Card>
		</Row>
	</>
);
export default homeComponent;
