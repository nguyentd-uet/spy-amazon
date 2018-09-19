import React, { Component } from 'react'
import { getAllProducts } from '../../../api/ProductApi'
import './Products.css'
import ProductModal from './ProductModal'
// import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css'

export default class Products extends Component {
  state = {
    products: [],
    page: 1,
    sortBy: 'top',
    total: 0,
    isShownModal: false,
    productInfo: {},
    startDate: undefined,
    endDate: undefined
  }

  toggleModal() {
    this.setState({isShownModal: !this.state.isShownModal});
  }

  onChangeSortBySelect(e) {
    this.setState({sortBy: e.target.value});
    getAllProducts(1, e.target.value)
    .then(res => {
      console.log(res)
      if(res.success) {
        this.setState({products: res.data, total: res.total})
      }
    })
  }

  onSelectProduct(selectedProduct) {
    this.setState({productInfo: selectedProduct, isShownModal: true})
  }

  handleEvent(event, picker) {
    console.log(picker.startDate);
    this.setState({startDate: picker.startDate, endDate: picker.endDate})
  }

  componentDidMount() {
    const { page, sortBy } = this.state
    getAllProducts(page, sortBy)
    .then(res => {
      console.log(res)
      if(res.success) {
        this.setState({products: res.data, total: res.total})
      }
    })
  }

  render() {
    const { products, sortBy, page, total, isShownModal, productInfo, startDate, endDate } = this.state

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
                  <div className="form-group row mx-0">
                    <h3 className='col-md-2 box-title'>Total: {total}</h3>

                    <DateRangePicker startDate={startDate} endDate={endDate} onEvent={this.handleEvent.bind(this)}>
                      <input className='form-control' value={startDate + ' - '  + endDate} />
                    </DateRangePicker>
                    <label className='col-form-label col-md-1 offset-md-3'>Sort by</label>
                    <select className='form-control col-md-2' value={sortBy} onChange={this.onChangeSortBySelect.bind(this)}>
                      <option value="top">Top</option>
                      <option value="newest">Newest</option>
                    </select>
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
                              <div className="card-body">
                                <h5 className="card-title">{item.price}</h5>
                                <p className="card-text">{item.title}
                                <br/>
                                <b>Rank: {item.newest_rank}</b>
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
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
