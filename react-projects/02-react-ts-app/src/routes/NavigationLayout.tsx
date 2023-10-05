import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import {
  TraditionalFormPage,
  FormikBasicPage,
  FormikYupPage,
  FormikComponents,
  FormikAbstraction,
  FormikBasicNoDynamic,
  FormikBasicDynamic,
} from "../03-forms/pages";

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
                to="/traditional-form"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                Traditional Form
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/formik-basic"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                Formik Basic
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/formik-yup"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                Formik Yup
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/formik-components"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                Formik Components
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/formik-abstraction"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                Formik Abstraction
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/formik-basic-no-dynamic"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                Formik Basic No Dynamic
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/formik-basic-dynamic"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                Formik Basic Dynamic
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/users"
                className={({ isActive }) => (isActive ? "nav-active" : "")}
              >
                Users
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="routes-layout">
          <Routes>
            <Route path="/traditional-form" element={<TraditionalFormPage />} />
            <Route path="/formik-basic" element={<FormikBasicPage />} />
            <Route path="/formik-yup" element={<FormikYupPage />} />
            <Route path="/formik-components" element={<FormikComponents />} />
            <Route path="/formik-abstraction" element={<FormikAbstraction />} />
            <Route
              path="/formik-basic-no-dynamic"
              element={<FormikBasicNoDynamic />}
            />
            <Route
              path="/formik-basic-dynamic"
              element={<FormikBasicDynamic />}
            />
            <Route path="/users" element={<h1>Users Page</h1>} />

            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};
