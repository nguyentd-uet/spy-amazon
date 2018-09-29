import React, { Component } from 'react'

export default class TagInput extends Component {
  state = {
    input: ''
  }

  handleInputChange(evt) {
    this.setState({ input: evt.target.value });
  }

  handleInputKeyDown(evt) {
    let keywords = [...this.props.keywords]
    if (evt.keyCode === 13) {
      const { value } = evt.target;

      if(value === '') {
        return;
      }
      keywords.push(value.trim())
      this.setState({input: ''});
      this.props.onChangeKeywords(keywords)
    }

    if (keywords.length && evt.keyCode === 8 && !this.state.input.length) {
      keywords.slice(0, keywords.length - 1)
      this.props.onChangeKeywords(keywords)
    }

    
  }

  handleRemoveItem(index) {
    let keywords = [...this.props.keywords]
    keywords.splice(index, 1)

    this.props.onChangeKeywords(keywords)
  }

  render() {
    const styles = {
      container: {
        border: '1px solid #ddd',
        padding: '5px',
        borderRadius: '5px',
        marginBottom: '0'
      },

      items: {
        display: 'inline-block',
        padding: '2px',
        border: '1px solid #28a745',
        // fontFamily: 'Helvetica, sans-serif',
        borderRadius: '2px',
        marginRight: '5px',
        cursor: 'pointer',
        color: 'white',
        backgroundColor: '#28a745'
      },

      input: {
        outline: 'none',
        border: 'none'
      }
    };
    return (
      <div>
        <label>
          <ul style={styles.container}>
            {
              this.props.keywords.map((item, i) => {
                return (
                  <li key={i} style={styles.items} onClick={this.handleRemoveItem.bind(this, i)}>
                    {item + ' '}
                    <span><b><i className='fas fa-times'></i></b></span>
                  </li>
                )
              })
            }
            <input
              placeholder='Enter keyword'
              style={styles.input}
              value={this.state.input}
              onChange={this.handleInputChange.bind(this)}
              onKeyDown={this.handleInputKeyDown.bind(this)} />
          </ul>
        </label>
      </div>
    )
  }
}
