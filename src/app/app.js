import React from 'react';
import { connect } from 'react-redux';
import renderRoutes from './utils/renderRoutes';
import routes from './routes';

class App extends React.Component {
  state = {};
  componentDidMount() {}

  render() {
    return <div>{renderRoutes(routes, { authed: this.props.authed })}</div>;
  }
}
const mapStateToProps = state => ({
  authed: state.session.authed
});
export default connect(
  mapStateToProps,
  null
)(App);
