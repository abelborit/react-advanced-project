import { CSSProperties, useContext } from "react";
import { ProductContext } from "./ProductCard";

import styles from "../styles/styles.module.css";
import noImage from "../assets/no-image.jpg";

/* aquí se manda la img y el title como propiedad la cual es opcional, porque en el caso de la img puede ser reescrita desde la llamada de este componente o puede venir directamente desde el producto o simplemente no venir y en el caso de title puede ser reescrito desde la llamada de este componente o puede venir directamente desde el producto, la img está como string vacio ya que en un ternario el string vacío es considerado como un falsy, entonces puede ser reescrito o mandado directamente desde el producto */
export interface ProductImageProps {
  img?: string;
  title?: string;
  classNameProps?: string;
  styleProps?: CSSProperties;
}

export const ProductImage = ({
  img = "",
  title,
  classNameProps,
  styleProps,
}: ProductImageProps) => {
  /* aquí solo se manda la img como propiedad porque eso puede ser reescrito desde la llamada de este componente y lo demás como el title se saca del contexto */
  const { product } = useContext(ProductContext);
  let imgToShow: string; /* colocar una variable de la imagen a mostrar, será de tipo string */

  /* en este caso hay tres evaluaciones para la img, la primera es que puede venir como paso de propiedad, la segunda es que puede venir en el producto y la tercera puede ser que no venga la img y se renderice la noImage */
  if (img) {
    imgToShow = img;
  } else if (product?.img) {
    imgToShow = product.img;
  } else {
    imgToShow = noImage;
  }

  return (
    // <img className={styles.productImg} src={img ? img : noImage} alt={title} />

    <img
      className={`${styles.productImg} ${classNameProps}`}
      style={styleProps}
      src={imgToShow}
      alt={title ? title : product.title}
    />
  );
};
