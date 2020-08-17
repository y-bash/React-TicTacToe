import Step from "./Step"

// 履歴クラス
export default class History {
  // private properties -------------------------------------- // 例歴は以下で構成
  private _steps  : Step[]                                     // ・ステップの配列
  private _current: number                                     // ・現在のステップ

  // constructors --------------------------------------------
  constructor() {
    this._current = 0
    this._steps   = [Step.makeFirst()]
  }

  // accessors -----------------------------------------------
  get steps      () { return this._steps                }      // ステップ配列
  get current    () { return this._current              }      // ステップインデックス
  get currentStep() { return this._steps[this._current] }      // ステップそのもの

  set current(stepIndex: number) { this._current = stepIndex } // ステップを移動する

  // public methods  -----------------------------------------
  update(squareIndex: number): void {                          // 現在ステップに駒配置
    const step =
      this._steps[this._current].makeNext(squareIndex)         // 新しいステップを作り

    if (step !== undefined) {                                  // 上手く作れたら
      this._current = step.index
      this._steps                                              // 現在以降を切り捨てて
        = this._steps.slice(0, this._current).concat(step)     // 新たな未来を作る
    }
  }
}
