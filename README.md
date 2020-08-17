# Tic-tac-toe (React Hooks and TypeScript)

<img width="300" src="https://raw.githubusercontent.com/y-bash/React-TicTacToe/master/tic-tac-toe_3x3.png">

Implementation of [React tutorial (Tic-tac-toe)](https://reactjs.org/tutorial/tutorial.html), using React Hooks and TypeScript.
This application was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The source code comments written in Japanese Language.

このアプリケーションは TypeScript と React Hooks による [React チュートリアル (三目並べ)](https://ja.reactjs.org/tutorial/tutorial.html) の実装です。
ツールチェーンとして [Create React App](https://github.com/facebook/create-react-app) が使われています。
ソースコードのコメントは日本語で記載されています。

## Installation

In the project directory, you can install:

```bash
$ npm install
```

## Usage

In the project directory, you can run:

```bash
$ npm start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

```bash
$ npm run build
```

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Improvements

### 3 by 3 Grid

<img width="300" src="https://raw.githubusercontent.com/y-bash/React-TicTacToe/master/tic-tac-toe_3x3.png">

src/rules/Rules.ts

```typescript
export type Piece = "O" | "X"
const PLAYERS: Piece[]  = ["O", "X"]
const COLS   : string[] = ["a", "b", "c"]
const ROWS   : string[] = ["1", "2", "3"]
const BINGO_LINES: number[][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
  [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
]
```

### 4 by 4 Grid

<img width="350" src="https://raw.githubusercontent.com/y-bash/React-TicTacToe/master/tic-tac-toe_4x4.png">

src/rules/Rules.ts

```typescript
export type Piece = "O" | "X" | "H"
const PLAYERS: Piece[]  = ["O", "X", "H"]
const COLS   : string[] = ["a", "b", "c", "d"]
const ROWS   : string[] = ["1", "2", "3", "4"]
const BINGO_LINES: number[][] = [
  [ 0, 1, 2, 3], [ 4, 5, 6, 7], [ 8, 9,10,11],
  [12,13,14,15], [ 0, 4, 8,12], [ 1, 5, 9,13],
  [ 2, 6,10,14], [ 3, 7,11,15], [ 0, 5,10,15],
  [ 3, 6, 9,12]
]
```

## License

MIT

## Author

y-bash
