import React, { Component, useState, useEffect} from 'react'
import { getAllProducts, getProductById } from '../../../api/ProductApi'
import './Products.css'
import ProductModal from './ProductModal'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css'
import TagInput from './TagInput'
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import parseDatetime from '../../../helpers/parseDatetime'
const SORT_BY_DEFAULT = 'top'
const RANK_MIN = 1
const RANK_MAX = 1000000

export default function Products(props){
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(SORT_BY_DEFAULT);
  const [total, setTotal] = useState(0);
  const [isShownModal, setIsShownModal] = useState(false);
  const [productInfo, setProductInfo] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [rankMin, setRankMin] = useState(RANK_MIN);
  const [rankMax, setRankMax] = useState(RANK_MAX);
  const [timeout, setTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  // Functions
  const getListProducts = async () => {
    try {
      let res = await getAllProducts(page, sortBy, startDate, endDate, keywords, rankMin, rankMax)
      setProducts(res.data)
      setTotal(res.total);
    } catch (error) {
      console.log(error) 
    }
  }
  const onChangeSortBySelect = (e) => {
    if (e.target.value === 'trend'){
      setEndDate('');
      let currentDate = new Date()
      setStartDate(currentDate.setDate(currentDate.getDate() - 5))
      props.history.push(`/products?sort=${e.target.value}&start=${startDate}&rank-min=${rankMin}&rank-max=${rankMax}`)
    }else {
      setStartDate('')
      setEndDate('')
      props.history.push(`/products?sort=${e.target.value}&rank-min=${rankMin}&rank-max=${rankMax}`)
    }
    const startDateFormat = parseDatetime(startDate)
    const endDateFormat = parseDatetime(endDate)
    setSortBy(e.target.value);
    setStartDate(startDateFormat);
    setEndDate(endDateFormat);
    setPage(1);
    setKeywords([]);
  }

  const onApplyDatePicker = (event, picker) => {
    const startDate = parseDatetime(picker.startDate)
    const endDate = parseDatetime(picker.endDate)
    setStartDate(startDate);
    setEndDate(endDate);
    props.history.push(`/products?sort=${sortBy}&start=${startDate}&end=${endDate}&rank-min=${rankMin}&rank-max=${rankMax}`)
  }

  const onCancelDatePicker = () => {
    setStartDate(''); setEndDate(''); setPage(1);
    props.history.push(`/products?sort=${sortBy}&rank-min=${rankMin}&rank-max=${rankMax}`)
  }

  const renderRankChange = (pct_change, rank) => {
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

  const onClickLoadMoreBtn = async() => {
    const nextPage = page + 1
    setIsLoading(true);
    try {
      let res = await getAllProducts(nextPage, sortBy, startDate, endDate, keywords, rankMin, rankMax)
      const productUpdate = [...products, ...res.data];
      setProducts(productUpdate);
      setPage(nextPage);
      setIsLoading(false);
      setTotal(res.total);
    } catch (error) {
      setIsLoading(false)
    }
  }

  // useEffect here
  useEffect(() => {
    getListProducts();
  }, [rankMax, rankMin, sortBy, startDate, endDate, keywords])

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
                  <select className='form-control' value={sortBy} onChange={onChangeSortBySelect}>
                    <option value="top">Top</option>
                    <option value="newest">Newest</option>
                    <option value="trend">Trend</option>
                  </select>
                </div>
                <div className="col-md-7">
                  <DateRangePicker startDate={startDate || new Date()} endDate={endDate || new Date()} 
                    onApply={onApplyDatePicker} onCancel={onCancelDatePicker}>
                    <button type="button" className='btn btn-default'>Date listed on amazon</button>
                  </DateRangePicker>
                  {startDate !== '' ? ('Start date: ' + startDate) : ''}
                  {endDate !== '' ? (' - End date: ' + endDate) : ''}
                  {
                    startDate !== '' || endDate !== '' ? 
                    <b style={{cursor: 'pointer'}}> {' '}
                      <i className="fas fa-times" onClick={onCancelDatePicker}></i>
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
                  <TagInput keywords={keywords} onChangeKeywords={(keywords) => {setKeywords(keywords); setPage(1)}}  />
                </div>
              </div>
              <div className="form-group row mb-0">
                <label className='col-form-label col-md-2'>Search by rank <br/>({rankMin + ' - ' + rankMax})</label>
                <div className="col-md-10">
                  <Range className='py-3'
                    allowCross={false} 
                    defaultValue={[rankMin, rankMax]} 
                    max={RANK_MAX} 
                    onAfterChange={(value) => {setRankMin(value[0]); setRankMax(value[1])}} 
                  />
                </div>
              </div>
            </div>
            <div className="box-body pt-1">
              <ProductModal isOpen={isShownModal} toggle={() => {setIsShownModal(!isShownModal)}} productInfo={productInfo} />
              <div className="row mx-0">
                {
                  products.length > 0 && products.map((item, index) => {
                    return (
                      <div className="col-lg-2 col-md-3 col-sm-6 col-xs-12 mb-3 p-1" key={item._id} onClick={() => {
                        setProductInfo(item);
                        setIsShownModal(true);
                        props.history.push(`/products/${item._id}`)
                      }}>
                        <div className="card card-effect-2">
                          <div style={{position:'relative'}}>
                            <img className="card-img-top" src={item.thumbnail} alt={item.title}/>
                            <div className="price-overlay">
                              <span className='p-1'>{item.price}</span>
                            </div>
                          </div>
                          
                          <div className="card-body pt-0 px-2 pb-2">
                            {
                              renderRankChange(item.pct_change, item.newest_rank)
                            }
                            {/* <h5 className="card-title">{item.price}</h5> */}
                            <p className="card-title text-primary mb-0">{item.title}</p>
                            <p className='card-text'>
                              ASIN: <b>{item.asin}</b>
                              <br/>
                              <span style={{fontSize: 'small'}}>First time listed {parseDatetime(item.first_time_on_amazon)}</span>
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
                    <button className='btn btn-primary' onClick={onClickLoadMoreBtn} disabled={isLoading}>
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