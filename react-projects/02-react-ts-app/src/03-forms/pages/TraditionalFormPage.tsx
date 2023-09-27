import { FormEvent } from "react";
import { useForm } from "../hooks/useForm";
import "../styles/styles.css";

const initialForm = {
  name: "",
  email: "",
  password1: "",
  password2: "",
};

export const TraditionalFormPage = () => {
  /* para que sea robusto nuestro hook useForm entonces se tendrían que hacer varias mejoras, por ejemplo, mandarle también las validaciones, de repente también una función que haga submit para que tome esas validaciones y si son correctas entonces mande la información, y así muchas más mejoras */
  const { formState, handleChangeForm, handleResetForm, isValidEmail } =
    useForm(initialForm);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <div>
      <h1>Traditional Form</h1>
      <p>Formulario tradicional creado con los hooks de React.</p>
      <br />

      <form noValidate onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formState.name}
          onChange={handleChangeForm}
          className={`${formState.name.length <= 0 && "has-error"}`}
        />
        {formState.name.length <= 0 && <span>Este campo es necesario</span>}

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formState.email}
          onChange={handleChangeForm}
          className={`${!isValidEmail(formState.email) && "has-error"}`}
        />
        {!isValidEmail(formState.email) && <span>Email no es válido</span>}

        <input
          type="password"
          placeholder="Password"
          name="password1"
          value={formState.password1}
          onChange={handleChangeForm}
        />
        {formState.password1.length <= 0 && (
          <span>Este campo es necesario</span>
        )}
        {formState.password1.length < 6 && formState.password1.length > 0 && (
          <span>La contraseña debe tener más de 6 caracteres</span>
        )}

        <input
          type="password"
          placeholder="Repeat Password"
          name="password2"
          value={formState.password2}
          onChange={handleChangeForm}
        />
        {formState.password2.length <= 0 && (
          <span>Este campo es necesario</span>
        )}
        {formState.password2.length > 0 &&
          formState.password1 !== formState.password2 && (
            <span>Las contraseñas deben de ser iguales</span>
          )}

        <button type="submit">Send Form</button>

        <button type="button" onClick={handleResetForm}>
          Reset Form
        </button>
      </form>
    </div>
  );
};
