import React,{useState} from "react"
import History          from "../rules/History"

interface HistoryProps {             // コンポーネント・プロパティ
  history : History                  // ・履歴オブジェクト
  onSelect: (index: number) => void  // ・(履歴の)ステップが選択された際のハンドラ
}

// 履歴コンポーネント
const HistoryCompo: React.FC<HistoryProps> = ({ history, onSelect }) => {
  // state of react hooks ------------------------------
  const [isAscending, setIsAscending] = useState(true)

  // callback handler ----------------------------------
  const toggleClick = () => setIsAscending(!isAscending) // 昇降トグルのハンドラ

  // pretreatment
  let steps = history.steps
  if (!isAscending) steps = steps.slice().reverse()      // 降順ならリストを逆転

  // render ------------------------------------------
  return (
    <div className="history">

      {/* 履歴ヘッダ */}
      <div className="hs-header">
        <span>History</span>

        {/* 昇降トグルボタン */}
        <button
          className = "hs-order"
          onClick = {toggleClick} >

          {isAscending ? "▼" : "▲"}

        </button>
      </div>

      {/* 履歴ボディ */}
      <div className="hs-body">
        {/* ステップの縦並び(ステップの数だけループ) */}
        {steps.map( step => (
          <button
            className = {(step.index === history.current) ?
                         "step-curr" : "step"      }
            key       = {"hs-" + step.index        }
            onClick   = {() => onSelect(step.index)} >

            {step.desc}

          </button>
        ))}
      </div>

    </div>
  )
}

export default HistoryCompo

