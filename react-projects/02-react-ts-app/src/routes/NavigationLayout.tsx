import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { LazyPage1, LazyPage2, LazyPage3 } from "../01-lazyload/pages";

import reactLogo from "../assets/react.svg";

export const NavigationLayout = () => {
  return (
    <BrowserRouter>
      <div className="main-layout">
        <nav>
          <img src={reactLogo} alt="react-logo" />
          <ul>
            <li>
              <NavLink
                to="/lazy1"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                Lazy 1
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/lazy2"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                Lazy 2
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/lazy3"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                Lazy 3
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="routes-layout">
          <Routes>
            <Route path="/lazy1" element={<LazyPage1 />} />
            <Route path="/lazy2" element={<LazyPage2 />} />
            <Route path="/lazy3" element={<LazyPage3 />} />

            <Route path="*" element={<Navigate to="/lazy1" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
