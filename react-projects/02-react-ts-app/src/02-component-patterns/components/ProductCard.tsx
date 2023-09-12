import { CSSProperties, ReactElement, createContext } from "react";
import { useProduct } from "../hooks/useProduct";
import {
  HandleChangeArgs,
  ProductContextProps,
  ProductInterface,
} from "../interfaces";
import styles from "../styles/styles.module.css";

/* para que sea más facil trabajar con las propiedades enviadas se puede usar su interface en el mismo componente para tenerlo de forma directa y ver qué se está recibiendo */
export interface ProductCardProps {
  product: ProductInterface;
  /* children es opcional y puede ser un componente o varios componentes */
  children?: ReactElement | ReactElement[];
  // children?: React.ReactElement | React.ReactElement[]; /* sin importarlo y usarlo desde la importación global de React */
  classNameProps?: string;
  styleProps?: CSSProperties;
  // styleProps?: React.CSSProperties; /* sin importarlo y usarlo desde la importación global de React */
  onChangeProps?: (args: HandleChangeArgs) => void;
  valueProps?: number;
}

/* crear un contexto para compartir informaciónm del padre a sus hijos sin usar paso por propiedades y que sea más facil usar los HOCs */
/* el contexto se puede mover a otro archivo para hacer el código más organizado o modular pero como al final quiero que solo el ProductCard haga uso de este contexto, entonces me resulta mejor tenerlo aquí */
export const ProductContext = createContext({} as ProductContextProps);
const { Provider } = ProductContext;

export const ProductCard = ({
  children,
  product,
  classNameProps,
  styleProps,
  valueProps,
  onChangeProps,
}: ProductCardProps) => {
  /* pasar como argumento al onChangeProps para que el custom hook useProduct maneje todo eso porque ya manjea el estado y se quiere que meneje todo junto. Otra forma podría ser que dentro de un useEffect() dentro de ProductCard y se mande a llamar a la función onChangeProps cada que cambie el counterState, pero en este caso haremos que el custom hook useProduct se encargue */
  const { counterState, increaseOrDecreaseBy } = useProduct({
    product,
    valueProps,
    onChangeProps,
  });

  /* si se retorna todo (ProductImage, ProductTitle y ProductButtons) en este componente como un solo JSX de ProductCard, entonces limita al desarrollador porque por ejemplo si yo trabajé como una librería este ProductCard entonces el desarrollador tiene muy poco control y se limita a colocar solo las primeras propiedades del objeto productData = {} en ShoppingPage.tsx porque no van a poder ni mandar estilos, ni mandar más propiedades, ni agregar cosas, ni mandar el valor inicial, etc y para eso se tendrían que difinir muchas cosas y entonces ahí es donde se utilizan los HOCs o Higher Order Components para tener un componente padre y adentro sus hijos */
  /* colocar el Provider en el punto más alto de la aplicación, en este caso sería este componente ya que es el padre */
  return (
    <Provider value={{ product, counterState, increaseOrDecreaseBy }}>
      <div
        className={`${styles.productCard} ${classNameProps}`}
        style={styleProps}
      >
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
