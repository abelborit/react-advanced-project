// este archivo me ayudará a crear la barra de navegación y las rutas de forma dinámica y más fácil, también será más fácil si quiero agregar nuevas rutas
import { lazy } from "react";
import { NoLazyload } from "../01-lazyload/pages/NoLazyload";
// import { LazyPage1, LazyPage2, LazyPage3 } from "../01-lazyload/pages";

// se crea un tipo porque si se coloca de forma directa da un error: "Function type notation must be parenthesized when used in a union type."
type JSXComponent = () => JSX.Element;

export interface RouteInterface {
  to: string;
  path: string;
  // Component: () => JSX.Element; // ya no sería solo un simple elemento JSX de React
  // Component: React.LazyExoticComponent<() => JSX.Element>; // tampoco se coloca de esta forma porque se pierde flexibilidad porque cabe la posibilidad que quiera trabajar con rutas lazy y también con rutas con comportamiento normal (si solo trabajo con rutas lazy entonces normal lo puedo hacer de esta forma)
  Component: React.LazyExoticComponent<() => JSX.Element> | JSXComponent; // con esto ya soporta rutas lazy o también las rutas con comportamiento normal
  name: string;
}

// cambiar el nombre de los chunks que aperecen al hacer el cambio entre rutas
const Lazy1 = lazy(
  () =>
    import(/* webpackChunkName: "LazyPage1" */ "../01-lazyload/pages/LazyPage1")
);
const Lazy2 = lazy(
  () =>
    import(/* webpackChunkName: "LazyPage2" */ "../01-lazyload/pages/LazyPage2")
);
const Lazy3 = lazy(
  () =>
    import(/* webpackChunkName: "LazyPage3" */ "../01-lazyload/pages/LazyPage3")
);

export const routesArray: RouteInterface[] = [
  {
    to: "/lazy1",
    path: "/lazy1",
    // Component: LazyPage1, // ya no sería solo un simple elemento JSX de React
    Component: Lazy1,
    name: "Lazy Page 1",
  },
  {
    to: "/lazy2",
    path: "/lazy2",
    // Component: LazyPage2,
    Component: Lazy2,
    name: "Lazy Page 2",
  },
  {
    to: "/lazy3",
    path: "/lazy3",
    // Component: LazyPage3,
    Component: Lazy3,
    name: "Lazy Page 3",
  },
];

/* **************************************************************************************** */
const LazyLayout = lazy(
  () =>
    import(
      /* webpackChunkName: "LazyLayout" */ "../01-lazyload/layout/LazyLayout"
    )
);

export const routesArrayModule: RouteInterface[] = [
  {
    to: "/lazyload/",
    // para que todas las rutas que pasen por el path lazyload sean procesadas por ahí se coloca /* es decir, lazyload es parte de la ruta y todo lo que venga después va a ser procesado por ese mismo path lazyload
    path: "/lazyload/*",
    Component: LazyLayout,
    name: "LazyLayout - Dash",
  },
  {
    to: "/no-lazy",
    path: "/no-lazy",
    Component: NoLazyload,
    name: "No Lazy",
  },
];
