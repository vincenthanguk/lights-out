import React, { Component } from "react";
import Tile from "./Tile";
import "./Board.css";

class Board extends Component {
  static defaultProps = {
    intToRow: ["row1", "row2", "row3", "row4", "row5"],
  };
  constructor(props) {
    super(props);
    this.state = {
      board: {
        //   booleans for the activated/deactivated tiles
        row1: [false, false, false, false, false],
        row2: [false, false, false, false, false],
        row3: [false, false, false, false, false],
        row4: [false, false, false, false, false],
        row5: [false, false, false, false, false],
      },
    };
  }

  tileClick = (e) => {
    const row = "row" + e.target.dataset.row;
    const rowAbove = "row" + (e.target.dataset.row - 1);
    const rowBelow = "row" + (+e.target.dataset.row + 1);
    const column = +e.target.dataset.column;
    // click position
    let rowIndex;

    this.setState((st) => {
      // copy of board object
      const newBoard = { ...st.board };

      //   copy of row that was clicked
      newBoard[row] = newBoard[row].map((tile, i) => {
        //   map does not work for [i-1] (why?) -> workaround
        if (i === column - 1) {
          tile = !tile;
        }
        if (i === column) {
          tile = !tile;
          newBoard[row][i + 1] = !newBoard[row][i + 1];

          //   setting rowIndex to determine row below and above
          rowIndex = i;
        }
        return tile;
      });

      // changing row above (if it exists)
      if (newBoard[rowAbove]) {
        newBoard[rowAbove] = newBoard[rowAbove].map((tile, i) => {
          if (i === rowIndex) {
            tile = !tile;
          }
          return tile;
        });
      }

      // changing row below (if it exists)
      if (newBoard[rowBelow]) {
        newBoard[rowBelow] = newBoard[rowBelow].map((tile, i) => {
          if (i === rowIndex) {
            tile = !tile;
          }
          return tile;
        });
      }

      //   setting new state
      let newState = { board: newBoard };

      return newState;
    });
  };

  render() {
    return (
      <div className="Board">
        <h1>Lights Out!</h1>
        <table>
          <tbody>
            {/* tr should be set dynamically */}
            <tr>
              {this.state.board.row1.map((n, i) => {
                return (
                  <td key={`0/${i}`}>
                    <Tile
                      value={n ? "on" : ""}
                      row={1}
                      column={i}
                      handleClick={this.tileClick}
                    />
                  </td>
                );
              })}
            </tr>
            <tr>
              {this.state.board.row2.map((n, i) => {
                return (
                  <td key={`1/${i}`}>
                    <Tile
                      value={n ? "on" : ""}
                      row={2}
                      column={i}
                      handleClick={this.tileClick}
                    />
                  </td>
                );
              })}
            </tr>
            <tr>
              {this.state.board.row3.map((n, i) => {
                return (
                  <td key={`2/${i}`}>
                    <Tile
                      value={n ? "on" : ""}
                      row={3}
                      column={i}
                      handleClick={this.tileClick}
                    />
                  </td>
                );
              })}
            </tr>
            <tr>
              {this.state.board.row4.map((n, i) => {
                return (
                  <td key={`3/${i}`}>
                    <Tile
                      value={n ? "on" : ""}
                      row={4}
                      column={i}
                      handleClick={this.tileClick}
                    />
                  </td>
                );
              })}
            </tr>
            <tr>
              {this.state.board.row5.map((n, i) => {
                return (
                  <td key={`4/${i}`}>
                    <Tile
                      value={n ? "on" : ""}
                      row={5}
                      column={i}
                      handleClick={this.tileClick}
                    />
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
