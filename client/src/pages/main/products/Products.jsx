import React, { Component } from 'react'
import { getAllProducts, getProductById } from '../../../api/ProductApi'
import './Products.css'
import ProductModal from './ProductModal'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css'
import TagInput from './TagInput'
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const SORT_BY_DEFAULT = 'top'
const RANK_MIN = 1
const RANK_MAX = 1000000

export default class Products extends Component {
  state = {
    products: [],
    page: 1,
    sortBy: SORT_BY_DEFAULT,
    total: 0,
    isShownModal: false,
    productInfo: {},
    startDate: '',
    endDate: '',
    keywords: [],
    rank_min: RANK_MIN,
    rank_max: RANK_MAX,
    timeout: null,
    isLoading: false
  }

  toggleModal() {
    if(this.state.isShownModal) {
      this.props.history.goBack()
    }
    this.setState({isShownModal: !this.state.isShownModal});
  }

  getListProducts(page, sortBy = this.state.sortBy, startDate = this.state.startDate, endDate = this.state.endDate, 
    keywords = this.state.keywords, rank_min = this.state.rank_min, rank_max = this.state.rank_max) {
    getAllProducts(page, sortBy, startDate, endDate, keywords, rank_min, rank_max)
    .then(res => {
      if(res.success) {
        this.setState({products: res.data, total: res.total})
      }
    })
  }

  onChangeSortBySelect(e) {
    let startDate, endDate
    const { rank_min, rank_max} = this.state
    if (e.target.value === 'trend') {
      endDate = ''
      let currentDate = new Date()
      startDate = currentDate.setDate(currentDate.getDate() - 5)
      this.props.history.push(`/products?sort=${e.target.value}&start=${startDate}&rank-min=${rank_min}&rank-max=${rank_max}`)
    } else {
      startDate = ''
      endDate = ''
      this.props.history.push(`/products?sort=${e.target.value}&rank-min=${rank_min}&rank-max=${rank_max}`)
    }

    const startDateFormat = this.parseDatetime(startDate)
    const endDateFormat = this.parseDatetime(endDate)
    this.setState({
      sortBy: e.target.value, 
      startDate: startDateFormat, 
      endDate: endDateFormat, 
      page: 1, 
      keywords: []
    })
    this.getListProducts(1, e.target.value, startDate, endDate, [], rank_min, rank_max)
  }

  onSelectProduct(selectedProduct) {
    this.setState({productInfo: selectedProduct, isShownModal: true})
    this.props.history.push(`/products/${selectedProduct._id}`)
  }

  onApplyDatePicker(event, picker) {
    const {rank_min, rank_max, sortBy} = this.state
    const startDate = this.parseDatetime(picker.startDate)
    const endDate = this.parseDatetime(picker.endDate)
    this.setState({startDate: startDate, endDate: endDate})
    this.getListProducts(1, this.state.sortBy, startDate, endDate)
    this.props.history.push(`/products?sort=${sortBy}&start=${startDate}&end=${endDate}&rank-min=${rank_min}&rank-max=${rank_max}`)
  }

  onCancelDatePicker() {
    const {rank_min, rank_max, sortBy} = this.state
    this.setState({startDate: '', endDate: '', page: 1})
    this.getListProducts(1, this.state.sortBy, '', '')
    this.props.history.push(`/products?sort=${sortBy}&rank-min=${rank_min}&rank-max=${rank_max}`)
  }

  componentDidMount() {
    const { location } = this.props
    const query = new URLSearchParams(location.search)
    let sortBy = SORT_BY_DEFAULT
    if(query.get('sort')) {
      sortBy = query.get('sort')
    }

    let startDate = ''
    if (query.get('start') && !isNaN(parseInt(query.get('start'), 10))) {
      startDate = this.parseDatetime(parseInt(query.get('start'), 10))
    }

    let endDate = ''
    if (query.get('end') && !isNaN(parseInt(query.get('end'), 10))) {
      endDate = this.parseDatetime(parseInt(query.get('end'), 10))
    }

    let rank_min = RANK_MIN
    if (query.get('rank-min')) {
      rank_min = parseInt(query.get('rank-min'), 10)
    }

    let rank_max = RANK_MAX
    if (query.get('rank-max')) {
      rank_max = parseInt(query.get('rank-max'), 10)
    }

    const productId = location.pathname.split('/')[2]
    if(productId) {
      getProductById(productId)
      .then(res => {
        this.setState({isShownModal: true, productInfo: res.data})
      })
    } else {
      this.setState({sortBy, startDate, endDate, rank_min, rank_max})
      this.getListProducts(1, sortBy, startDate, endDate, this.state.keywords, rank_min, rank_max)
    }
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
    try {
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
      return mm + '-' + dd + '-' + yyyy;
    } catch (error) {
      return ''
    }
    
  }

  onChangeKeywords(keywords) {
    const { sortBy, startDate, endDate, rank_min, rank_max } = this.state
    this.setState({keywords})
    this.getListProducts(1, sortBy, startDate, endDate, keywords, rank_min, rank_max)
  }

  onClickLoadMoreBtn() {
    const { page, sortBy, startDate, endDate, keywords, products, rank_min, rank_max } = this.state
    const nextPage = page + 1
    this.setState({isLoading: true})
    getAllProducts(nextPage, sortBy, startDate, endDate, keywords, rank_min, rank_max)
    .then(res => {
      if(res.success) {
        const productUpdate = [...products, ...res.data]
        this.setState({products: productUpdate, page: nextPage, isLoading: false, total: res.total})
      } else {
        this.setState({isLoading: false})
      }
    })
    .catch(err => {
      alert(err)
      this.setState({isLoading: false})
    })
  }

  onChangeSlider(value) {
    let {sortBy, startDate, endDate, keywords, timeout} = this.state
    const rank_min = value[0]
    const rank_max = value[1]
    this.setState({rank_min, rank_max})
    this.props.history.push(`/products?sort=${sortBy}&start=${startDate}&end=${endDate}&rank-min=${rank_min}&rank-max=${rank_max}`)
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      this.getListProducts(1, sortBy, startDate, endDate, keywords, rank_min, rank_max)
    }, 2000)
    this.setState({timeout})
  }

  render() {
    const { 
      products, 
      sortBy, 
      total, 
      isShownModal, 
      productInfo, 
      startDate, 
      endDate, 
      keywords, 
      rank_min, 
      rank_max,
      isLoading
    } = this.state

    const currentDate = new Date()
    return (
      <div className='products-page'>
        <section className="content-header mt-0">
          <h1>Products</h1>
          <ol className="breadcrumb">
            <li><a href={null}><i className="fas fa-tachometer-alt"></i> Home</a></li>
            <li className="active">Products</li>
          </ol>
        </section>
        <section className="content-header">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header with-border pb-0">
                  <div className="form-group row mb-2">
                    <label className='col-form-label col-md-1'>Sort by</label>
                    <div className="col-md-2">
                      <select className='form-control' value={sortBy} onChange={this.onChangeSortBySelect.bind(this)}>
                        <option value="top">Top</option>
                        <option value="newest">Newest</option>
                        <option value="trend">Trend</option>
                      </select>
                    </div>
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
                      <b className='float-right'>{products.length + '/' + total} products</b>
                    </div>
                  </div>
                  <div className="form-group row mb-0">
                    <label className='col-form-label col-md-2'>Search by keyword</label>
                    <div className="col-md-10">
                      <TagInput keywords={keywords} onChangeKeywords={this.onChangeKeywords.bind(this)}  />
                    </div>
                  </div>
                  <div className="form-group row mb-0">
                    <label className='col-form-label col-md-2'>Search by rank <br/>({rank_min + ' - ' + rank_max})</label>
                    <div className="col-md-10">
                      <Range className='py-3 mx-2' 
                        allowCross={false} 
                        defaultValue={[rank_min, rank_max]} 
                        max={RANK_MAX} 
                        onChange={this.onChangeSlider.bind(this)} 
                      />
                    </div>
                  </div>
                </div>
                <div className="box-body pt-1">
                  <ProductModal isOpen={isShownModal} toggle={this.toggleModal.bind(this)} productInfo={productInfo} />
                  <div className="row mx-0">
                    {
                      products.length > 0 && products.map((item, index) => {
                        return (
                          <div className="col-lg-2 col-md-3 col-sm-6 col-xs-12 mb-3 p-1" key={item._id} onClick={this.onSelectProduct.bind(this, item)}>
                            <div className="card card-effect-2">
                              <div style={{position:'relative'}}>
                                <img className="card-img-top" src={item.thumbnail} alt={item.title}/>
                                <div className="price-overlay">
                                  <span className='p-1'>{item.price}</span>
                                </div>
                              </div>
                              
                              <div className="card-body pt-0 px-2 pb-2">
                                {
                                  this.renderRankChange(item.pct_change, item.newest_rank)
                                }
                                {/* <h5 className="card-title">{item.price}</h5> */}
                                <p className="card-title text-primary mb-0">{item.title}</p>
                                <p className='card-text'>
                                  ASIN: <b>{item.asin}</b>
                                  <br/>
                                  <span style={{fontSize: 'small'}}>First time listed {this.parseDatetime(item.first_time_on_amazon)}</span>
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
