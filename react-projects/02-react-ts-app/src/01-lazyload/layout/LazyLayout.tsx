import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { LazyPage1, LazyPage2, LazyPage3 } from "../pages";

export const LazyLayout = () => {
  return (
    <div>
      <h1>LazyLayout Page</h1>

      {/* estos to="/lazy1" o to="/lazy2" o to="/lazy3" vienen a ser el /* de /lazyload/* que está en routes.ts en el array routesArrayModule */}
      <ul>
        <li>
          <NavLink to="/">Principal Page</NavLink>
        </li>
        <li>
          <NavLink to="lazy1">Lazy 1</NavLink>
        </li>
        <li>
          <NavLink to="lazy2">Lazy 2</NavLink>
        </li>
        <li>
          <NavLink to="lazy3">Lazy 3</NavLink>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<h1>Principal Page</h1>} />
        <Route path="lazy1" element={<LazyPage1 />} />
        <Route path="lazy2" element={<LazyPage2 />} />
        <Route path="lazy3" element={<LazyPage3 />} />

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
};

export default LazyLayout;
