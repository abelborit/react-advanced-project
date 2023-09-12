import { useEffect, useState } from "react";
import { HandleChangeArgs, ProductInterface } from "../interfaces";

/* esta interface es más que todo para los argumentos que va a recibir este custom hook para poder manejar todo el estado en sí, aquí se estaría mandando todo el producto, la función para cambiar la cantidad y la cantidad como tal */
interface UseProductInterface {
  product: ProductInterface;
  onChangeProps?: (args: HandleChangeArgs) => void;
  valueProps?: number;
}

export const useProduct = ({
  product,
  valueProps = 0,
  onChangeProps,
}: UseProductInterface) => {
  /* para aplicar el patrón de Control Props, es decir, para que las propiedades controlen el estado del componente, el valueProps tendría que ser quien muestre la cantidad como tal y sea la guía del estado del componente a través de propiedades y de esta forma se haría referencia al onChange y value de los inputs pero para esto lo que se necesita hacer es eliminar el counterState ya este es quien maneja el estado como tal ya que aumenta o disminuye la cantidad */
  /* usando el useState significa que se tienen diferentes estados porque en pocas palabras se puede decir que hay diferentes componentes o instancias de estos componentes y por ende diferentes estados (por más que sea el mismo componente en cuanto a código) y esto significa que cada uno funciona por separado solo que se está sincronizando con el valueProps. Se puede dejar así ya que funciona normal y no hay ningún problema pero no se estaría usando el patrón de Control Props */
  const [counterState, setCounterState] = useState(valueProps);

  const increaseOrDecreaseBy = (valueArgs: number = 1) => {
    const newValue = Math.max(counterState + valueArgs, 0);
    /* Math.max() para seleccionar el valor máximo porque por ejemplo si el counterState = -1 entonces debería reemplazarse por 0 ya que ese será el líminte inferior */
    setCounterState(newValue);

    /* se coloca así porque primero se valida si el onChangeProps existe porque si no se coloca esa validación entonces typescript nos dice que al recibir el onChangeProps puede ser potencialmente inseguro (Cannot invoke an object which is possibly 'undefined'.) porque se estaría recibiendo un null o undefined y al final quedaría como null() o un undefined() lo cual daría error en la aplicación */
    onChangeProps && onChangeProps({ product, quantity: newValue });
  };

  /* se utiliza el useEffect porque el valueProps se utiliza solo como valor inicial del estado y este no hará que cambie el valor que se muestra en shoppingCartState porque el counterState seguirá siendo 1 entonces con esto nos aseguramos que cada que cambie el valueProps cambiará el counterState y el shoppingCartState tendrá las mismas quantity del nuevo valor de valueProps que se le manda como propiedad. Sería como una forma de sincronizar tanto lo que se manda desde el dashboard principal al shoppingCartState como del shoppingCartState al dashboard principal */
  useEffect(() => {
    setCounterState(valueProps);
  }, [valueProps]);

  return { counterState, increaseOrDecreaseBy };
};
