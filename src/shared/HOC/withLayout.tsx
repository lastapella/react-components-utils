import { Layout } from 'antd';
import * as React from 'react';
import getComponentDisplayName from './utils';
import NavBar from '../ui/navbar/navBarWithFirebase';
const { Content, Footer } = Layout;

interface State {
	activeKeys: string[];
}

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
					<Content style={{ padding: '0 50px', height: '1000px' }}>
						<div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
							<ComposedComponent {...this.props} />
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						Ant Design ©2016 Created by Ant UED
					</Footer>
				</Layout>
			);
		}
	}
	return WithLayout;
};

export default withLayout;