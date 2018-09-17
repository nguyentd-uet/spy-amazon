import React, { Component } from 'react'
import { login } from '../../api/AuthApi'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onClickLoginBtn = this.onClickLoginBtn.bind(this);
        this.onClickRegisterBtn = this.onClickRegisterBtn.bind(this);
    }

    onChangeInput(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onClickLoginBtn() {
        // this.props.login()
        const { email, password } = this.state
        if (email !== '' && password !== '') {
            login({...this.state})
            .then(res => {
                this.props.login(res.data)
            })
            .catch(err => alert(err))
        } else {
            alert('All fields required')
        }
    }

    onClickRegisterBtn(event) {
        event.preventDefault()
        this.props.history.push('/register')
    }

    render() {
        const { email, password } = this.state
        return (
            <div className="login-box" style={{border: '1px solid #ddd'}}>
                <div className="login-logo">
                    <a href="#"><b>Admin</b>LTE</a>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Sign in to start your session</p>

                    <div className="form-group has-feedback">
                        <input type="email" 
                            className="form-control" 
                            placeholder="Email"
                            name='email'
                            value={email}
                            onChange={this.onChangeInput}
                        />
                        <span className="glyphicon glyphicon-envelope form-control-feedback" ></span>
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

                    <a href="#">I forgot my password</a><br />
                    <a href='#' className="text-center" onClick={this.onClickRegisterBtn}>Register a new membership</a>

                </div>
            </div>
        )
    }
}
