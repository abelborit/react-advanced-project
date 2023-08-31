import { ProductButtonsProps } from "../components/ProductButtons";
import { ProductCardProps } from "../components/ProductCard";
import { ProductImageProps } from "../components/ProductImage";
import { ProductTitleProps } from "../components/ProductTitle";

/* usualmente la interface de mayor jeraquía va primero y en este caso podría ProductContextProps ya que es el contexto del componente principal */
export interface ProductInterface {
  id: string;
  title: string;
  img?: string;
}

/* se comenta esta línea porque se usaba cuando se pasaban las propiedades en el componente ProductButtons pero quedaban expuestas y eso solo se debería de manejar de forma interna */
// export interface ProductButtonsProps {
//   counterState: number;
//   increaseOrDecreaseBy: (valueArgs?: number) => void;
// }

/* tipar cómo va a lucir el contexto para que con TypeScript sea más facil evita errores y se pasen las propiedades correctamente */
export interface ProductContextProps {
  product: ProductInterface;
  counterState: number;
  increaseOrDecreaseBy: (valueArgs?: number) => void;
}

/* tipa el objeto de ProductCard del archivo de barril (ESTA interface ES OPCIONAL PORQUE PUEDO DEJAR QUE TYPESCRIPT LO INFIERA). Para los tipos se puede pasar el mouse por encima de los componentes del archivo barril */
export interface ProductCardHOCProps {
  ({ children, product }: ProductCardProps): JSX.Element;
  /* props (o cualquier otro nombre) es colocar en forma general sin desestructurar lo cual me beneficia ya que se pueden usar correctamente los HOCs de FORMA 1 o de FORMA 2 explicados en ShoppingPage.tsx */
  Image: (props: ProductImageProps) => JSX.Element;
  Title: (props: ProductTitleProps) => JSX.Element;
  Buttons: (props: ProductButtonsProps) => JSX.Element;

  /* desestructurar las propiedades lo cual puede ser un poco más tedioso ya que se tendrían que colocar todas las propiedades */
  // Image: ({ img, title, classNameProps }: ProductImageProps) => JSX.Element;
  // Title: ({ title, classNameProps }: ProductTitleProps) => JSX.Element;
  // Buttons: ({ classNameProps }: ProductButtonsProps) => JSX.Element;

  /* no es recomendable trabajar así porque al desestructurar le estoy dando limitantes y no lo estoy haciendo dinámico ya que si cambia algo o alguna nueva propiedad se agrega, entonces tendría que modificar la desestructuración y también modificar la propia interface del componente para que no hayan problemas con los HOCs de FORMA 1 o de FORMA 2 explicados en ShoppingPage.tsx */
  // Image: (props: { img?: string; title?: string; classNameProps?: string;}) => JSX.Element;
}
