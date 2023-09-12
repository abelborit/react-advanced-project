import { useState } from "react";
import { HandleChangeArgs, ProductInCartInterface } from "../interfaces";

export const useShoppingCart = () => {
  /* el estado del shoppingCartState será un objeto cuyas llaves harán referencia a los id de los productos y tiene como valor un objeto que tiene el producto y una nueva propiedad que es la cantidad */
  /* useState como otros hooks de react son genéricos, es decir, que se puede especificar el tipo dentro de las llaves <>. Entonces como se sabe que el estado es un objeto y dentro de este tendrá un llave que es de tipo string, key:string y se coloca entre llaves pero no significa que es un arreglo sino que es una sintaxis que dice que viene un x cantidad de llaves key dentro del objeto, y todo esto apuntará a un ProductInCartInterface */
  /* En pocas palabras mi useState va a manejar un objeto y dentro tiene x cantidad de llaves que serán de tipo string y sus valores son de tipo ProductInCartInterface */
  /* el estado sería algo así: { "1": {...productData, quantity: 10}, "2": {...productData2, quantity: 5}, ...... } */
  const [shoppingCartState, setShoppingCartState] = useState<{
    [key: string]: ProductInCartInterface;
  }>({});

  /* se desestructuran los argumentos que vienen del evento onChangeProps */
  const handleProductQuantityChange = ({
    product,
    quantity,
  }: HandleChangeArgs) => {
    setShoppingCartState((prevShoppingCartState) => {
      console.log({ quantity });

      /* si la quantity del producto que se recibe es igual a cero */
      if (quantity === 0) {
        /* eliminación de un objeto mediante desestructuración (podría ser más facil si fuera un array porque se aplica filter o algo similar pero en este caso es un objeto) Entonces se hará la desestructuración de propiedades computadas donde [product.id]: toDelete será el elemento que quiero eliminar del objeto (es el producto que se le manda a través de argumento en la función) y ...restArgs será el resto de los productos y al final todo ese restante de argumentos será lo único que se retorna y de esa forma no se trabaja directamente mutando el estado sino generando un nuevo estado y así es como se trabaja con react */
        /* : toDelete es como un alias para que no de error en la desestructuración */
        const { [product.id]: toDelete, ...restArgs } = prevShoppingCartState;

        return { ...restArgs };
        // return restArgs; /* puede ser así también porque ya se está desestructurando arriba */
      }

      return {
        ...shoppingCartState,
        [product.id]: { ...product, quantity },
      };
    });
  };

  return { shoppingCartState, handleProductQuantityChange };
};
