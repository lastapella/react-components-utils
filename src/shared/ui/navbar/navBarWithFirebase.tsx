import withFirebaseUser from '../../../firebase/withFirebaseUser';
import NavBar from './navbar';
// import Loader from '../defaultLoader';

export default withFirebaseUser()(NavBar);
