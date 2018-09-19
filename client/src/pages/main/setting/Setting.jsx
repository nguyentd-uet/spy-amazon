import React, { Component } from 'react'
import AddLinkModal from './AddLinkModal'
import { getAllLink } from '../../../api/LinkCrawlApi'

export default class Setting extends Component {
    state = {
        isShownModal: false,
        links: []
    }

    toggleModal() {
        this.setState({isShownModal: !this.state.isShownModal});
    }

    componentDidMount() {
        getAllLink()
        .then(res => {
            if(res.success) {
                this.setState({links: res.data})
            }
        })
    }
    
    render() {
      const { isShownModal, links } = this.state
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
                                        <div className="col-md-12">
                                            <table className="table table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col" width='50%'>Link crawl</th>
                                                        <th scope="col">Keyword</th>
                                                        <th scope="col">Type</th>
                                                        <th scope='col'>Status</th>
                                                        <th scope='col' width='10%'>Number page to crawl</th>
                                                        <th scope='col'>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        links.length > 0 && links.map((item, index) => {
                                                            return (
                                                                <tr key={item._id}>
                                                                    <th scope="row">{index+1}</th>
                                                                    <td>{item.crawl_link}</td>
                                                                    <td>{item.keyword}</td>
                                                                    <td>{item.type}</td>
                                                                    <td>
                                                                    {
                                                                        item.status ? 
                                                                        <span className="badge badge-success" style={{padding: '5px'}}>Enable</span>
                                                                        :<span class="badge badge-danger" style={{padding: '5px'}}>Disable</span>
                                                                    }
                                                                    </td>
                                                                    <td>{item.num_page_to_crawl}</td>
                                                                    <td className='text-center'>
                                                                        <i className='fas fa-pen text-info mx-2' style={{cursor: 'pointer'}}></i>
                                                                        <i className='fas fa-trash-alt text-danger' style={{cursor: 'pointer'}}></i>
                                                                        
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
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
