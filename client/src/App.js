import React, { Component } from 'react';
import Loadable from 'react-loadable'
import Loading from './components/loading/Loading'
import { Switch, Redirect, Route } from 'react-router-dom'
import PropsRoute from './components/PropsRoute'
import Header from './components/header/Header'
import SideBar from './components/side-bar/SideBar'
import './App.css'

const LoginLoadable = Loadable({
  loader: () => import('./pages/login/Login'),
  loading: Loading,
});

const DashboardLoadable = Loadable({
  loader: () => import('./pages/main/dashboard/Dashboard'),
  loading: Loading,
});

class App extends Component {
  state = {
    isLogin: true
  }

  login() {
    this.setState({isLogin: true})
    this.props.history.push('/dashboard')
  }

  logout() {
    this.setState({isLogin: false})
  }

  render() {
    const {isLogin} = this.state;

    if (isLogin) {
      return (
        <div className="wrapper">
          <Header {...this.props} logout={this.logout.bind(this)} />
          <SideBar />

          <div className="content-wrapper" style={{minHeight: window.innerHeight - 51}}>
            <section className="content-header">
              <Switch>
                <Route exact path={'/dashboard'} component={DashboardLoadable}/>
                <Route path={'/prices'} component={priceView}/>
                <Route path={'/users'} component={userView}/>

                <Redirect to='/dashboard' />
              </Switch>
            </section>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Switch>
            <PropsRoute exact path='/login' component={LoginLoadable} login={this.login.bind(this)} /> 

            <Redirect to='/login' />
          </Switch>
        </div>
      );
    }
    
  }
}

const priceView = () => {
  return <h1>price view</h1>
}

const userView = () => {
  return <h1>user view</h1>
}

const dashboardView = () => {
  return <h1>dashboard view</h1>
}

export default App;
