import { Layout } from 'antd';
import * as React from 'react';
import getComponentDisplayName from '../utils';
import NavBar from '../../ui/navbar/navBarWithFirebase';
const { Content, Footer } = Layout;
import './withLayout.css';
interface State {
	activeKeys: string[];
}
// @TODO RESPONSIVE
const withLayout = (ComposedComponent: React.ComponentType<any>) => {
	class WithLayout extends React.Component<any, State> {
		public static displayName = `WithLayout(${getComponentDisplayName(
			ComposedComponent
		)})`;

		public render() {
			return (
				<Layout className="layout">
					{/* <Header> */}
					{/* <div className="logo" /> */}

					<NavBar />
					{/* </Header> */}
					<Content className="content">
						<div style={{ background: '#fff' }}>
							<ComposedComponent {...this.props} />
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						CWB Solutions ©2018 Created by CWB Solutions
					</Footer>
				</Layout>
			);
		}
	}
	return WithLayout;
};

export default withLayout;
