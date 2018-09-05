import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import renderRoutes from '../utils/renderRoutes';
import { key, actions } from './rootReducer';

import logo from '../../assets/images/logo.png';

const { Header, Content, Footer, Sider } = Layout;

const StyledIcon = styled(Icon)`
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1890ff;
  }
`;

const StyledLogo = styled.div`
  height: 64px;
  position: relative;
  line-height: 64px;
  padding-left: 20px;
  transition: all 0.3s;
  background: #002140;
  overflow: hidden;

  & img {
    display: inline-block;
    vertical-align: middle;
    height: 32px;
  }

  & span {
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    margin-left: 12px;
    font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 600;
  }
`;

class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    changeSelectedKeys: PropTypes.func.isRequired,
    changeCollapsed: PropTypes.func.isRequired,
    collapsed: PropTypes.bool.isRequired,
    selectedKeys: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
  };

  componentDidMount = () => {
    if (this.props.history.location.pathname.length > 1) {
      this.props.changeSelectedKeys(this.props.history.location.pathname);
    }
  };

  toggle = () => {
    this.props.changeCollapsed(!this.props.collapsed);
  };

  linkTo = (item) => {
    this.props.changeSelectedKeys(item.key);
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
          <StyledLogo>
            <Link to="/app/home" onClick={() => this.linkTo({ key: '/app/home' })}>
              <img src={logo} alt="logo" />
              <span>菱歌</span>
            </Link>
          </StyledLogo>
          <Menu
            theme="dark"
            mode="inline"
            onClick={this.linkTo}
            defaultSelectedKeys={['/app/home']}
            selectedKeys={this.props.selectedKeys}
          >
            <Menu.Item key="/app/home">
              <Link to="/app/home">
                <Icon type="pie-chart" />
                <span>首页</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/app/list">
              <Link to="/app/list">
                <Icon type="pie-chart" />
                <span>列表</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/app/detail">
              <Link to="/app/detail">
                <Icon type="pie-chart" />
                <span>详情</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <StyledIcon
              type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px 0', height: '100%' }}>
            <div style={{ padding: 24, background: '#fff', height: '100%' }}>
              {renderRoutes(this.props.route.routes)}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2016 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  collapsed: state[key].collapsed,
  selectedKeys: state[key].selectedKeys
});

const mapDispatchToProps = actions;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Root));
