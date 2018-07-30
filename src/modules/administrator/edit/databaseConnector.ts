import FormComponent from './adminForm';
import { compose } from 'recompose';
import withFirebaseDatabase from '../../../firebase/withFirebaseDatabase';


export default compose(withFirebaseDatabase)(FormComponent);
