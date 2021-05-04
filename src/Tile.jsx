import React, { Component } from "react";
import "./Tile.css";

class Tile extends Component {
  handleClick = (e) => {
    this.props.handleClick(e);
  };

  render() {
    return (
      <div
        className={`Tile ${this.props.value}`}
        onClick={this.handleClick}
        data-row={this.props.row}
        data-column={this.props.column}
      >
        {this.props.value}
      </div>
    );
  }
}

export default Tile;
