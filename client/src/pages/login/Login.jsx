import React, { Component } from 'react'

export default class Login extends Component {
    onClickLoginBtn() {
        // localStorage.setItem('token', 'ggwp')
        // this.props.history.push('/home')
        this.props.login()
    }

    render() {
        return (
            <div className="login-box" style={{border: '1px solid #ddd'}}>
                <div className="login-logo">
                    <a href="#"><b>Admin</b>LTE</a>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Sign in to start your session</p>

                    <form>
                        <div className="form-group has-feedback">
                            <input type="email" className="form-control" placeholder="Email"/>
                                <span className="glyphicon glyphicon-envelope form-control-feedback" ></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" className="form-control" placeholder="Password" />
                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-8 mb-2">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input"/>
                                    <label className="custom-control-label">Remember me</label>
                                </div>
                            </div>
                            <div className="col-xs-4">
                                <button className="btn btn-primary btn-block btn-flat" onClick={() => this.onClickLoginBtn()}>Sign In</button>
                            </div>
                        </div>
                    </form>

                    <a href="#">I forgot my password</a><br />
                    <a href="register.html" className="text-center">Register a new membership</a>

                </div>
            </div>
        )
    }
}
