import React, { Component } from 'react'
import './card.css'

export default class Card extends Component {
  render() {
    return (
      <div className="Card">
        <div className="Card-header">
          {this.props.header}
        </div>
        <div className="Card-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}
