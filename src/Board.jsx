import React, { Component } from "react";
import Tile from "./Tile";
import "./Board.css";
import { ranBool, checkBooleans } from "./helper";

class Board extends Component {
  static defaultProps = {
    boardSize: 5,
  };
  constructor(props) {
    super(props);
    this.state = {
      board: Array.from(Array(this.props.boardSize))
        .fill()
        .map((x) =>
          Array.from(Array(this.props.boardSize)).map((x) => ranBool())
        ),
      win: false,
    };
  }

  isWin = (arr) => {
    let checkWin = arr.map((n) => checkBooleans(n)).every((n) => n === true);
    return checkWin;
  };

  tileClick = (e) => {
    //   guard clause: cannot click anywhere, when game state is 'win'
    if (this.state.win === true) return;
    const row = +e.target.dataset.row;
    const column = +e.target.dataset.column;
    const rowAbove = row - 1;
    const rowBelow = row + 1;
    const columnRight = column + 1;
    const columnLeft = column - 1;

    // click position

    this.setState((st) => {
      let isWin;
      // copy of board object
      const newBoard = st.board.map((inner) => inner.slice());

      // clicked tile
      newBoard[row][column] = !st.board[row][column];

      // tile above + below
      if (newBoard[rowAbove])
        newBoard[rowAbove][column] = !st.board[rowAbove][column];
      if (newBoard[rowBelow])
        newBoard[rowBelow][column] = !st.board[rowBelow][column];

      //   tile left + right
      if (typeof newBoard[row][columnRight] !== "undefined")
        newBoard[row][columnRight] = !st.board[row][columnRight];
      if (typeof newBoard[row][columnLeft] !== "undefined")
        newBoard[row][columnLeft] = !st.board[row][columnLeft];

      isWin = this.isWin(newBoard);
      console.log(isWin);

      //   setting new state
      let newState = { board: newBoard, win: isWin };

      return newState;
    });
  };

  gameRestart = () => {
    this.setState({
      board: Array.from(Array(this.props.boardSize))
        .fill()
        .map((x) =>
          Array.from(Array(this.props.boardSize)).map((x) => ranBool())
        ),
      win: false,
    });
  };

  render() {
    console.log(this.state.board);

    const board = this.state.board.map((row, i) => {
      return (
        <tr key={"row_" + i}>
          {row.map((n, j) => {
            return (
              <td key={`${j}/${i}`}>
                <Tile
                  value={n ? "" : "on"}
                  win={this.state.win}
                  row={i}
                  column={j}
                  handleClick={this.tileClick}
                />
              </td>
            );
          })}
        </tr>
      );
    });
    return (
      <div className="Board">
        <h1>{!this.state.win ? "Lights Out!" : "YOU WIN!"}</h1>
        <table>
          <tbody>{board}</tbody>
        </table>
        <button onClick={this.gameRestart}>RESTART!</button>
      </div>
    );
  }
}

export default Board;
