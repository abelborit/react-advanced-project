import { Suspense } from "react";
import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { routesArray } from "./routes";

import reactLogo from "../assets/react.svg";

// *****Colocar funciones fuera de la función principal en componentes de React es una buena práctica por varias razones (LEER EL ARCHIVO README.md)*****

// la función "navRoutesDynamic = () => {}" me va retornar un arreglo de elementos JSX de React por eso se coloca el siguiente tipo ":JSX.Element[]"
const navRoutesDynamic = (): JSX.Element[] => {
  return routesArray.map((routeElement) => (
    <li key={routeElement.to}>
      <NavLink
        to={routeElement.to}
        className={({ isActive }) => (isActive ? "nav-active" : "")}
      >
        {routeElement.name}
      </NavLink>
    </li>
  ));
};

// la función "routesDynamic = () => {}" me va retornar un arreglo de elementos de React por eso se coloca el siguiente tipo ":React.ReactElement[] | null" (se puede visualizar el tipo pasando el mouse por encima de <Route />)
const routesDynamic = (): React.ReactElement[] | null => {
  return routesArray.map((routeElement) => (
    <Route
      key={routeElement.path}
      path={routeElement.path}
      element={<routeElement.Component />}
    />
  ));
};

// cuando se trabaja con lazy loading es necesario colocar el <Suspense></Suspense> que tendrá un fallback para que cargue un elemento de UI que indique que se está cargando el módulo solicitado
export const NavigationLayout = () => {
  return (
    // también se puede colocar fallback={null} pero no renderizaría ningún loader o algo similar y al cambiar entre páginas (la primera vez) habría como un pequeño flash y afectaría relativamente la experencia del usuario, luego ya la segunda vez al cambiar entre páginas (sin refrescar el navegador) ya no habría el flash mencionado porque estos cambios o chunks (visualizar la pestaña network de devtools del navegador) ya están guardados en memoria y carga fluidamente
    <Suspense fallback={<span>Cargando...</span>}>
      <BrowserRouter>
        <div className="main-layout">
          <nav>
            <img src={reactLogo} alt="react-logo" />
            {/* como función */}
            <ul>{navRoutesDynamic()}</ul>

            {/* de forma directa */}
            {/* <ul>
            {routesArray.map((routeElement) => (
              <li key={routeElement.to}>
                <NavLink
                  to={routeElement.to}
                  className={({ isActive }) => (isActive ? "nav-active" : "")}
                >
                  {routeElement.name}
                </NavLink>
              </li>
            ))}
          </ul> */}
          </nav>

          <div className="routes-layout">
            <Routes>
              {/* como función */}
              {routesDynamic()}

              {/* de forma directa */}
              {/* {routesArray.map((routeElement) => (
              <Route
                key={routeElement.path}
                path={routeElement.path}
                element={<routeElement.Component />}
              />
            ))} */}

              <Route
                path="/*"
                element={<Navigate to={routesArray[0].to} replace />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Suspense>
  );
};
