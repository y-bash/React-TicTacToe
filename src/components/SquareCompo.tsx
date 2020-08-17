import React  from "react"
import Square from "../rules/Square"

interface SquareProps {               // コンポーネント・プロパティ
  square  : Square                    // マス目オブジェクト
  onSelect: (index: number) => void   // マス目が選択された際のハンドラ
}

// マス目コンポーネント (マス目 1 個)
const SquareCompo: React.FC<SquareProps> = ({ square, onSelect }) =>
  // render ------------------------------------------------
  <button
    className = {square.bingo ? "square-bingo" : "square"}
    onClick   = {() => onSelect(square.index)            } >

    {square.piece}

  </button>

export default SquareCompo
