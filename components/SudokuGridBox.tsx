import styles from "../styles/SudokuGridBox.module.scss";
import { PointType } from "../types/types";

type SudokuGridBoxType = {
  value: number;
  point: PointType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SudokuGridBox: React.FC<SudokuGridBoxType> = (props) => {
  // Darker backgrounds for corner and middle 3x3 squares
  const getClasses = () => {
    // Check if given co-ords are in a a corner or middle square (3x3)
    const isInSquare = (darkPoint: PointType): boolean => {
      return (
        ~~(props.point.y / 3) * 3 === darkPoint.y &&
        ~~(props.point.x / 3) * 3 === darkPoint.x
      );
    };
    let classes = `${styles.sudokuGridBox}`;
    if (
      isInSquare({ y: 0, x: 0 }) ||
      isInSquare({ y: 0, x: 6 }) ||
      isInSquare({ y: 3, x: 3 }) ||
      isInSquare({ y: 6, x: 0 }) ||
      isInSquare({ y: 6, x: 6 })
    )
      classes = `${styles.sudokuGridBox} ${styles.darkBG}`;
    return classes;
  };

  return (
    <div className={getClasses()}>
      <input
        value={props.value > 0 ? props.value : ""}
        onChange={props.onChange}
        type="number"
        max={9}
        min={1}
      />
    </div>
  );
};

export default SudokuGridBox;
