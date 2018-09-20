import React, { Component } from 'react'
import { getAllProducts } from '../../../api/ProductApi'
import './Products.css'
import ProductModal from './ProductModal'
// import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css'
import TagInput from './TagInput'

export default class Products extends Component {
  state = {
    products: [],
    page: 1,
    sortBy: 'top',
    total: 0,
    isShownModal: false,
    productInfo: {},
    startDate: '',
    endDate: '',
    keywords: [],
    isLoading: false
  }

  toggleModal() {
    this.setState({isShownModal: !this.state.isShownModal});
  }

  getListProducts(page, sortBy = this.state.sortBy, startDate = this.state.startDate, endDate = this.state.endDate, keywords = this.state.keywords) {
    getAllProducts(page, sortBy, startDate, endDate, keywords)
    .then(res => {
      if(res.success) {
        this.setState({products: res.data, total: res.total})
      }
    })
  }

  onChangeSortBySelect(e) {
    let startDate, endDate
    if (e.target.value === 'trend') {
      endDate = ''
      let currentDate = new Date()
      startDate = currentDate.setDate(currentDate.getDate() - 5)
    } else {
      startDate = ''
      endDate = ''
    }
    const startDateFormat = this.parseDatetime(startDate)
    const endDateFormat = this.parseDatetime(endDate)
    this.setState({sortBy: e.target.value, startDate: startDateFormat, endDate: endDateFormat})
    this.getListProducts(1, e.target.value, startDate, endDate)
  }

  onSelectProduct(selectedProduct) {
    this.setState({productInfo: selectedProduct, isShownModal: true})
  }

  onApplyDatePicker(event, picker) {
    const startDate = this.parseDatetime(picker.startDate)
    const endDate = this.parseDatetime(picker.endDate)
    this.setState({startDate: startDate, endDate: endDate})
    this.getListProducts(1, this.state.sortBy, startDate, endDate)
  }

  onCancelDatePicker() {
    this.setState({startDate: '', endDate: ''})
    this.getListProducts(1, this.state.sortBy, '', '')
  }

  componentDidMount() {
    this.getListProducts(1)
  }

  renderRankChange(pct_change, rank) {
    if (pct_change > 0) {
      return (
        <p className='text-danger mb-0'>
          <i className="fas fa-sort-down"></i> <b>{rank + ' '}</b>
          <span className="badge badge-danger">{pct_change + '%'}</span>
        </p>
      )
    } else if(pct_change < 0) {
      return (
        <p className='text-success mb-0'>
          <i className="fas fa-sort-up"></i> <b>{rank + ' '}</b>
          <span className="badge badge-success">{(-pct_change) + '%'}</span>
        </p>
      )
    } else {
      return <p className='mb-0'><b>{rank}</b></p>
    }
  }

  parseDatetime(date) {
    if(date === '') return '';
    const formatDate = new Date(date);
    let dd = formatDate.getDate();
    let mm = formatDate.getMonth()+1; //January is 0!

    let yyyy = formatDate.getFullYear();
    if(dd < 10){
        dd = '0' + dd;
    } 
    if(mm < 10){
        mm = '0' + mm;
    } 
    return mm + '/' + dd + '/' + yyyy;
  }

  onChangeKeywords(keywords) {
    const { sortBy, startDate, endDate } = this.state
    this.setState({keywords})
    this.getListProducts(1, sortBy, startDate, endDate, keywords)
  }

  onClickLoadMoreBtn() {
    const { page, sortBy, startDate, endDate, keywords, products } = this.state
    const nextPage = page + 1
    this.setState({isLoading: true})
    getAllProducts(nextPage, sortBy, startDate, endDate, keywords)
    .then(res => {
      if(res.success) {
        const productUpdate = [...products, ...res.data]
        this.setState({products: productUpdate, page: nextPage, isLoading: false})
      } else {
        this.setState({isLoading: false})
      }
    })
    .catch(err => {
      alert(err)
      this.setState({isLoading: false})
    })
  }

  render() {
    const { products, sortBy, page, total, isShownModal, productInfo, startDate, endDate, keywords, isLoading } = this.state

    const currentDate = new Date()
    return (
      <div>
        <section className="content-header mt-0">
          <h1>Products</h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fas fa-tachometer-alt"></i> Home</a></li>
            <li className="active">Products</li>
          </ol>
        </section>
        <section className="content-header">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header with-border">
                  <div className="form-group row mb-0">
                    <label className='col-form-label col-md-1'>Sort by</label>
                    <select className='form-control col-md-2' value={sortBy} onChange={this.onChangeSortBySelect.bind(this)}>
                      <option value="top">Top</option>
                      <option value="newest">Newest</option>
                      <option value="trend">Trend</option>
                    </select>
                    <div className="col-md-7">
                      <DateRangePicker startDate={startDate || currentDate} endDate={endDate || currentDate} 
                        onApply={this.onApplyDatePicker.bind(this)} onCancel={this.onCancelDatePicker.bind(this)}>
                        <button type="button" className='btn btn-default'>Date listed on amazon</button>
                      </DateRangePicker>
                      {startDate !== '' ? ('Start date: ' + startDate) : ''}
                      {endDate !== '' ? (' - End date: ' + endDate) : ''}
                      {
                        startDate !== '' || endDate !== '' ? 
                        <b style={{cursor: 'pointer'}}> {' '}
                          <i className="fas fa-times" onClick={this.onCancelDatePicker.bind(this)}></i>
                        </b>
                        : null
                      }
                    </div>
                    <div className='col-md-2'>
                      <b className='float-right'>{total} products</b>
                    </div>
                  </div>
                  <div className="form-group row mb-0">
                    <label className='col-form-label col-md-2'>Search by keyword</label>
                    <div className="col-md-12">
                      <TagInput keywords={keywords} onChangeKeywords={this.onChangeKeywords.bind(this)}  />
                    </div>
                  </div>
                </div>
                <div className="box-body">
                  <ProductModal isOpen={isShownModal} toggle={this.toggleModal.bind(this)} productInfo={productInfo} />
                  <div className="row">
                    {
                      products.length > 0 && products.map((item, index) => {
                        return (
                          <div className="col-md-2 mb-3" key={item._id} onClick={this.onSelectProduct.bind(this, item)}>
                            <div className="card card-effect-2">
                              <img className="card-img-top" src={item.thumbnail} alt={item.title}/>
                              <div className="card-img-overlay p-0">
                                <b>{item.price}</b>
                              </div>
                              <div className="card-body pt-0">
                                {
                                  this.renderRankChange(item.pct_change, item.newest_rank)
                                }
                                {/* <h5 className="card-title">{item.price}</h5> */}
                                <p className="card-title text-primary mb-0">{item.title}</p>
                                <p className='card-text'>
                                  ASIN: <b>{item.asin}</b>
                                  <br/>
                                  {this.parseDatetime(item.first_time_on_amazon)}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="row">
                    <div className="col-md-12 text-center">
                      {
                        products.length < total ?
                        <button className='btn btn-primary' onClick={this.onClickLoadMoreBtn.bind(this)} disabled={isLoading}>
                          {
                            isLoading ?
                            <i className="fas fa-spinner fa-spin"></i>
                            : null
                          } Load more
                        </button>
                        : null
                      }
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