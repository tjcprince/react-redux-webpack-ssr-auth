import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

class Login extends React.Component {
  state = {};
  componentDidMount() {
    if (this.props.authed) {
      this.props.history.push('/app/home', { authed: true });
    }
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.authed !== this.props.authed) {
      if (this.props.location.successPath) {
        this.props.history.push(this.props.location.successPath, { authed: nextProps.authed });
      } else {
        this.props.history.push('/app/home', { authed: nextProps.authed });
      }

      return true;
    }
    return false;
  }

  render() {
    return (
      <Button
        onClick={() => {
          this.props.login(true);
        }}
      >
        登录
      </Button>
    );
  }
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  authed: PropTypes.bool.isRequired
};
export default withRouter(Login);
