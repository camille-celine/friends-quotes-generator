import React, { Component } from "react";
import "./Quote.css";

class Quote extends Component {
  getColor() {
    if (this.props.votes >= 15) {
      return "#4CAF50";
    } else if (this.props.votes >= 12) {
      return "#8BC34A";
    } else if (this.props.votes >= 9) {
      return "#CDDC39";
    } else if (this.props.votes >= 6) {
      return "#FFEB3B";
    } else if (this.props.votes >= 3) {
      return "#FFC107";
    } else if (this.props.votes >= 0) {
      return "#FF9800";
    } else {
      return "#f44336";
    }
  }
  getEmoji() {
    if (this.props.votes >= 15) {
      return "em em-heart";
    } else if (this.props.votes >= 11) {
      return "em em-smiling_face_with_3_hearts";
    } else if (this.props.votes >= 7) {
      return "em em-smiley";
    } else if (this.props.votes >= 4) {
      return "em em-slightly_smiling_face";
    } else if (this.props.votes >= 0) {
      return "em em-neutral_face";
    } else if (this.props.votes >= -4) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  }
  render() {
    return (
      <div className='Quote'>
        <div className='Quote-buttons'>
          <i className='fas fa-arrow-up' onClick={this.props.upvote} />
          <span className='Quote-votes' style={{ borderColor: this.getColor() }}>
            {this.props.votes}
          </span>
          <i className='fas fa-arrow-down' onClick={this.props.downvote} />
        </div>
        <div className='Quote-text'>{this.props.text}</div>
        <div className='Quote-smiley'>
          <i className={this.getEmoji()} />
        </div>
      </div>
    );
  }
}
export default Quote;
