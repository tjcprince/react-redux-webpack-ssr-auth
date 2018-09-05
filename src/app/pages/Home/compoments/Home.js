import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styled from 'styled-components';
import Duck from '../../../../assets/images/Duck.jpg';

const Title = styled.h1`
  font-size: 20px;
  text-align: center;
  color: red;
`;

class Home extends React.Component {
  componentDidMount() {
    // this.props.increment();
  }
  render() {
    const { count, doubleAsync } = this.props;
    return (
      <div className="home__container">
        <Button type="primary" onClick={() => this.props.fetchGetUsers()}>
          点击加载用户
        </Button>
        <Button type="primary" onClick={() => this.props.addUsers()}>
          添加用户
        </Button>
        <div style={{ color: 'red' }}>{this.props.user.userName}</div>
        {this.props.users.map(user => <div key={user.id}>{user.userName}</div>)}
        <img src={Duck} alt="鸭子" />
        <h3>Counter: {count}</h3>
        <button onClick={() => this.props.increment()} id="btn">
          Increment
        </button>
        <Title>dadasdsadasdasda</Title>
        <br />
        <button onClick={doubleAsync}>Double(Async)</button>
      </div>
    );
  }
}

Home.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
  fetchGetUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  addUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};
export default Home;
