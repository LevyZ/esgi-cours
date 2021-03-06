import React, { useContext } from "react";
import Board from "../Board";
import useBoards from "../../hooks/useBoards";
import useUI from "../../hooks/useUI";
import { useHistory } from "react-router";

const BoardList = ({}) => {
  const { selectors: boardsSelectors } = useBoards();
  const { selectors: UISelectors, actions: UIActions } = useUI();
  const history = useHistory();

  const boards = boardsSelectors.getBoards();
  const selectedBoard = UISelectors.getSelectedBoard();

  return (
    <>
      <button onClick={() => history.push("/login", {
        displayNav: false
      })}>Go to login</button>

      {UISelectors.getMessage() && <span>{UISelectors.getMessage()}</span>}
      <nav style={{ display: "flex", justifyContent: "space-around" }}>
        {boards.map((board) => (
          <span key={board.id} onClick={() => UIActions.selectBoard(board)}>
            {board.name}
          </span>
        ))}
      </nav>
      {Boolean(selectedBoard) && <Board board={selectedBoard} />}
      {!Boolean(selectedBoard) && <h1>No board selected</h1>}
    </>
  );
};

export default BoardList;
