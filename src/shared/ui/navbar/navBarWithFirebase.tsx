import NavBar from './navbar';
import { RootState } from '../../../store';
import { connect } from 'react-redux';
// import Loader from '../defaultLoader';

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
)(NavBar);
