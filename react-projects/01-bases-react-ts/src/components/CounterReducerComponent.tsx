import { useReducer } from "react";

interface CounterState {
  counter: number;
  previous: number;
  changes: number;
}

const INITIAL_STATE: CounterState = {
  counter: 0,
  previous: 0,
  changes: 0,
};

// para las acciones se acostumbra a trabajar con type y no con interface porque el type no va a extenderse, no va a crecer o incrementar pero se podría trabajar con type o interface tranquilamente
// algo específico de los type es que se puede colocar así "type NameOfType = | typeNum1 | typeNum2 | interfaceNum3" para indicar que puede ser de tipo1 o tipo2 o una interface3, a esto se llama unión de tipos
type CounterAction =
  | { type: "increaseBy"; payload: { value: number } }
  | { type: "reset" };

const counterReducer = (
  state: CounterState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case "reset":
      return {
        counter: 0,
        previous: 0,
        changes: 0,
      };

    case "increaseBy":
      return {
        counter: state.counter + action.payload.value,
        previous: state.counter,
        changes: state.changes + 1,
      };

    default:
      return state;
  }
};

export const CounterReducerComponentOneFile = () => {
  // first: reducer -> es una función pura, es decir, que la función solo debe trabajar con los argumentos que recibe, no tiene interacción con el mundo externo. No puede ser asíncrona (se puede pero no es recomendable) solo recibe argumentos y retorna un estado
  // second: initialState -> estado inicial que tendrá el reducer
  // third: init -> es para hacer una carga perezoza (lazy loading) cuando el componente es construido y se termina de hacer eso se llama al init y se construye. Otro ejemplo para hacer una previa refactorización del estado, por ejemplo para colocar el símbolo de alguna moneda previamente
  // const [state, dispatch] = useReducer(first, second, third);
  const [counterState, dispatch] = useReducer(counterReducer, INITIAL_STATE);

  const handleReset = (): void => {
    dispatch({ type: "reset" });
  };

  const handleIncreaseBy = (valueArgs: number = 1): void => {
    dispatch({ type: "increaseBy", payload: { value: valueArgs } });
  };

  return (
    <>
      <h2>CounterReducerComponent (en un solo archivo)</h2>
      <pre>{JSON.stringify(counterState, null, 2)}</pre>

      <button onClick={() => handleIncreaseBy()}>+1</button>
      <button onClick={() => handleIncreaseBy(5)}>+5</button>
      <button onClick={() => handleIncreaseBy(10)}>+10</button>

      <button onClick={handleReset}>Reset</button>
    </>
  );
};
