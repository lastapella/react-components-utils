import * as React from 'react';
import { connect } from 'react-redux';
import NavBar from './navbar';
import NavBarResponsive from './navbarResponsive';
import { RootState } from '../../../store';
import { Desktop, Mobile, Tablet } from '../responsiveBreakpoints';
// import Loader from '../defaultLoader';

const NavBarContainer = (props: any) => {
	return (
		<>
			<Desktop>
				<NavBar {...props} />
			</Desktop>
			<Mobile>
				<NavBarResponsive {...props} />
			</Mobile>{' '}
			<Tablet>
				<NavBarResponsive {...props} />
			</Tablet>
		</>
	);
};

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;
interface OwnProps {
	[key: string]: any;
}

const mapStateToProps = (state: RootState, props: any) => {
	return {
		authUser: state.user.user
	};
};
const mapDispatchToProps = () =>
	// dispatch: ThunkDispatch<RootState, void, Action>
	{
		return {};
	};

export default connect<PropsFromState, PropsFromDispatch, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(NavBarContainer);
