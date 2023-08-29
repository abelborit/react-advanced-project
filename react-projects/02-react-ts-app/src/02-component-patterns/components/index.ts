/* se le coloca un alias de ProductCardHOC para poder exportar un objeto con el mismo nombre de ProductCard */
import { ProductCard as ProductCardHOC } from "./ProductCard";

import { ProductImage } from "./ProductImage";
import { ProductTitle } from "./ProductTitle";
import { ProductButtons } from "./ProductButtons";
import { ProductCardHOCProps } from "../interfaces";

/* FORMA 1: exportarlo tal cual como varios componentes individuales y al hacer uso de "export const ProductCard" (linea  17) entonces se puede usar con tranquilidad el nombre ya que no estamos accediendo a sus propiedades */
// export * from "./ProductCard";
export * from "./ProductButtons";
export * from "./ProductImage";
export * from "./ProductTitle";

/* FORMA 2: exportarlo como una parte del componente padre (refleja una relación directa del componente padre con sus hijos) de esta forma al ProductCard se le añade nuevas propiedades las cuales van a apuntar al subcomponente */
export const ProductCard: ProductCardHOCProps = Object.assign(ProductCardHOC, {
  /* esta exportación de ProductCard es similar al export * from "./ProductCard"; solo que será tratado como un objeto y por ende se le pueden añadir nuevas propiedades. En JavaScript todo es un objeto menos los primitivos, entonces con Object.assign() se podrá expandir nuevas propiedades */
  Image: ProductImage,
  Title: ProductTitle,
  Buttons: ProductButtons,
});
