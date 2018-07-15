import * as React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import withFirebaseUser from '../../HOC/firebase/withFirebaseUser';

const { SubMenu } = Menu;
interface LinkType {
	to?: string;
	label: string;
	key: string;
	children?: LinkType[];
}

interface NavBarState {
	activeKeys: string[];
	linksLeft: LinkType[];
	linksRight: LinkType[];
}

interface NavBarProps extends React.Props<any> {
	firebaseUser: firebase.User;
	firebaseCurrentUser: firebase.User;
}

const linksLeftInit: LinkType[] = [
	{ to: '/', label: 'Home', key: 'home' },
	{ to: '/About', label: 'About', key: 'about' },
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
		to: '/logout',
		label: 'Logout',
		key: 'logout'
	}
];

const initActiveKeys = (
	pathname: string,
	linksLeft: LinkType[],
	linksRight: LinkType[]
) =>
	linksLeft
		.concat(linksRight)
		.filter(link => window.location.pathname === link.to)
		.map(link => link.key);

class NavBar extends React.Component<NavBarProps, NavBarState> {
	public constructor(props: any) {
		super(props);
		const { firebaseCurrentUser } = props;
		if (firebaseCurrentUser) {
			this.state = {
				activeKeys: initActiveKeys(window.location.pathname, linksLeftInit, linksRightWithuser),
				linksLeft: linksLeftInit,
				linksRight: linksRightWithuser
			};
		} else {
			this.state = {
				activeKeys: initActiveKeys(window.location.pathname, linksLeftInit, linksRightNoUser),
				linksLeft: linksLeftInit,
				linksRight: linksRightNoUser
			};
		}
	}

	public async componentDidMount() {
		console.log(this.props.firebaseUser);
		const firebaseUser = await this.props.firebaseUser;
		console.log(this.props.firebaseUser);
		if (firebaseUser) {
			console.log('USER SIGNED IN 2');
			console.log(firebaseUser);
			this.setState(() => ({
				linksRight: linksRightWithuser
			}));
		} else {
			// No user is signed in.
			console.log('NO USER SIGNED IN 2');
			this.setState(() => ({
				linksRight: linksRightNoUser
			}));
		}
	}
	public renderLink = (linkElement: LinkType, other: any) => (
		<Menu.Item key={linkElement.key} {...other}>
			<Link
				onClick={this.linkClicked.bind(this, linkElement.key)}
				to={linkElement.to ? linkElement.to : ''}
			>
				{' '}
				{linkElement.label}
			</Link>
		</Menu.Item>
	);

	public renderLinks = (linksTree: LinkType[], other?: any): JSX.Element[] =>
		linksTree.map(link => {
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
	public linkClicked = (key: string) => {
		console.log(key);
		this.setState(() => ({
			activeKeys: [key]
		}));
	};
	public render() {
		const { activeKeys, linksLeft, linksRight } = this.state;
		return (
			<Menu
				theme="light"
				mode="horizontal"
				defaultSelectedKeys={activeKeys}
				style={{ lineHeight: '64px' }}
			>
				{this.renderLinks(linksLeft)}
				{this.renderLinks(linksRight, { style: { float: 'right' } })}
			</Menu>
		);
	}
}
export default withFirebaseUser(NavBar);
