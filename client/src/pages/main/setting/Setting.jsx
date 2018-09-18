import React, { Component } from 'react'
import AddLinkModal from './AddLinkModal'

export default class Setting extends Component {
    state = {
        isShownModal: false
    }

    toggleModal() {
        this.setState({isShownModal: !this.state.isShownModal});
    }

    render() {
      const { isShownModal } = this.state
        return (
            <div>
                <section className="content-header mt-0">
                    <h1>Setting</h1>
                    <ol className="breadcrumb">
                        <li><a href="#"><i className="fas fa-tachometer-alt"></i> Home</a></li>
                        <li className="active">Setting</li>
                    </ol>
                </section>
                <section className="content-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="box">
                                <div className="box-header with-border">
                                    {/* <h3 className="box-title">Monthly Recap Report</h3> */}
                                    <button className='btn btn-primary' onClick={this.toggleModal.bind(this)}>Add link crawl</button>

                                    <AddLinkModal isOpen={isShownModal} toggle={this.toggleModal.bind(this)} />
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <p className="text-center">
                                                <strong>This is text</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
