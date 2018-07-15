import * as React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
// import
import withFirebaseUser  from '../../HOC/firebase/withFirebaseUser';

const { SubMenu } = Menu;
interface LinkType {
	to?: string;
	label: string;
	key: string;
	children?: LinkType[];
}

interface NavBarState {
	activeKeys: string[];
}

interface NavBarProps extends React.Props<any> {
	firebaseUser: firebase.User ;
}

class NavBar extends React.Component<NavBarProps, NavBarState> {
	public linksLeft: LinkType[] = [
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

	public constructor(props: any) {
		super(props);

		this.state = {
			activeKeys: this.linksLeft
				// .concat( this.linkRight())
				.filter(link => window.location.pathname === link.to)
				.map(link => link.key) || ['']
		};
	}

	public linkRight = () => {
		const { firebaseUser  } = this.props;
		// if(firebaseInst.)
		let links: LinkType[] = [];

		if (firebaseUser) {
			console.log('USER SIGNED IN');
			console.log(firebaseUser);
			links = [
				{
					to: '/logout',
					label: 'Logout',
					key: 'logout'
				}
			];
		} else {
			// No user is signed in.
			console.log('NO USER SIGNED IN');
			links = [
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
		}
		return links;
	};
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
		this.setState((prev, next) => ({
			activeKeys: [key]
		}));
	};
	public render() {
		const { activeKeys } = this.state;
		return (
			<Menu
				theme="light"
				mode="horizontal"
				defaultSelectedKeys={activeKeys}
				style={{ lineHeight: '64px' }}
			>
				{this.renderLinks(this.linksLeft)}
				{this.renderLinks(this.linkRight(), { style: { float: 'right' } })}
			</Menu>
		);
	}
}
export default withFirebaseUser(NavBar);
