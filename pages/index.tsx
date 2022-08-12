import type { NextPage } from "next";
import { useState } from "react";
import Actions from "../components/Actions";
import Message from "../components/Message";
import SudokuGrid from "../components/SudokuGrid";
import styles from "../styles/Home.module.scss";
import { GridDataType, PointType, ResultType } from "../types/types";

// let initGridData: GridDataType = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];

// let initGridData: GridDataType = [
//   [0, 9, 0, 7, 5, 1, 2, 3, 0],
//   [2, 1, 8, 0, 0, 3, 5, 0, 0],
//   [0, 0, 0, 4, 0, 0, 0, 0, 1],
//   [0, 4, 0, 0, 3, 0, 7, 0, 2],
//   [0, 0, 0, 0, 7, 6, 4, 8, 9],
//   [0, 0, 0, 9, 0, 0, 0, 0, 6],
//   [0, 6, 2, 5, 1, 4, 8, 0, 3],
//   [3, 7, 0, 0, 0, 0, 1, 6, 5],
//   [1, 0, 0, 0, 0, 7, 0, 0, 0],
// ];

// An 'evil' level Sudoku.com
let initGridData: GridDataType = [
  [0, 0, 0, 0, 6, 0, 0, 0, 0],
  [0, 0, 8, 0, 0, 0, 3, 0, 0],
  [5, 0, 0, 1, 0, 7, 0, 0, 9],
  [0, 0, 0, 4, 0, 0, 0, 0, 0],
  [1, 0, 0, 9, 0, 2, 0, 0, 7],
  [0, 5, 0, 0, 0, 0, 0, 1, 0],
  [0, 3, 0, 2, 0, 6, 9, 0, 0],
  [0, 0, 0, 0, 5, 0, 0, 0, 6],
  [2, 0, 0, 0, 4, 0, 0, 0, 0],
];

const Home: NextPage = () => {
  const [gridData, setGridData] = useState<GridDataType>(initGridData);
  const [result, setResult] = useState<ResultType>({
    done: false,
    solved: false,
  });
  let solutionData: GridDataType = [[]];

  // Check if a given number n is possible at the given co-ords
  const possible = (y: number, x: number, n: number): boolean => {
    // Check row and column for n
    for (let i = 0; i < 9; i++) {
      if (solutionData[y][i] === n) return false; // Row
    }
    for (let i = 0; i < 9; i++) {
      if (solutionData[i][x] === n) return false; // Column
    }
    // Check 3x3 square for n
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (solutionData[~~(y / 3) * 3 + i][~~(x / 3) * 3 + j] === n)
          return false;
      }
    }
    return true;
  };

  // Attempt to solve with back-tracking
  const solve = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (solutionData[i][j] === 0) {
          for (let n = 1; n < 10; n++) {
            if (possible(i, j, n)) {
              solutionData[i][j] = n;
              solve();
              solutionData[i][j] = 0;
            }
          }
          return; // No possibilities (go back to previous recurrsive solve)
        }
      }
    }
    setGridData(solutionData.map((arr) => arr.slice()));
    setResult({ done: true, solved: true });
  };

  // Update gridData when a value is changed
  const onChangeHandler = (
    point: PointType,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value.length > 1) return;
    setGridData((prev) => {
      let newData = [...prev];
      newData[point.y][point.x] = +e.target.value;
      return newData;
    });
    setResult({ done: false, solved: false });
  };

  // Attempt to solve puzzle (back-tracking)
  const onSolveHandler = () => {
    setResult({ done: false, solved: false });
    solutionData = gridData.map((arr) => arr.slice());
    solve();
    setResult((prev) => {
      return { done: true, solved: prev.solved };
    });
  };

  // Reset gridData to all zero
  const onResetHandler = () => {
    setGridData(initGridData.map((arr) => arr.slice()));
    setResult({ done: false, solved: false });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.home}>
        <h1>Sudoku Solver</h1>
        <SudokuGrid gridData={gridData} onChange={onChangeHandler} />
        <Message done={result.done} solved={result.solved} />
        <Actions onSolve={onSolveHandler} onReset={onResetHandler} />
      </div>
    </div>
  );
};

export default Home;
