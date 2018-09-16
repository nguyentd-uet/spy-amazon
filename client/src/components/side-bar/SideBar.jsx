import React, {Component} from 'react';
import avatar from '../../assets/images/user2_160x160.jpg'
import { NavLink, withRouter, Link } from 'react-router-dom'

export default class SideBar extends Component {
    render(){
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="float-left image">
                            <img src={avatar} className="rounded-circle" alt="User Image" />
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
                        <li className="treeview">
                            <a href="#">
                                <i className="fas fa-pie-chart"></i>
                                <span>Charts</span>
                                <span className="pull-right-container">
                                <i className="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul className="treeview-menu">
                                <li><a href="pages/charts/chartjs.html"><i className="fa fa-circle-o"></i> ChartJS</a></li>
                                <li><a href="pages/charts/morris.html"><i className="fa fa-circle-o"></i> Morris</a></li>
                                <li><a href="pages/charts/flot.html"><i className="fa fa-circle-o"></i> Flot</a></li>
                                <li><a href="pages/charts/inline.html"><i className="fa fa-circle-o"></i> Inline charts</a></li>
                            </ul>
                        </li>
                        {/* <NavLink activeClassName="active" to='/admin/prices'><i className="fas fa-dollar-sign"></i> <span>Prices</span></NavLink> */}
                        <NavItem to='/dashboard'><i className="fas fa-tachometer-alt"></i> <span>Dashboard</span></NavItem> 
                        <NavItem to='/prices'><i className="fas fa-dollar-sign"></i> <span>Prices</span></NavItem> 
                        <NavItem to='/users'><i className="fa fa-users"></i> <span>Users</span></NavItem>
                    </ul>
                </section>
            </aside> 
        )
    }
}

const NavItem = withRouter((props) => {
    const { to, children, location } = props;
    return (
        <li className={location.pathname == to ? 'active' : null}>
            <Link to={to}>{children}</Link >
        </li>
    )
});