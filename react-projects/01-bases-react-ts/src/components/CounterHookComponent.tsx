import { useCounter } from "../hooks/useCounter";

const MAXIMUM_COUNT = 12;

export const CounterHookComponent = () => {
  const { counter, elementToAnimate, handleIncrement, handleIncrementOne } =
    useCounter({ maxCount: MAXIMUM_COUNT });

  return (
    <>
      <h2>CounterHookComponent:</h2>
      <h3 ref={elementToAnimate}>{counter}</h3>

      <button onClick={() => handleIncrement()}>+1</button>
      <button onClick={() => handleIncrement(2)}>+2</button>

      <button onClick={handleIncrementOne}>Only +1</button>
    </>
  );
};
