import { connect } from 'react-redux';
import Login from '../compoments/Login';
import { key, actions } from '../modules/login';

const mapStateToProps = state => ({
  authed: state[key].authed
});

const mapDispatchTpProps = actions;

export default connect(
  mapStateToProps,
  mapDispatchTpProps
)(Login);
