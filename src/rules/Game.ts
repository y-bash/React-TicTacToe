import History from "./History"

// ゲームクラス
export default class Game {
  // private properties ----------------------------------- // ゲームは
  private _history: History                                 // 単なる履歴のラッパー

  // constructor ------------------------------------------
  constructor(history?: History) {
    if (history === undefined) this._history = new History()
    else                       this._history = history
  }

  // accessors --------------------------------------------
  get board  () { return this._history.currentStep.board  } // 現在の盤面
  get status () { return this._history.currentStep.status } // 現在のステータス
  get history() { return this._history                    } // 履歴

  // public methods ---------------------------------------
  // 以下はいずれも Game オブジェクトを再生成している。
  // React の useState を使って値を更新した後、 React に
  // (更新が認識され)再レンダリングされるようにするため

  putPiece(squareIndex: number): Game {                     // 現在の盤面に駒を配置
    this._history.update(squareIndex)
    return new Game(this._history)
  }

  jumpTo(stepIndex: number):Game {                          // 他のステップへジャンプ
    this._history.current = stepIndex
    return new Game(this._history)
  }
}
