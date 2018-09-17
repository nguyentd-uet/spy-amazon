import React, { Component } from 'react';
import Loadable from 'react-loadable'
import Loading from './components/loading/Loading'
import { Switch, Redirect } from 'react-router-dom'
import PropsRoute from './components/PropsRoute'
import Header from './components/header/Header'
import SideBar from './components/side-bar/SideBar'
import './App.css'
import { flatConfig } from './RouteConfig'
import Register from './pages/register/Register'

const LoginLoadable = Loadable({
  loader: () => import('./pages/login/Login'),
  loading: Loading,
});

const RegisterLoadable = Loadable({
  loader: () => import('./pages/register/Register'),
  loading: Loading,
});

class App extends Component {
  state = {
    isLogin: false
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
                {
                  flatConfig.map((item, index) => {
                    return (
                      <PropsRoute 
                        key={index}
                        path={item.path} 
                        component={item.component}
                      />
                    )
                  })
                }

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
            <PropsRoute path='/register' component={Register} /> 

            <Redirect to='/login' />
          </Switch>
        </div>
      );
    }
    
  }
}

export default App;
