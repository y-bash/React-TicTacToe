import React from "react"

interface StatusProps {     // コンポーネント・プロパティ
  status : string           // 次の番手、勝者、引き分けなどの情報
}

// ステータスコンポーネント
const StatusCompo: React.FC<StatusProps> = ({ status }) =>
  // render ------------------------------
  <div className="status">
    {status}
  </div>

export default StatusCompo

