import { useContext } from "react";
import { ProductContext } from "./ProductCard";

import styles from "../styles/styles.module.css";

/* antes se le pasaban las propiedades {counterState, increaseOrDecreaseBy} pero de esa forma quedan expuestas al desarrollador pero eso solo debería manejarlo el componente ProductCard de forma interna, por eso ahora se usa el contexto */
// export const ProductButtons = ({counterState, increaseOrDecreaseBy}: ProductButtonsProps) => {
export const ProductButtons = () => {
  const { counterState, increaseOrDecreaseBy } = useContext(ProductContext);

  return (
    <div className={styles.buttonsContainer}>
      <button
        className={styles.buttonMinus}
        onClick={() => increaseOrDecreaseBy(-1)}
      >
        -
      </button>
      <div className={styles.countLabel}>{counterState}</div>
      <button
        className={styles.buttonAdd}
        onClick={() => increaseOrDecreaseBy(1)}
      >
        +
      </button>
    </div>
  );
};
