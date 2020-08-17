import Square from "./Square"

// (盤面の)行クラス
export default class Row {
  // constructor & private properties --------------------
  constructor(                                             // 行は
    private _name   : string  ,                            // ・名前(行見出し)
    private _squares: Square[]                             // ・マス目配列(列数分)
  ) {}                                                     // で構成される

  // accessors -------------------------------------------
  get name   (): string   { return this._name            }
  get squares(): Square[] { return this._squares.slice() } // イミュータブルに...
}

