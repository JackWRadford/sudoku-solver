import styles from "../styles/Actions.module.scss";

type ActionsType = {
  onSolve: () => void;
  onReset: () => void;
};

const Actions: React.FC<ActionsType> = (props) => {
  return (
    <div className={styles.actions}>
      <button className={styles.solveBtn} onClick={props.onSolve}>
        Solve
      </button>
      <button className={styles.solveBtn} onClick={props.onReset}>
        Reset
      </button>
    </div>
  );
};

export default Actions;
