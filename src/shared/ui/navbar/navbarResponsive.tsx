import * as React from 'react';
import { Menu, Icon, Affix, Button, Row } from 'antd';
import { Link } from 'react-router-dom';

import logo from '../../../modules/home/logo.svg';
import { initActiveKeys, linksLeftInit, linksRightWithuser, linksRightNoUser, renderLinks, userSubMenuTitle } from './navbarShare';

const { SubMenu } = Menu;

// linksLeft
// 	.concat(linksRight)
// 	.filter(link => {
// 		link.children? return
// 	}pathname === link.to)
// 	.map(link => link.key);

class NavBar extends React.Component<any, any> {
	public constructor(props: any) {
		super(props);
		this.state = { showMenu: false };
	}

	public componentDidMount() {
		// this.toggleMenu();
	}



	public toggleMenu() {
		this.setState(() => ({
			showMenu: !this.state.showMenu
		}));
	}

	public resetMenu() {
		this.setState(() => ({
			showMenu: false
		}));
	}

	public render() {
		// const { activeKeys, linksLeft, linksRight, user } = this.state;
		const { authUser } = this.props;
		const linksLeft = linksLeftInit;
		const linksRight = authUser ? linksRightWithuser : linksRightNoUser;
		const activeKeys = initActiveKeys(
			window.location.pathname,
			linksLeft,
			linksRight
		);
		return (
			<Row>
				<Affix>
					<Button
						// tslint:disable-next-line:jsx-no-lambda
						onClick={() => this.toggleMenu()}
						size="large"
						style={{
							float: 'left',
							marginTop: '15px',
							marginLeft: '15px',
							border: 'none'
						}}
					>
						<Icon type="bars" style={{ fontSize: 32, color: '#000' }} />
					</Button>
					<img src={logo} width="64" height="64" style={{ float: 'left' }} />
					<Menu
						theme="light"
						defaultSelectedKeys={activeKeys}
						// tslint:disable-next-line:jsx-no-lambda
						onClick={() => this.resetMenu()}
						mode="inline"
						style={{
							lineHeight: '64px',
							boxShadow: '0 0 16px 0 rgba(0, 0, 0, .08)',
							border: 'none',
							marginBottom: '20px'
						}}
					>
						{this.state.showMenu && renderLinks(linksLeft)}
						{this.state.showMenu &&
							(!!authUser ? (
								<SubMenu
									key="userSubMenu"
									title={userSubMenuTitle(authUser.displayName as string)}
								>
									{renderLinks(linksRight)}
								</SubMenu>
							) : (
								renderLinks(linksRight)
							))}
					</Menu>
				</Affix>
			</Row>
		);
	}
}
export default NavBar;
