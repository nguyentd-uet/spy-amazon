import React, {Component} from 'react';

export default class Content extends Component {
    render(){
        return (
            <div>
                <section className="content-header mt-0">
                    <h1>Dashboard</h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fas fa-tachometer-alt"></i> Home</a></li>
                        <li className="active">Dashboard</li>
                    </ol>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-aqua"><i className="fas fa-cubes"></i></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Products</span>
                                    <span className="info-box-number">999</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-red"><i className="fas fa-link"></i></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Link crawl</span>
                                    <span className="info-box-number">3</span>
                                </div>
                            </div>
                        </div>

                        <div className="clearfix visible-sm-block"></div>

                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-green"><i className="fas fa-shopping-cart"></i></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Sales</span>
                                    <span className="info-box-number">760</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="info-box">
                                <span className="info-box-icon bg-yellow"><i className="fas fa-users"></i></span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Members</span>
                                    <span className="info-box-number">1</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
      
            </div>
        )
    }
}