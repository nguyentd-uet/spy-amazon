import React, { useState } from "react";
import { login } from '../../api/AuthApi'
import useInputValue from '../../hooks/useInputValue'
export default function Login(props) {
  const email = useInputValue('');
  const password = useInputValue('');
  // Write all function or effect hooks in here
  const submitLogin = async (event) => {
    event.preventDefault();
    if(email.value.trim() !== '' && password.value.trim() !== ''){
      let result = await login({email: email.value, password: password.value});
      if(result){
        props.login(result.data)
      }
    }
  }
  return (
    <React.Fragment>
      <div className="login-box" style={{ border: '1px solid #ddd' }}>
        <div className="login-logo">
          <a href={null}><b>Admin</b>LTE</a>
        </div>
        <form className="login-box-body" onSubmit={submitLogin}>
          <p className="login-box-msg">Sign in to start your session</p>
          <div className="form-group has-feedback">
            <input type="email"
              className="form-control"
              placeholder="Email"
              {...email}
            />
            <span className="glyphicon glyphicon-envelope form-control-feedback" ></span>
          </div>
          <div className="form-group has-feedback">
            <input type="password"
              className="form-control"
              placeholder="Password"
              {...password}
            />
            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div className="form-group">
            <div className="col-xs-8 mb-2">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" />
                <label className="custom-control-label">Remember me</label>
              </div>
            </div>
            <div className="col-xs-4">
              <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
            </div>
          </div>
          <a href={null}>I forgot my password</a><br />
          <a href={null} className="text-center" onClick={() => {props.history.push('/register')}}>Register a new membership</a>

        </form>
      </div>
    </React.Fragment>
  )
}