import React, { Component } from 'react'
import { registerUser } from '../../api/AuthApi'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirm: ''
        };
    
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onClickRegisterBtn = this.onClickRegisterBtn.bind(this);
        this.onClickRedirectToLogin = this.onClickRedirectToLogin.bind(this);
    }

    onChangeInput(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onClickRegisterBtn() {
        const { username, email, password, passwordConfirm } = this.state
        console.log(this.state)
        if (password !== '' && passwordConfirm !== '' && username !== '' && email !== '') {
            if (password === passwordConfirm) {
                registerUser({...this.state})
                .then(res => console.log(res))
            } else {
                alert('Password Confirm invalid')
            }
        } else {
            alert('All fields required')
        }
    }

    onClickRedirectToLogin(event) {
        event.preventDefault
        this.props.history.push('/login')
    }

    render() {
        const { username, email, password, passwordConfirm } = this.state

        return (
            <div className="register-box"  style={{border: '1px solid #ddd'}}>
                <div className="register-logo">
                    <a href="../../index2.html"><b>Admin</b>LTE</a>
                </div>

                <div className="register-box-body">
                    <p className="login-box-msg">Register a new membership</p>

                    <div className="form-group has-feedback">
                        <input type="text"
                            className="form-control" 
                            placeholder="Username"  
                            name='username'
                            value={username}
                            onChange={this.onChangeInput}
                        />
                        <span className="glyphicon glyphicon-user form-control-feedback"></span>
                    </div>
                    <div className="form-group has-feedback">
                        <input type="email"
                            className="form-control" 
                            placeholder="Email"  
                            name='email'
                            value={email}
                            onChange={this.onChangeInput}
                        />
                        <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                    </div>
                    <div className="form-group has-feedback">
                        <input type="password"
                            className="form-control" 
                            placeholder="Password"  
                            name='password'
                            value={password}
                            onChange={this.onChangeInput}
                        />
                        <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                    </div>
                    <div className="form-group has-feedback">
                        <input type="password"
                            className="form-control" 
                            placeholder="Retype password"  
                            name='passwordConfirm'
                            value={passwordConfirm}
                            onChange={this.onChangeInput}
                        />
                        <span className="glyphicon glyphicon-log-in form-control-feedback"></span>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-8 mb-2">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input"/>
                                <label className="custom-control-label">I agree to the <a href="#">terms</a></label>
                            </div>
                        </div>
                        <div className="col-xs-4">
                            <button className="btn btn-primary btn-block btn-flat" onClick={this.onClickRegisterBtn}>Register</button>
                        </div>
                    </div>
                    <a href="#" className="text-center" onClick={this.onClickRedirectToLogin}>I already have a membership</a>
                </div>
            </div>
        )
    }
}
