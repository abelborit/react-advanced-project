import { useState } from "react";

interface CounterProps {
  // se coloca un signo de interrogación porque será un parámetro opcional, ya que si al componente <Counter/> en App.tsx no le coloco nada de argumentos para enviar entonces TypeScript se va a quejar por más que yo aquí en la función le esté diciendo que es parámetro opcional y tiene un valor por defecto de 0
  initialValue?: number;
}

// valor por defecto es 0
export const Counter = ({ initialValue = 0 }: CounterProps) => {
  const [counter, setCounter] = useState(initialValue);

  // :void quiere decir que no regresa o no retorna nada
  // : number sería el tipado para el parámetro que es de tipo número
  // = 1 quiere decir que tiene el valor por defecto de 1 si es que no se le manda nada
  const handleIncrement = (argsValue: number = 1): void => {
    setCounter((prevState) => prevState + argsValue);
  };

  return (
    <>
      <h2>Counter: {counter}</h2>

      <button onClick={() => handleIncrement()}>+1</button>
      <button onClick={() => handleIncrement(2)}>+2</button>
    </>
  );
};
