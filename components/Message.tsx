import { ResultType } from "../types/types";

const Message: React.FC<ResultType> = (props) => {
  return (
    <p>
      {props.done && !props.solved ? "No solution for entered values" : " "}
    </p>
  );
};

export default Message;
