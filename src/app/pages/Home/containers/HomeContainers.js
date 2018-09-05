import { connect } from 'react-redux';
import Home from '../compoments/Home';
import { key, actions } from '../modules/home';

const mapStateToProps = state => ({
  count: state[key].count,
  users: state[key].users,
  user: state[key].user
});

const mapDispatchTpProps = actions;

export default connect(
  mapStateToProps,
  mapDispatchTpProps
)(Home);
