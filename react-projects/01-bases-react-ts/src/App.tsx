import { Counter } from "./components/Counter";
import { CounterBy } from "./components/CounterBy";
import { CounterEffect } from "./components/CounterEffect";
import { CounterHookComponent } from "./components/CounterHookComponent";
import { CounterReducerComponentOneFile } from "./components/CounterReducerComponent";
import { CounterReducerComponent } from "./counter-reducer/CounterReducerComponent";
import "./App.css";

function App() {
  return (
    <>
      <h1>React + TypeScript (bases)</h1>
      <hr />
      <br />

      <Counter initialValue={10} />
      <br />
      <br />
      <CounterBy />
      <br />
      <br />
      <CounterEffect />
      <br />
      <br />
      <CounterHookComponent />
      <br />
      <br />
      <CounterReducerComponentOneFile />
      <br />
      <br />
      <CounterReducerComponent />
    </>
  );
}

export default App;
