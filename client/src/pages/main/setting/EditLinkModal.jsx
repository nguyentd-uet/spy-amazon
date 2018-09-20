import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { putLink } from '../../../api/LinkCrawlApi'

export default class EditLinkModal extends Component {
    state = {
        link: {}
    }

    onChangeInput(event) {
        let link = this.state.link
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if(name === 'crawl_link' && value !== '') {
            const fieldKeywords = new URLSearchParams(value).get('field-keywords')
            const keyword = fieldKeywords.replace('%20', ' ')
            if (keyword) {
                link.keyword = keyword
            }
        }
        link[name] = value

        this.setState({link});
    }

    onClickEditBtn() {
        const { link } = this.state
        if (link.crawl_link !== '') {
            putLink(link._id, {...link})
            .then(res => {
                alert(res.message)
                console.log(res.data)
                this.props.onClose(true)
            })
            .catch(err => alert(err))
        } else {
            alert('Link crawl is required')
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.link !== this.state.link) {
            this.setState({link: nextProps.link})
        }
    }

    render() {
        const { isOpen } = this.props
        const { link } = this.state

        return (
            <Modal isOpen={isOpen} toggle={this.props.toggle} size='lg'>
                <ModalHeader toggle={this.props.toggle}>Add link crawl</ModalHeader>
                <ModalBody>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Link crawl</label>
                        <div className="col-sm-10">
                            <textarea rows={3} 
                                className="form-control" 
                                placeholder="Link crawl"
                                name='crawl_link'
                                value={link.crawl_link}
                                onChange={this.onChangeInput.bind(this)}
                            />
                            <small className="form-text text-muted">
                                Ex: https://www.amazon.com/s/ref=amb_link_483004722_1?ie=UTF8&hidden-keywords=ORCA&field-keywords=school&bbn=12035955011&field-enc-merchantbin=ATVPDKIKX0DER&rh=i%3Afashion-novelty
                            </small>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Keyword</label>
                        <div className="col-sm-10">
                            <input type="text" 
                                className="form-control" 
                                placeholder="Keyword"
                                name='keyword'
                                value={link.keyword}
                                onChange={this.onChangeInput.bind(this)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Type</label>
                        <div className="col-sm-10">
                            <select className="custom-select" name='type' value={link.type} onChange={this.onChangeInput.bind(this)}>
                                <option value="top">Top</option>
                                <option value="newest">Newest</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-10">
                            <select className="custom-select" name='status' value={link.status} onChange={this.onChangeInput.bind(this)}>
                                <option value={true}>Enable</option>
                                <option value={false}>Disable</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Number pages to crawl</label>
                        <div className="col-sm-10">
                            <input type="number" 
                                className="form-control" 
                                placeholder="Number pages to crawl"
                                name='num_page_to_crawl'
                                value={link.num_page_to_crawl}
                                onChange={this.onChangeInput.bind(this)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onClickEditBtn.bind(this)}>Edit link</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
