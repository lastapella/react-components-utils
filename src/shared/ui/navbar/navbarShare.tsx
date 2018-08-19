import * as React from 'react';
import { Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

interface LinkType {
	to?: string;
	label: string;
	key: string;
	icon?: string;
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

export const linksLeftInit: LinkType[] = [
	{ to: '/', label: 'Home', key: 'home', icon: 'home' },
	// { to: '/parkinguser2', label: 'About', key: 'about' },
	{
		to: '/drivers',
		label: 'Driver/Vehicle',
		key: 'driver',
		icon: 'car',
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
		icon: 'usergroup-add',
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
	{
		to: '/hardware',
		label: 'Hardware',
		key: 'hardware',
		icon: 'tool',
		children: [
			{
				to: '/hardware/management',
				label: 'Management',
				key: 'hardware:management'
			},
			{
				to: '/hardware/events',
				label: 'Events',
				key: 'hardware:events'
			},
			{
				to: '/hardware/data',
				label: 'Data',
				key: 'hardware:data'
			}
		]
	}
];
export const linksRightNoUser = [
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

export const linksRightWithuser = [
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

export const userSubMenuTitle = (username: string) => {
	return (
		<React.Fragment>
			<Icon style={{ color: '#1890ff', fontSize: 28 }} type="user" />
			{username}
		</React.Fragment>
	);
};

export const renderSubMenuTitle = (label: string, icon?: string) => {
	return icon ? (
		<React.Fragment>
			<Icon style={{ color: '#1890ff', fontSize: 28 }} type={icon} />
			{label}
		</React.Fragment>
	) : (
		label
	);
};

export const initActiveKeys = (
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

export const renderLink = (linkElement: LinkType, other: any) => (
	<Menu.Item key={linkElement.key} {...other}>
		<Link to={linkElement.to ? linkElement.to : ''}>
			{linkElement.icon ? (
				<Icon
					style={{ color: '#1890ff', fontSize: 28 }}
					type={linkElement.icon}
				/>
			) : (
				''
			)}
			{linkElement.label}
		</Link>
	</Menu.Item>
);

export const renderLinks = (
	linksTree: LinkType[],
	other?: any
): JSX.Element[] => {
	return linksTree.map(link => {
		if (link.children) {
			return (
				<SubMenu
					key={link.key}
					title={renderSubMenuTitle(link.label, link.icon)}
					{...other}
				>
					{renderLinks(link.children as LinkType[])}
				</SubMenu>
			);
		} else {
			return renderLink(link, other);
		}
	});
};
