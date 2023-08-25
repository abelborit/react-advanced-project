import { useState } from "react";

interface CounterProps {
  // se coloca un signo de interrogación porque será un parámetro opcional, ya que si al componente <Counter/> en App.tsx no le coloco nada de argumentos para enviar entonces TypeScript se va a quejar por más que yo aquí en la función le esté diciendo que es parámetro opcional y tiene un valor por defecto de 0
  initialValue?: number;
}

// se puede trabajar con interface o tipos, la diferencia es que con tipos son más rígidos y las interfaces se pueden extender un poco más
interface CounterState {
  counter: number;
  clicks: number;
}

export const CounterBy = ({ initialValue = 5 }: CounterProps) => {
  const [counterState, setCounterState] = useState<CounterState>({
    counter: initialValue,
    clicks: 0,
  });

  // :void quiere decir que no regresa o no retorna nada
  // : number sería el tipado para el parámetro que es de tipo número
  // = 1 quiere decir que tiene el valor por defecto de 1 si es que no se le manda nada
  const handleIncrement = (argsValue: number = 1): void => {
    setCounterState((prevState) => ({
      // en TypeScript es necesario pasarle los mismas llaves del objeto que tiene el estado porque por ejemplo si se comenta clicks entonces dará error cosa que en JavaScript es permitido no colocar todas las llaves
      counter: prevState.counter + argsValue,
      clicks: prevState.clicks + 1,
    }));
  };

  return (
    <>
      <h2>CounterBy: {counterState.counter}</h2>
      <h2>Clicks: {counterState.clicks}</h2>

      <button onClick={() => handleIncrement()}>+1</button>
      <button onClick={() => handleIncrement(5)}>+5</button>
    </>
  );
};
