import  Board                from "./Board"
import {Players, Cols, Rows} from "./Rules"

// (履歴の)ステップクラス
export default class Step {
  // static methods -------------------------------------
  static makeFirst(): Step {                              // 最初のステップを作る
    return new Step( 0, "#0 Start", new Board() )
  }

  // constructor & private properties -------------------
  constructor(                                            // ステップは
    private _index: number,                               // ・インデックス
    private _desc : string,                               // ・説明文
    private _board: Board                                 // ・盤面
  ) {}                                                    // で構成される

  // accessors ------------------------------------------
  get board   () { return this._board }
  get index   () { return this._index }
  get desc    () { return this._desc  }

  get status(): string {                                  // このステップの
    if (this._board.bingo)                                // ステータスメッセージを返す
      return "Winner: " + this._board.winner
    else if (this._board.filled)
      return "Draw!"
    else
      return "Next player: " + Players.byStep(this._index + 1)
  }

  // public methods -------------------------------------
  // このステップの盤面に次の駒を置いて新たなステップを作る
  makeNext(squareIndex: number): Step | undefined {
    if (this._board.filled ||                             // 既に盤面が埋まっていたり
        this._board.bingo  ||                             // 勝敗が付いていたり
        this._board.squares(squareIndex).used)            // マス目が使用済みなら
      return undefined                                    // 新しいステップは作らない

    const index  = this._index + 1                        // 新しいステップインデックス

    const col    = Cols.namesBySquare(squareIndex)
    const row    = Rows.namesBySquare(squareIndex)
    const player = Players.byStep(index)
    const desc   = `#${index} (${col}, ${row}) ${player}` // 新しい説明

    const board  =
      this._board.putPiece(squareIndex, player)           // 新しい盤面

    return new Step(index, desc, board)
  }

}

