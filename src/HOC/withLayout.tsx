import { Layout, Affix } from 'antd';
import * as React from 'react';
import getComponentDisplayName from './utils';
import NavBar from '../shared/ui/navbar/navBarWithFirebase';
const { Content, Footer } = Layout;

interface State {
	activeKeys: string[];
}

const withLayout = (ComposedComponent: React.ComponentClass | React.SFC) => {
	class WithLayout extends React.Component<any, State> {
		public static displayName = `WithLayout(${getComponentDisplayName(
			ComposedComponent
		)})`;

		public render() {
			return (
				<Layout className="layout">
					{/* <Header> */}
					{/* <div className="logo" /> */}
					<Affix>
						<NavBar />
					</Affix>
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
