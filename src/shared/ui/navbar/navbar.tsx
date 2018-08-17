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
	// { to: '/parkinguser2', label: 'About', key: 'about' },
	{
		to: '/drivers',
		label: 'Driver/Vehicle',
		key: 'driver',
		children: [
			{ to: '/drivers/list', label: 'List drivers', key: 'driver:list' },
			{ to: '/drivers/add', label: 'Add driver', key: 'driver:add' }
			// { to: '/topic', label: 'Topic2', key: 'topic:2' }
		]
	},
	{
		to: '/administrators',
		label: 'Administrators',
		key: 'admins',
		children: [
			{
				to: '/administrators/list',
				label: 'List administrators',
				key: 'admins:list'
			},
			{
				to: '/administrators/add',
				label: 'Add administrators',
				key: 'admins:add'
			}
		]
	},
	{ to: '/hardware', label: 'Hardware management', key: 'hardware' }
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
) => {
	const filterLinks2 = (links: LinkType[]): LinkType[] => {
		return links.reduce((acc, link) => {
			if (link.children) {
				const filteredChild = filterLinks2(link.children);
				return filteredChild.length !== 0
					? [...acc, link, ...filteredChild]
					: acc;
			} else {
				return link.to === pathname ? [...acc, link] : acc;
			}
		}, []);
	};
	return filterLinks2(linksLeft.concat(linksRight)).map(l => l.key);
};
// linksLeft
// 	.concat(linksRight)
// 	.filter(link => {
// 		link.children? return
// 	}pathname === link.to)
// 	.map(link => link.key);

class NavBar extends React.Component<any, any> {
	public renderLink = (linkElement: LinkType, other: any) => (
		<Menu.Item key={linkElement.key} {...other}>
			<Link to={linkElement.to ? linkElement.to : ''}>{linkElement.label}</Link>
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
