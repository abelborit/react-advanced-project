// import { NavigationLayout } from "./routes/NavigationLayout";
import { NavigationLayoutModules } from "./routes/NavigationLayoutModules";

import "./App.css";

function App() {
  return (
    <>
      {/* <h1>React + TypeScript (App)</h1> */}

      {/* aplicando lazy loading en los componentes */}
      {/* <NavigationLayout /> */}

      {/* aplicando lazy loading como módulos */}
      <NavigationLayoutModules />
    </>
  );
}

export default App;
