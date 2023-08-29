import { createContext } from "react";
import { useProduct } from "../hooks/useProduct";
import { ProductCardProps, ProductContextProps } from "../interfaces";

import styles from "../styles/styles.module.css";

/* crear un contexto para compartir informaciónm del padre a sus hijos sin usar paso por propiedades y que sea más facil usar los HOCs */
/* el contexto se puede mover a otro archivo para hacer el código más organizado o modular pero como al final quiero que solo el ProductCard haga uso de este contexto, entonces me resulta mejor tenerlo aquí */
export const ProductContext = createContext({} as ProductContextProps);
const { Provider } = ProductContext;

export const ProductCard = ({ children, product }: ProductCardProps) => {
  const { counterState, increaseOrDecreaseBy } = useProduct();

  /* si se retorna todo (ProductImage, ProductTitle y ProductButtons) en este componente como un solo JSX de ProductCard, entonces limita al desarrollador porque por ejemplo si yo trabajé como una librería este ProductCard entonces el desarrollador tiene muy poco control y se limita a colocar solo las primeras propiedades del objeto productData = {} en ShoppingPage.tsx porque no van a poder ni mandar estilos, ni mandar más propiedades, ni agregar cosas, ni mandar el valor inicial, etc y para eso se tendrían que difinir muchas cosas y entonces ahí es donde se utilizan los HOCs o Higher Order Components para tener un componente padre y adentro sus hijos */
  /* colocar el Provider en el punto más alto de la aplicación, en este caso sería este componente ya que es el padre */
  return (
    <Provider value={{ product, counterState, increaseOrDecreaseBy }}>
      <div className={styles.productCard}>
        {children}

        {/* pasar la información a través de propiedades */}
        {/* <ProductImage img={product.img} title={product.title} />

        <ProductTitle title={product.title} />

        <ProductButtons
          counterState={counterState}
          increaseOrDecreaseBy={increaseOrDecreaseBy}
        /> */}
      </div>
    </Provider>
  );
};
