import { useReducer } from "react";
import { CounterState } from "./interfaces/counterInterfaces";
import { counterReducer } from "./state/counterReducer";
import { doIncreaseBy, doReset } from "./actions/counterActions";

const INITIAL_STATE: CounterState = {
  counter: 0,
  previous: 0,
  changes: 0,
};

export const CounterReducerComponent = () => {
  // first: reducer -> es una función pura, es decir, que la función solo debe trabajar con los argumentos que recibe, no tiene interacción con el mundo externo. No puede ser asíncrona (se puede pero no es recomendable) solo recibe argumentos y retorna un estado
  // second: initialState -> estado inicial que tendrá el reducer
  // third: init -> es para hacer una carga perezoza (lazy loading) cuando el componente es construido y se termina de hacer eso se llama al init y se construye. Otro ejemplo para hacer una previa refactorización del estado, por ejemplo para colocar el símbolo de alguna moneda previamente
  // const [state, dispatch] = useReducer(first, second, third);
  const [counterState, dispatch] = useReducer(counterReducer, INITIAL_STATE);

  const handleReset = (): void => {
    // dispatch({type:"reset"}); // sin actions creator mandando el tipo con/sin payload
    dispatch(doReset()); // con actions creator mandando una función pura
  };

  const handleIncreaseBy = (valueArgs: number = 1): void => {
    // dispatch({ type: "increaseBy", payload: { value: valueArgs } }); // sin actions creator mandando el tipo con/sin payload
    dispatch(doIncreaseBy(valueArgs)); // con actions creator mandando una función pura
  };

  return (
    <>
      <h2>CounterReducerComponent (segmentado y/o modularizado)</h2>
      <pre>{JSON.stringify(counterState, null, 2)}</pre>

      <button onClick={() => handleIncreaseBy()}>+1</button>
      <button onClick={() => handleIncreaseBy(5)}>+5</button>
      <button onClick={() => handleIncreaseBy(10)}>+10</button>

      <button onClick={handleReset}>Reset</button>
    </>
  );
};
