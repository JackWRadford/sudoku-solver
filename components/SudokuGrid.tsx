import styles from "../styles/SudokuGrid.module.scss";
import { GridDataType, PointType } from "../types/types";
import SudokuGridBox from "./SudokuGridBox";

type SudokuGridType = {
  gridData: GridDataType;
  onChange: (point: PointType, e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SudokuGrid: React.FC<SudokuGridType> = (props) => {
  return props.gridData ? (
    <div className={styles.sudokuGrid}>
      {props.gridData.map((rowData, yIndex) =>
        rowData.map((value, xIndex) => {
          return (
            <SudokuGridBox
              key={`${yIndex}${xIndex}`}
              value={value}
              point={{ y: yIndex, x: xIndex }}
              onChange={props.onChange.bind(this, { y: yIndex, x: xIndex })}
            />
          );
        })
      )}
    </div>
  ) : (
    <></>
  );
};

export default SudokuGrid;
