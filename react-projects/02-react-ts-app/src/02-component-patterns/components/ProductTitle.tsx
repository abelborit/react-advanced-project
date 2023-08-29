import { useContext } from "react";
import { ProductContext } from "./ProductCard";
import styles from "../styles/styles.module.css";

/* aquí se manda el title como propiedad la cual es opcional, porque eso puede ser reescrito desde la llamada de este componente o puede venir directamente desde el producto, recordar que el title es un campo obligatorio del producto */
export const ProductTitle = ({ title }: { title?: string }) => {
  const { product } = useContext(ProductContext);

  return (
    <span className={styles.productDescription}>
      {title ? title : product.title}
    </span>
  );
};
