import React, { Component } from 'react'

export default class Loading extends Component {
  render() {
    return (
      <div className='text-center'>
        <i className="fas fa-spinner fa-spin" style={{fontSize: '50px'}}></i>
      </div>
    )
  }
}
