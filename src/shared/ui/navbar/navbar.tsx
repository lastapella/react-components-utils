import * as React from 'react';
import { Menu, Icon, Affix } from 'antd';
import { Link } from 'react-router-dom';

import logo from '../../../modules/home/logo.svg';
import { linksRightWithuser, linksLeftInit, linksRightNoUser, initActiveKeys, renderLinks, userSubMenuTitle } from './navbarShare';

const { SubMenu } = Menu;



class NavBar extends React.Component<any, any> {



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
			<Affix style={{ zIndex: 10 }}>
				<img src={logo} width="64" height="64" style={{ float: 'left' }} />
				<Menu
					theme="light"
					mode="horizontal"
					defaultSelectedKeys={activeKeys}
					style={{
						lineHeight: '64px',
						boxShadow: '0 0 16px 0 rgba(0, 0, 0, .08)',
						border: 'none'
					}}
				>
					{renderLinks(linksLeft)}
					{!!authUser ? (
						<SubMenu
							key="userSubMenu"
							title={userSubMenuTitle(authUser.displayName as string)}
							style={{ float: 'right' }}
						>
							{renderLinks(linksRight)}
						</SubMenu>
					) : (
						renderLinks(linksRight, { style: { float: 'right' } })
					)}
				</Menu>
			</Affix>
		);
	}
}
export default NavBar;
