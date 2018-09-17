import React, {Component} from 'react';
import avatar from '../../assets/images/user2_160x160.jpg'
import { withRouter, Link } from 'react-router-dom'
import routes from '../../RouteConfig'

export default class SideBar extends Component {
    render(){
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="float-left image">
                            <img src={avatar} className="rounded-circle" alt="User avatar" />
                        </div>
                        <div className="float-left info">
                            <p>Alexander Pierce</p>
                            <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
                        </div>
                    </div>
                    <form action="#" method="get" className="sidebar-form">
                        <div className="input-group">
                        <input type="text" name="q" className="form-control" placeholder="Search..." />
                        <span className="input-group-btn">
                                <button name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </form>
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">MAIN NAVIGATION</li>
                        {
                            routes.map((item, index) => {
                                if (item.children) {
                                    return <NavItemLv2 key={item.title} item={item} />
                                } else {
                                    return (
                                        <NavItem to={item.path} key={item.title}>
                                            <i className={item.icon}></i> <span>{item.title}</span>
                                        </NavItem>
                                    )
                                }
                            })
                        }
                    </ul>
                </section>
            </aside> 
        )
    }
}

const NavItemLv2 = withRouter((props) => {
    const { location, item } = props;
    let className = 'treeview '
    let isDisplay = false

    const paths = item.children.map(item => item.path)
    if(paths.indexOf(location.pathname) !== -1) {
        className += 'active menu-open'
        isDisplay = true
    }

    return (
        <li className={className}>
            <a href="#">
                <i className={item.icon}></i> 
                <span>{' ' + item.title}</span>
                <span className="pull-right-container">
                <i className="fa fa-angle-left pull-right"></i>
                </span>
            </a>
            <ul className="treeview-menu" style={{display: isDisplay ? 'block' : 'none'}}>
                {
                    item.children && item.children.map((child, index) => {
                        return (
                            <NavItem to={child.path} key={child.title}>
                                <i className="far fa-circle"></i> <span>{child.title}</span>
                            </NavItem>
                        )
                        
                    })
                }
            </ul>
        </li>
    )
});

const NavItem = withRouter((props) => {
    const { to, children, location } = props;
    return (
        <li className={location.pathname === to ? 'active' : null}>
            <Link to={to}>{children}</Link >
        </li>
    )
});