// types & constants --------------------------------
export type Piece = "O" | "X"                         // マス目に置く駒
const PLAYERS: Piece[]  = ["O", "X"]                  // プレーヤ
const COLS   : string[] = ["a", "b", "c"]             // 盤面の列見出し
const ROWS   : string[] = ["1", "2", "3"]             // 盤面の行見出し
const BINGO_LINES: number[][] = [                     // ビンゴパターン8種
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
  [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
]
/*
export type Piece = "O" | "X" | "H"                   // マス目に置く駒
const PLAYERS: Piece[]  = ["O", "X", "H"]             // プレーヤ
const COLS   : string[] = ["a", "b", "c", "d"]        // 盤面の列見出し
const ROWS   : string[] = ["1", "2", "3", "4"]        // 盤面の行見出し
const BINGO_LINES: number[][] = [                     // ビンゴパターン10種
  [ 0, 1, 2, 3], [ 4, 5, 6, 7], [ 8, 9,10,11],
  [12,13,14,15], [ 0, 4, 8,12], [ 1, 5, 9,13],
  [ 2, 6,10,14], [ 3, 7,11,15], [ 0, 5,10,15],
  [ 3, 6, 9,12]
]
*/

const SQUARES_LEN = COLS.length * ROWS.length

// public functions ---------------------------------
// 元になる配列が無い状態で要素数nのマップを行う
type  IAM_Func = (i: number) => any
export const inflateAndMap = (n: number, fn: IAM_Func) : any[] =>
  Array<null>(n).fill(null).map( (_, i) => fn(i) )

// static classes------------------------------------
// プレーヤクラス
export class Players {                                // ステップ誰の番かを管理
  static byStep = (stepIndex: number): Piece =>       // プレーヤ名は駒名と同じ
    PLAYERS[ stepIndex % PLAYERS.length ]
}

// 盤面の列情報を管理するクラス
export class Cols {
  static get len() { return COLS.length }             // 列数を得る

  static get names(): string[] {                      // 列名の配列を得る
    return COLS.slice()
  }

  static namesBySquare = (index: number): string =>   // マス目のインデックスから
    COLS[index % COLS.length]                         // 列名を得る
}

// 盤面の行情報を管理するクラス
export class Rows {
  static get len() { return COLS.length }             // 行数を得る

  static get names(): string[] {                      // 行名の配列を得る
    return ROWS.slice()
  }

  static namesBySquare = (index: number): string => { // マス目のインデックスから
    const rowIndex = Math.floor(index / Cols.len)     // 行名を得る
    return ROWS[rowIndex]
  }
}

// マス目数の情報を管理するクラス
export class Squs {
  static get len() { return Cols.len * Rows.len }     // マス目数を得る
}

// ビンゴ検査結果クラス
class BingoResult {
  constructor(
    public winner   : Piece    | null,
    public bingoLine: number[] | null
  ) {}
  get bingo() { return this.winner !== null }
}

// ビンゴ検査のコールバックの型
type MBB_Func = (squareIndex: number) => Piece | null // マス目の駒を返す

// ビンゴ検査クラス
export class Bingo {

  private static isAllSame =                          // bingoLine 配列が示す
    (squares  : (Piece | null)[] ,                    // すべてのマス目に、皆同じ
     bingoLine: (number      )[] ): boolean => {      // 種類の駒が置かれているか
  
    const b0 = bingoLine[0]                           // 1つでも空のマス目があれば
    if (squares[b0] === null) return false            // ビンゴではない
  
    const found = bingoLine.slice(1).find(            // 2個目以降もすべて同じなら
      bn => squares[b0] !== squares[bn]               // ビンゴ
    )
    return found === undefined
  }

  static maybe = (fn: MBB_Func) : BingoResult => {    // ビンゴ検査
    const squares =                                   // 呼び出し元の盤面を
      inflateAndMap(SQUARES_LEN, i => fn(i) )         // 1度駒の配列にする

    const bingoLine =                                 // ビンゴラインが形成されて
      BINGO_LINES.find(                               // いるか確認
        bl=>Bingo.isAllSame(squares, bl)
      )

    if (bingoLine === undefined) {                    // ビンゴではない
      return new BingoResult(null, null)
    } else {                                          // ビンゴである
      const b0 = bingoLine[0]
      const winner = squares[b0]
      return new BingoResult(winner, bingoLine)
    }
  }
}
