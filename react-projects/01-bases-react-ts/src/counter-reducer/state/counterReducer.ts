import { CounterAction, counterActionsTypes } from "../actions/counterActions";
import { CounterState } from "../interfaces/counterInterfaces";

export const counterReducer = (
  state: CounterState,
  action: CounterAction
): CounterState => {
  switch (action.type) {
    case counterActionsTypes.reset:
      return {
        counter: 0,
        previous: 0,
        changes: 0,
      };

    case counterActionsTypes.increaseBy:
      return {
        counter: state.counter + action.payload.value,
        previous: state.counter,
        changes: state.changes + 1,
      };

    default:
      return state;
  }
};
