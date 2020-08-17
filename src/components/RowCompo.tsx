import React       from "react"
import Row         from "../rules/Row"
import SquareCompo from "./SquareCompo"

interface RowProps {                  // コンポーネント・プロパティ
  row     : Row                       // ・(盤面の)行オブジェクト
  onSelect: (index: number) => void   // ・マス目が選択された際のハンドラ
}

// (盤面の)行コンポーネント (マス目の横並び)
const RowCompo: React.FC<RowProps> = ({ row, onSelect }) =>
  // render -----------------------------------------------
  <div>
    {/* 行ヘッダ(左端) */}
    <button
      className = "bd-head-left"
      key       ={"bd-head-left-" + row.name} >

      {row.name}

    </button>

    {/* 行ボディ(横一列のマス目の数だけループ) */}
    {row.squares.map( (square, i) =>
      <SquareCompo
        key      = {"square" + i}
        square   = {square      }
        onSelect = {onSelect    } />
    )}

  </div>

export default RowCompo
