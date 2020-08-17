import  React, {useState} from "react"
import  Game              from "../rules/Game"
import  BoardCompo        from "./BoardCompo"
import  StatusCompo       from "./StatusCompo"
import  HistoryCompo      from "./HistoryCompo"

// ゲームコンポーネント
const GameCompo: React.FC = () => {
  // state of react hooks ----------------------------
  const [game, setGame] = useState( () => new Game() )

  // callback handler --------------------------------
  const putPiece =(square: number): void =>            // マス目に駒が置かれた
    setGame( game.putPiece(square) )

  const jumpTo   = (step  : number): void =>           // ステップが選択された
    setGame( game.jumpTo(step) )

  // render ------------------------------------------
  return (
    <>
      <div className="title">
        Tic-tac-toe
      </div>

      <div className="game">
        <div>
          {/* 盤面 */}
          <BoardCompo
            board    = {game.board  }
            onSelect = {putPiece    } />

          {/* ステータス */}
          <StatusCompo
            status   = {game.status } />

        </div>

        {/* 履歴 */}
        <HistoryCompo
          history    = {game.history}
          onSelect   = {jumpTo      } />

      </div>
    </>
  )
}

export default GameCompo

