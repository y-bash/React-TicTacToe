import  React    from "react"
import {Cols}    from "../rules/Rules"
import  Board    from "../rules/Board"
import  RowCompo from "./RowCompo"

interface BoardProps {                  // コンポーネント・プロパティ
  board   : Board                       // ・盤面オブジェクト
  onSelect: (index: number) => void     // ・マス目が選択された際のハンドラ
}

// 盤面コンポーネント (行の縦並び)
const BoardCompo: React.FC<BoardProps> = ({ board, onSelect }) =>
  // render -----------------------------------------------------
  <>
    {/* ヘッダ(上端) */}
    <div key ="bd-row-0">
      <button className = "bd-head-org" />

      {/* 列ヘッダの横並び(列数分のループ) */}
      {Cols.names.map( (columnName, i) => (
        <button
          className = "bd-head-top"
          key       ={"bd-col-" + i} >

          {columnName}

        </button>
      ))}

    </div>

    {/* ボディ。行の縦並び(行の数だけループ) */}
    {board.rows.map( (row, i) => (
      <RowCompo
        key      = {"bd-row-" + i + 1}
        row      = {row              }
        onSelect = {onSelect         } />
    ))}

  </>

export default BoardCompo
