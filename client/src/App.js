import React, { Component } from 'react';
import Loadable from 'react-loadable'
import Loading from './components/loading/Loading'
import { Switch, Redirect } from 'react-router-dom'
import PropsRoute from './components/PropsRoute'
import Header from './components/header/Header'
import SideBar from './components/side-bar/SideBar'
import './App.css'
import { flatConfig } from './RouteConfig'
import { getUserInfo, logout, setUserInfo } from './helpers/AuthHelper'
import store from 'store'

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
    isLogin: false,
    userInfo: {}
  }

  login(data) {
    console.log(data)
    const userInfo = {
      email: data.email,
      username: data.username
    }
    setUserInfo(data.access_token, userInfo)
    this.setState({isLogin: true, userInfo: userInfo})
    this.props.history.push('/dashboard')
  }

  logout() {
    this.setState({isLogin: false, userInfo: {}})
    logout()
  }

  componentDidMount() {
    getUserInfo().then(res => {
      if(res.success) {
        const userInfo = store.get('user_info')
        if (userInfo) {
          this.setState({isLogin: true, userInfo: userInfo})
        }
      } else {
        this.logout()
      }
    })
    .catch(err => {
      this.logout()
    })
    
  }

  render() {
    const {isLogin, userInfo} = this.state;

    if (isLogin) {
      return (
        <div className="wrapper">
          <Header {...this.props} logout={this.logout.bind(this)} userInfo={userInfo} />
          <SideBar userInfo={userInfo} />

          <div className="content-wrapper" style={{minHeight: window.innerHeight - 51}}>
            {/* <section className="content-header"> */}
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
            {/* </section> */}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Switch>
            <PropsRoute exact path='/login' component={LoginLoadable} login={this.login.bind(this)} /> 
            <PropsRoute path='/register' component={RegisterLoadable} /> 

            <Redirect to='/login' />
          </Switch>
        </div>
      );
    }
    
  }
}

export default App;
