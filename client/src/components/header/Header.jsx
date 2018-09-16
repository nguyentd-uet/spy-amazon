import React, { Component } from 'react';
import avatar from '../../assets/images/user2_160x160.jpg'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from 'reactstrap';

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    onLogoutBtnClick(e) {
        e.preventDefault()
        this.props.logout()
        // this.props.history.push('/login')
    }

    render() {
        return (
            <header className="main-header" id='header-admin'>
                <a href="#" className="logo">
                    <span className="logo-mini"><b>A</b>LT</span>
                    <span className="logo-lg"><b>Admin</b>LTE</span>
                </a>
                <nav className="navbar navbar-static-top">
                    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        {/* <span className="sr-only">Toggle navigation</span> */}
                        <i className="fas fa-bars"></i>
                    </a>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown messages-menu">
                                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle caret style={{padding: '5px 12px 6px 12px', border: '0', backgroundColor: '#3c8dbc'}}>
                                        <i className="fas fa-envelope"></i>
                                        <Badge color="success">4</Badge>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            <div className="float-left">
                                                <img src={avatar} className="rounded-circle" alt="User Image" />
                                            </div>
                                            <div className="float-right">
                                                <h4>
                                                    Support Team
                                                    <small><i className="far fa-clock"></i> 5 mins</small>
                                                </h4>
                                                <p>Why not buy a new awesome theme?</p>
                                            </div>

                                        </DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>

                                <button href="#" className='btn' 
                                    style={{
                                        padding: '5px 12px 6px 12px', 
                                        border: '0', 
                                        backgroundColor: '#3c8dbc', 
                                        textDecoration: 'none', 
                                        color: 'white'
                                    }}
                                    onClick={this.onLogoutBtnClick.bind(this)}
                                >
                                    Logout {' '}
                                    <i className="fas fa-sign-out-alt"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}