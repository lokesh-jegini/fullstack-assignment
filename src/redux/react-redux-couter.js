import { Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "./counterSlice";

const ReactReduxCounter = () => {
  const counterState = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const onInc = () => {
    dispatch(counterActions.increment());
  };
  const onDec = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <section>
      <h1>Redux Sample</h1>
      <Button onClick={onDec}>DEC</Button>
      <Typography>{counterState.count}</Typography>
      <Button onClick={onInc}>INC</Button>
    </section>
  );
};

export default ReactReduxCounter;
