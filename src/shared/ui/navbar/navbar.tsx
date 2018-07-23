import * as React from 'react';
import { Menu, Icon, Affix } from 'antd';
import { Link } from 'react-router-dom';

import logo from '../../../modules/home/logo.svg';

const { SubMenu } = Menu;
interface LinkType {
	to?: string;
	label: string;
	key: string;
	children?: LinkType[];
	props?: { [key: string]: any };
}

// interface NavBarState {
// 	activeKeys: string[];
// 	linksLeft: LinkType[];
// 	linksRight: LinkType[];
// 	user?: firebase.UserInfo;
// }

// interface NavBarProps extends React.Props<any> {
// 	user: Promise<firebase.User>;
// }

const linksLeftInit: LinkType[] = [
	{ to: '/', label: 'Home', key: 'home' },
	{ to: '/parkinguser2', label: 'About', key: 'about' },
	{
		to: '/topic',
		label: 'Topic',
		key: 'topic',
		children: [
			{ to: '/topic', label: 'Topic1', key: 'topic:1' },
			{ to: '/topic', label: 'Topic2', key: 'topic:2' }
		]
	}
];
const linksRightNoUser = [
	{
		to: '/register',
		label: 'Register',
		key: 'register'
	},
	{
		to: '/login',
		label: 'Login',
		key: 'login'
	}
];

const linksRightWithuser = [
	{
		to: '/profile',
		label: 'profile',
		key: 'profile'
	},
	{
		to: '/logout',
		label: 'Logout',
		key: 'logout'
	}
];

const userSubMenuTitle = (username: string) => {
	return (
		<React.Fragment>
			<Icon style={{ color: '#1890ff', fontSize: 28 }} type="user" />
			{username}
		</React.Fragment>
	);
};

const initActiveKeys = (
	pathname: string,
	linksLeft: LinkType[],
	linksRight: LinkType[]
) =>
	linksLeft
		.concat(linksRight)
		.filter(link => pathname === link.to)
		.map(link => link.key);

class NavBar extends React.Component<any, any> {
	public renderLink = (linkElement: LinkType, other: any) => (
		<Menu.Item key={linkElement.key} {...other}>
			<Link
				onClick={this.linkClicked.bind(this, linkElement.key)}
				to={linkElement.to ? linkElement.to : ''}
			>
				{linkElement.label}
			</Link>
		</Menu.Item>
	);

	public renderLinks = (linksTree: LinkType[], other?: any): JSX.Element[] => {
		return linksTree.map(link => {
			if (link.children) {
				return (
					<SubMenu key={link.key} title={link.label} {...other}>
						{this.renderLinks(link.children as LinkType[])}
					</SubMenu>
				);
			} else {
				return this.renderLink(link, other);
			}
		});
	};
	public linkClicked = (key: string) => {
		this.setState(() => ({
			activeKeys: [key]
		}));
	};

	
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
			<Affix>
				<img src={logo} width="64" height="64" style={{ float: 'left' }} />
				<Menu
					theme="light"
					mode="horizontal"
					defaultSelectedKeys={activeKeys}
					style={{ lineHeight: '64px' }}
				>
					{this.renderLinks(linksLeft)}
					{!!authUser ? (
						<SubMenu
							key="userSubMenu"
							title={userSubMenuTitle(authUser.displayName as string)}
							style={{ float: 'right' }}
						>
							{this.renderLinks(linksRight)}
						</SubMenu>
					) : (
						this.renderLinks(linksRight, { style: { float: 'right' } })
					)}
				</Menu>
			</Affix>
		);
	}
}
export default NavBar;
