import React, { Component, useState, useEffect, useCallback} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import parseDatetime from '../../../helpers/parseDatetime'

const data = {
  datasets: [
    {
      label: 'Rank of product',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      // data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export default function ProductModal(props){
    const[productRanks, setProductRanks] = useState([]);
    const[productInfo, setProductInfo] = useState({})
    // functions

    useEffect(() => {
      console.log('aaa');
      let productRanks = { ...data }
      const rankHistory = props.productInfo.rank_history || [];
      productRanks.labels = []
      productRanks.datasets[0].data = []
      // You should use [for of] instead forEach to iterators 
      // You can google search difference between [for of] and forEach
      for(let item of rankHistory){
        const keyValue = Object.entries(item)[0]
        const formatedDate = parseDatetime(parseInt(keyValue[0], 10))
        productRanks.labels.push(formatedDate)
        productRanks.datasets[0].data.push(keyValue[1])
      }
      setProductInfo(props.productInfo);
      setProductRanks(productRanks)
    },[props.productInfo])

    return (
      <Modal isOpen={props.isOpen} toggle={props.toggle} size='lg'>
        <ModalHeader toggle={props.toggle}>Product information</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-lg-4">
              <div className="card">
                <img className="card-img-top" src={productInfo.thumbnail} alt={productInfo.title} />
              </div>
            </div>
            <div className="col-lg-8">
              <Line data={productRanks} />
              <p className='text-center'>Date format mm/dd/yy</p>
            </div>
          </div>
          <div className="p-2">
            <span><b>Brand: </b>{productInfo.brand}</span><br />
            <span><b>Title: </b>{productInfo.title}</span><br />
            <span><b>ASIN: </b>{productInfo.asin}</span><br />
            <span><b>Price: </b>{productInfo.price}</span><br />
            <span><b>Link: </b><a href={productInfo.product_link} target='_blank'>{productInfo.product_link}</a></span><br />
            <span><b>Rank: </b>{productInfo.newest_rank}</span><br />
            <span><b>Keyword: </b>
              {
                productInfo.keywords && productInfo.keywords.map((item, index) => {
                  if (index === productInfo.keywords.length - 1) {
                    return item
                  }
                  return item + ', '
                })
              }
            </span><br />
            {
              productInfo.bullet1 ?
                <div><span><b>Bullet 1: </b>{productInfo.bullet1}</span><br /></div>
                : null
            }
            {
              productInfo.bullet2 ?
                <div><span><b>Bullet 2: </b>{productInfo.bullet2}</span><br /></div>
                : null
            }
            <span><b>First time listed on amazon: </b>{productInfo.first_time_on_amazon}</span><br />
            <span><b>Last crawl time: </b>{productInfo.last_crawl_time}</span>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggle}>Close</Button>
        </ModalFooter>
      </Modal>      
    )
}
