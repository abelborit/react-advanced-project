import { useState } from "react";

export const useProduct = () => {
  const [counterState, setCounterState] = useState(0);

  const increaseOrDecreaseBy = (valueArgs: number = 1) => {
    // setCounterState((prevState) => prevState + valueArgs);
    // Math.max() para seleccionar el valor máximo porque por ejemplo si el counterState = -1 entonces debería reemplazarse por 0 ya que ese será el líminte inferior
    setCounterState((prevState) => Math.max(prevState + valueArgs, 0));
  };

  return { counterState, increaseOrDecreaseBy };
};
