import React, { Component } from 'react';
import Loading from './components/loading/Loading'
import { Switch, Redirect } from 'react-router-dom'
import PropsRoute from './components/PropsRoute'
import Header from './components/header/Header'
import SideBar from './components/side-bar/SideBar'
import './App.css'
import { flatConfig } from './RouteConfig'
import { getUserInfo, logout, setUserInfo } from './helpers/AuthHelper'
import store from 'store'

class App extends Component {
  state = {
    isLogin: undefined,
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
        } else {
          this.setState({isLogin: false, userInfo: {}})
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

    if (isLogin === true) {
      return (
        <div className="wrapper">
          <Header {...this.props} logout={this.logout.bind(this)} userInfo={userInfo} />
          <SideBar userInfo={userInfo} />

          <div className="content-wrapper" style={{minHeight: window.innerHeight - 51}}>
            {/* <section className="content-header"> */}
              <Switch>
                {
                  flatConfig.map((item, index) => {
                    if (item.requireAuth) {
                      return (
                        <PropsRoute 
                          key={item.path}
                          path={item.path} 
                          component={item.component}
                        />
                      )
                    }
                    return null;
                  })
                }

                <Redirect to='/dashboard' />
              </Switch>
            {/* </section> */}
          </div>
        </div>
      );
    } else if (typeof isLogin === 'undefined') {
      return <Loading size='50' />
    } else {
      return (
        <div>
          <Switch>
            {
              flatConfig.map((item, index) => {
                if (!item.requireAuth) {
                  return (
                    <PropsRoute 
                      key={item.path}
                      path={item.path} 
                      component={item.component}
                      login={this.login.bind(this)}
                    />
                  )
                }
                return null;
              })
            }

            <Redirect to='/login' />
          </Switch>
        </div>
      );
    }
    
  }
}

export default App;
