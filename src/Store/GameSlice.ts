import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const calculateWinner = (squares: Array<string | null>) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
interface GameState {
  startGame: boolean;
  squares: Array<string | null>;
  positionX: number[];
  positionY: number[];
  xIsNext: boolean;
  winner: string | null;
  score: {
    X: number;
    O: number;
    TIE: number;
  };
}

const initialState: GameState = {
  startGame: false,
  squares: Array(9).fill(null),
  positionX: [],
  positionY: [],
  xIsNext: true,
  winner: null,
  score: {
    X: 0,
    O: 0,
    TIE: 0,
  },
};
export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    clickSquare: (state, action: PayloadAction<number>) => {
      if (state.squares[action.payload] || state.winner) {
        return;
      }
      state.squares[action.payload] = state.xIsNext ? "X" : "O";
      if (state.xIsNext) {
        state.positionX.push(action.payload);
      } else {
        state.positionY.push(action.payload);
      }
      state.xIsNext = !state.xIsNext;
      state.winner = calculateWinner(state.squares);
      if (state.winner) {
        if (state.winner === "X") {
          state.score.X += 1;
        } else if (state.winner === "O") {
          state.score.O += 1;
        }
      } else if (state.squares.every((square) => square)) {
        state.score.TIE += 1;
      }
    },
    twist: (state: GameState) => {
      if (state.positionX.length === 4) {
        const position: number | undefined = state.positionX.shift();
        if (position !== undefined) {
          state.squares[position] = null;
        }
      } else if (state.positionY.length === 4) {
        const position: number | undefined = state.positionY.shift();
        if (position !== undefined) state.squares[position] = null;
      }
    },
    restart: (state) => {
      state.squares = Array(9).fill(null);
      state.xIsNext = true;
      state.winner = null;
      state.startGame = true;
      state.positionX = [];
      state.positionY = [];
    },
    newGame: (state) => {
      state.startGame = true;
      state.squares = Array(9).fill(null);
      state.xIsNext = true;
      state.winner = null;
      state.score = {
        X: 0,
        O: 0,
        TIE: 0,
      };
      state.positionX = [];
      state.positionY = [];
    },
    reset: (state) => {
      state.startGame = false;
      state.squares = Array(9).fill(null);
      state.xIsNext = true;
      state.winner = null;
      state.score = {
        X: 0,
        O: 0,
        TIE: 0,
      };
      state.positionX = [];
      state.positionY = [];
    },
  },
});

export const { clickSquare, restart, reset, newGame, twist } =
  gameSlice.actions;
export default gameSlice.reducer;
export type { GameState };
