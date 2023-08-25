// enum es una característica propia de Typescript para trabajar con un arreglo de constantes. A diferencia de interface o type, enum SÍ genera código javascript al compilar
export enum counterActionsTypes {
  increaseBy = "increaseBy",
  reset = "reset",
}

// para las acciones se acostumbra a trabajar con type y no con interface porque el type no va a extenderse, no va a crecer o incrementar pero se podría trabajar con type o interface tranquilamente
// algo específico de los type es que se puede colocar así "type NameOfType = | typeNum1 | typeNum2 | interfaceNum3" para indicar que puede ser de tipo1 o tipo2 o una interface3, a esto se llama unión de tipos
export type CounterAction =
  | { type: counterActionsTypes.increaseBy; payload: { value: number } }
  | { type: counterActionsTypes.reset };

// actions creators son creadores de acciones y sirven para evitar estar cambiando en todo lados el nombre de la acción, ya con esto se hace más facil. Se estipula o es casi normal que comience con el do y luego el nombre de la acción pero uno la puede llamar como quiera
// https://read.reduxbook.com/markdown/part1/04-action-creators.html
export const doReset = (): CounterAction => {
  return {
    type: counterActionsTypes.reset,
  };
};
// haciendo un return implícito colocando ({})
// export const doReset = (): CounterAction => ({ type: counterActionsTypes.reset });

export const doIncreaseBy = (valueArgs: number = 1): CounterAction => {
  return {
    type: counterActionsTypes.increaseBy,
    payload: { value: valueArgs },
  };
};
