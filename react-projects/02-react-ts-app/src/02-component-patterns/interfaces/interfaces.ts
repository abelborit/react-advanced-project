import { ReactElement } from "react";

/* usualmente la interface de mayor jeraquía va primero y en este caso podría ser tanto ProductCardProps o ProductContextProps ya que una es para las propiedades del componente principal y la otra para el contexto del componente principal */
export interface ProductCardProps {
  product: ProductInterface;
  /* children es opcional y puede ser un componente o varios componentes */
  children?: ReactElement | ReactElement[];
}

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

  Image: ({
    img,
    title,
  }: {
    img?: string | undefined;
    title?: string | undefined;
  }) => JSX.Element;

  Title: ({ title }: { title?: string | undefined }) => JSX.Element;

  Buttons: () => JSX.Element;
}
