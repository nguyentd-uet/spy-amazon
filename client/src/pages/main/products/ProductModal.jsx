import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Line} from 'react-chartjs-2';

const data = {
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','January', 'February', 'March', 'April', 'May', 'June', 'July','January', 'February', 'March', 'April', 'May', 'June', 'July','January', 'February', 'March', 'April', 'May', 'June', 'July'],
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

  
export default class ProductModal extends Component {
    state = {
        productRanks: [],
        productInfo: {}
    }

    parseDatetime(date) {
        const formatDate = new Date(date);
        let dd = formatDate.getDate();
        let mm = formatDate.getMonth()+1; //January is 0!

        let yy = formatDate.getFullYear().toString().substr(-2);
        if(dd < 10){
            dd = '0' + dd;
        } 
        if(mm < 10){
            mm = '0' + mm;
        } 
        return mm + '/' + dd + '/' + yy;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.productInfo && nextProps.productInfo !== this.state.productInfo) {
            let productRanks = {...data}
            if(nextProps.productInfo.rank_history && nextProps.productInfo.rank_history.length > 0) {
                const rank_history = nextProps.productInfo.rank_history
                productRanks.labels = []
                productRanks.datasets[0].data = []
                rank_history.map(item => {
                    const keyValue = Object.entries(item)[0]
                    const formatedDate = this.parseDatetime(parseInt(keyValue[0], 10))
                    productRanks.labels.push(formatedDate)
                    productRanks.datasets[0].data.push(keyValue[1])
                })
            }
            this.setState({productInfo: nextProps.productInfo, productRanks})
        }
    }

    render() {
        const { isOpen, productInfo } = this.props
        const { productRanks } = this.state

        return (
            <Modal isOpen={isOpen} toggle={this.props.toggle} size='lg'>
                <ModalHeader toggle={this.props.toggle}>Product information</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card">
                                <img className="card-img-top" src={productInfo.thumbnail} alt={productInfo.title}/>
                                {/* <div className="card-body">
                                    <h5 className="card-title">{productInfo.price}</h5>
                                    <p className="card-text">{productInfo.title}
                                    <br/>
                                    <b>Rank: {productInfo.newest_rank}</b>
                                    </p>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <Line data={productRanks} />
                            <p className='text-center'>Date format mm/dd/yy</p>
                        </div>
                    </div>
                    <div className="p-2">
                        <span><b>Brand: </b>{productInfo.brand}</span><br/>
                        <span><b>Title: </b>{productInfo.title}</span><br/>
                        <span><b>ASIN: </b>{productInfo.asin}</span><br/>
                        <span><b>Price: </b>{productInfo.price}</span><br/>
                        <span><b>Link: </b><a href={productInfo.product_link} target='_blank'>{productInfo.product_link}</a></span><br/>
                        <span><b>Rank: </b>{productInfo.newest_rank}</span><br/>
                        <span><b>Keyword: </b>
                            {
                                productInfo.keywords && productInfo.keywords.map((item, index) => {
                                    if (index === productInfo.keywords.length - 1) {
                                        return item
                                    }
                                    return item + ', '
                                })
                            }
                        </span><br/>
                        {
                            productInfo.bullet1 ?
                            <div><span><b>Bullet 1: </b>{productInfo.bullet1}</span><br/></div>
                            : null
                        }
                        {
                            productInfo.bullet2 ?
                            <div><span><b>Bullet 2: </b>{productInfo.bullet2}</span><br/></div>
                            : null
                        }
                        
                        <span><b>First time listed on amazon: </b>{productInfo.first_time_on_amazon}</span><br/>
                        <span><b>Last crawl time: </b>{productInfo.last_crawl_time}</span>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.props.toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
