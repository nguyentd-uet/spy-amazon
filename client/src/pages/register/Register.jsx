import React, { Component } from "react";
import { registerUser } from "../../api/AuthApi";
import useInputValue from "../../hooks/useInputValue";

export default function Register(props) {
  const email = useInputValue("");
  const password = useInputValue("");
  const username = useInputValue("");
  const passwordConfirm = useInputValue("");
  
  const submitRegister = async (event) => {
    event.preventDefault();
    if (password.value !== '' && passwordConfirm.value !== '' && username.value !== '' && email.value !== '') {
      if (password.value === passwordConfirm.value) {
        try {
          let res = await registerUser({
            username: username.value,
            email: email.value,
            password: password.value
          })
          alert(res.message)          
        } catch (error) {
          alert(error.message);
        }
      } else {
        alert('Password Confirm invalid')
      }
    } else {
      alert('All fields required')
    }
  }
  return (
    <div className="register-box" style={{ border: "1px solid #ddd" }}>
      <div className="register-logo">
        <a href="../../index2.html">
          <b>Admin</b>LTE
        </a>
      </div>
      <form className="register-box-body" onSubmit={submitRegister}>
        <p className="login-box-msg">Register a new membership</p>
        <div className="form-group has-feedback">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            {...username}
          />
          <span className="glyphicon glyphicon-user form-control-feedback" />
        </div>
        <div className="form-group has-feedback">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            {...email}
          />
          <span className="glyphicon glyphicon-envelope form-control-feedback" />
        </div>
        <div className="form-group has-feedback">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...password}
          />
          <span className="glyphicon glyphicon-lock form-control-feedback" />
        </div>
        <div className="form-group has-feedback">
          <input
            type="password"
            className="form-control"
            placeholder="Retype password"
            {...passwordConfirm}
          />
          <span className="glyphicon glyphicon-log-in form-control-feedback" />
        </div>
        <div className="form-group">
          <div className="col-xs-8 mb-2">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" />
              <label className="custom-control-label">
                I agree to the <a href={null}>terms</a>
              </label>
            </div>
          </div>
          <div className="col-xs-4">
            <button type="submit" className="btn btn-primary btn-block btn-flat">Register</button>
          </div>
        </div>
        <a
          href={null}
          className="text-center"
          onClick={() => {props.history.push('/login')}}
        >
          I already have a membership
        </a>
      </form>
    </div>
  );
}