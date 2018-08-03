import FormComponent from './driverForm';
import withFirebaseDatabase from '../../firebase/withFirebaseDatabase';
import { addDriver } from '../../store/actions';
import { IDriver } from '../../store/models/driverState';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
	console.log(state);
	return { driver: state.driver };
};
const mapDispatchToProps = (dispatch: any) => {
	console.log(dispatch);
	return {
		addDriver: (driverValues: IDriver) => dispatch(addDriver(driverValues))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FormComponent);
