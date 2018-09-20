import React, { Component } from 'react'
import AddLinkModal from './AddLinkModal'
import EditLinkModal from './EditLinkModal'
import { getAllLink, deleteLink } from '../../../api/LinkCrawlApi'

export default class Setting extends Component {
    state = {
        isShownAddLinkModal: false,
        isShownEditLinkModal: false,
        links: [],
        linkSelected: {}
    }

    toggleAddLinkModal() {
        this.setState({isShownAddLinkModal: !this.state.isShownAddLinkModal});
    }

    toggleEditLinkModal() {
        this.setState({isShownEditLinkModal: !this.state.isShownEditLinkModal});
    }

    onCloseEditModal(shouldUpdate) {
        if(shouldUpdate) {
            this.getListLink()
        }
        this.setState({isShownEditLinkModal: false})
    }

    onCloseAddModal(shouldUpdate) {
        if(shouldUpdate) {
            this.getListLink()
        }
        this.setState({isShownAddLinkModal: false})
    }

    getListLink() {
        getAllLink()
        .then(res => {
            if(res.success) {
                this.setState({links: res.data})
            }
        })
    }

    onOpenEditLinkModal(linkSelected) {
        this.setState({isShownEditLinkModal: true, linkSelected})
    }

    componentDidMount() {
        this.getListLink()
    }

    onDeleteLink(id, index) {
        let links = this.state.links
        deleteLink(id)
        .then(res => {
            if(res.success) {
                links.splice(index, 1)
                this.setState({links})
            }
        })
        .catch(err => alert(err))
    }
    
    render() {
      const { isShownAddLinkModal, isShownEditLinkModal, links, linkSelected } = this.state
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
                                    <button className='btn btn-primary' onClick={this.toggleAddLinkModal.bind(this)}>Add link crawl</button>

                                    <AddLinkModal 
                                        isOpen={isShownAddLinkModal} 
                                        toggle={this.toggleAddLinkModal.bind(this)} 
                                        onClose={this.onCloseAddModal.bind(this)}
                                    />
                                    <EditLinkModal isOpen={isShownEditLinkModal} 
                                        toggle={this.toggleEditLinkModal.bind(this)} 
                                        link={linkSelected} 
                                        onClose={this.onCloseEditModal.bind(this)}
                                    />
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
                                                                    <td>
                                                                        <span className='text-primary' 
                                                                            style={{cursor: 'pointer'}} 
                                                                            onClick={this.onOpenEditLinkModal.bind(this, item)}
                                                                        >
                                                                            {item.crawl_link}
                                                                        </span>
                                                                    </td>
                                                                    <td>{item.keyword}</td>
                                                                    <td>{item.type}</td>
                                                                    <td>
                                                                    {
                                                                        item.status ? 
                                                                        <span className="badge badge-success" style={{padding: '5px'}}>Enable</span>
                                                                        :<span className="badge badge-danger" style={{padding: '5px'}}>Disable</span>
                                                                    }
                                                                    </td>
                                                                    <td>{item.num_page_to_crawl}</td>
                                                                    <td className='text-center'>
                                                                        <i className='fas fa-pen text-info mx-2' 
                                                                            style={{cursor: 'pointer'}}
                                                                            onClick={this.onOpenEditLinkModal.bind(this)}>
                                                                        </i>
                                                                        <i className='fas fa-trash-alt text-danger' 
                                                                            style={{cursor: 'pointer'}} 
                                                                            onClick={this.onDeleteLink.bind(this, item._id, item.index)}>
                                                                        </i>
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
