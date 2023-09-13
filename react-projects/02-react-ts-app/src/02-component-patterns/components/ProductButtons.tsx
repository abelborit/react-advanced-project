import { CSSProperties, useCallback, useContext } from "react";
import { ProductContext } from "./ProductCard";

import styles from "../styles/styles.module.css";

/* antes se le pasaban las propiedades {counterState, increaseOrDecreaseBy} pero de esa forma quedan expuestas al desarrollador pero eso solo debería manejarlo el componente ProductCard de forma interna, por eso ahora se usa el contexto */
// export const ProductButtons = ({counterState, increaseOrDecreaseBy}: ProductButtonsProps) => {

export interface ProductButtonsProps {
  classNameProps?: string;
  styleProps?: CSSProperties;
}

export const ProductButtons = ({
  classNameProps,
  styleProps,
}: ProductButtonsProps) => {
  const { counterState, maxQuantity, increaseOrDecreaseBy } =
    useContext(ProductContext);

  /* esta función retornará un true o un false si ya se alcanzó el valor máximo */
  const isMaxReached = useCallback(
    /* ver si maxQuantity existe usando la doble negación y ver si el counterState es exactamente igual al maxQuantity */
    () => !!maxQuantity && counterState === maxQuantity,

    [counterState, maxQuantity]
  );

  return (
    <div
      className={`${styles.buttonsContainer} ${classNameProps}`}
      style={styleProps}
    >
      <button
        className={`${styles.buttonMinus} ${
          counterState === 0 && styles.disabledLeft
        }`}
        onClick={() => increaseOrDecreaseBy(-1)}
      >
        -
      </button>
      <div className={styles.countLabel}>{counterState}</div>
      <button
        className={`${styles.buttonAdd} ${
          isMaxReached() && styles.disabledRight
        }`}
        onClick={() => increaseOrDecreaseBy(1)}
      >
        +
      </button>
    </div>
  );
};
