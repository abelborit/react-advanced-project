import { ChangeEvent, useState } from "react";

/* como quiero que este useForm sea dinámico, es decir, que acepte cualquier initialForm que le pasemos, no lo pondremos de tipo any porque sino no se podría controlar mucho o no se tendría un tipado tan estricto porque aceptaría cualquier valor y no sabríamos si está bien o mal, entonces lo pondremos de tipo genérico <T>. Esto quiere decir que el tipo de dato que le mandemos, <T>, entonces el initialForm: T será de ese tipo, es decir, si en una implementación de este useForm se le pasan 5 campos entonces este hook aceptará esos 5 campos, si luego se le pasan 10 campos entonces el hook aceptará 10 campos */
export const useForm = <T>(initialForm: T) => {
  const [formState, setFormState] = useState(initialForm);

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleResetForm = () => {
    /* si es algún objeto entonces se va a desestructurar para asegurarse que se está rompiendo la referencia y se están creando objetos nuevos */
    setFormState({ ...initialForm });

    /* se puede colocar así también que es la forma habitual */
    // setFormState(initialForm);
  };

  const isValidEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  return {
    /* retornar usando el operador spread para esparcir todas las propiedades que tenga el formState y poder usarlo como desestructuración de sus propiedades */
    ...formState,

    /* retornar todo el bloque de formState */
    formState,

    /* retornar los métodos */
    handleChangeForm,
    handleResetForm,
    isValidEmail,
  };
};
