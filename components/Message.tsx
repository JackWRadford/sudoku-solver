import { ResultType } from "../types/types";
import styles from "../styles/Message.module.scss";

const Message: React.FC<ResultType> = (props) => {
  return (
    <div className={styles.message}>
      <p>
        {props.done && !props.solved
          ? props.tooFewHints
            ? "Must have at least 17 hints"
            : "No solution for entered values"
          : " "}
      </p>
    </div>
  );
};

export default Message;
