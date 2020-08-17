import {Piece} from "./Rules"

// マス目クラス
export default class Square {
  // constructor & private properties ---------------------
  constructor(                                              // マス目は
    private _index: number              ,                   // ・盤面上のインデックス
    private _piece: Piece | null = null ,                   // ・置かれた駒
    private _bingo: boolean      = false                    // ・ビンゴ駒かどうか
  ) {}                                                      // で構成される

  // accessors --------------------------------------------
  get index(): number       { return this._index          }
  get piece(): Piece | null { return this._piece          }
  get bingo(): boolean      { return this._bingo          }
  get empty(): boolean      { return this._piece === null } // マス目が空か?
  get used (): boolean      { return this._piece !== null } // マス目が使われているか?

  // public methods ---------------------------------------
  clone = (): Square =>                                     // 複製
    new Square(this._index, this._piece, this._bingo)

  cloneClear = (): Square =>                                // ビンゴ印を消して複製
    new Square(this._index, this._piece)

  cloneBingo = (): Square =>                                // ビンゴ印を付けて複製
    new Square(this._index, this._piece, true)
}
