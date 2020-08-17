import  Row                      from "./Row"
import  Square                   from "./Square"
import {Cols, Rows, Squs, Piece,
        Bingo, inflateAndMap}    from "./Rules"

// 盤面クラス
export default class Board {
  // private properties -------------------------------------- // 盤面は以下で構成
  private _winner : Piece | null                               // ・この盤面の勝者
  private _squares: Square[]                                   // ・マス目配列

  // constructors --------------------------------------------
  constructor(board?: Board) {                                 // コンストラクタ
    if (board === undefined) {                                 //   空の盤面を生成
      this._winner  = null
      this._squares = inflateAndMap(Squs.len, i => new Square(i) )
    } else {                                                   //   クローンを生成
      this._winner  = board._winner
      this._squares = board._squares.map( s => s.clone() )
    }
  }

  // accessors -----------------------------------------------
  get bingo (): boolean      { return this._winner !== null }  // ビンゴ状態か?
  get winner(): Piece | null { return this._winner          }  // 勝者を返す

  get filled(): boolean {                                      // 既に盤面が
    return this._squares.find(s => s.empty) === undefined      // 埋まっているか?
  }

  get rows(): Row[] {                                          // マス目の1次元配列を
    return Rows.names.map( (name, i) =>                        // 行 x 列の構造に
      new Row( name, Cols.names.map( (_, j) =>                 // 組み替えて返す
        this._squares[i * Cols.len + j] )
      )
    )
  }

  // public methods ------------------------------------------
  clone   = (         ): Board  => new Board(this)             // クローン生成
  squares = (i: number): Square => this._squares[i]            // i番目のマス目を返す

  putPiece = (i: number, piece: Piece): Board => {             // i番目のマス目に駒配置
    const nb = this.clone()                                    // イミュータブルに...

    nb._squares[i] = new Square(i, piece)                      // ピースを置いて
    const result = Bingo.maybe(i => nb._squares[i].piece)      // ビンゴチェックをして

    if (result.bingo) {                                        // ビンゴなら
      nb._squares = nb._squares.map( s => s.cloneClear() )     // 1度ビンゴ印を消して
      nb._winner = result.winner                               // 勝者を書き留めて
      result.bingoLine?.forEach(i =>                           // ビンゴ印を付け直す
        nb._squares[i] = nb._squares[i].cloneBingo() )
    }
    return nb
  }
}

