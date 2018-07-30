import FormComponent from './adminForm';
import { compose } from 'recompose';
import withFirebaseDatabase from '../../../firebase/withFirebaseDatabase';
import withFirebaseAdminFunctions from '../../../firebase/withFirebaseAdminFunctions';


export default compose(withFirebaseDatabase, withFirebaseAdminFunctions)(FormComponent);
