import { ChangeEvent } from "react";
import { Formik, Form, FormikErrors } from "formik";
import * as Yup from "yup";
import { MyTextInput } from "../components";
import "../styles/styles.css";

interface HandleChangeInterface {
  event: ChangeEvent<HTMLInputElement>;
  setFieldTouched: (
    field: string,
    isTouched?: boolean
  ) => void | Promise<void | FormikErrors<any>>;
  setFieldValue: (
    field: string,
    value: any
  ) => Promise<void | FormikErrors<any>>;
}

const initialForm = {
  name: "",
  email: "",
  password1: "",
  password2: "",
};

/* se coloca afuera para evitar que se cree de nuevo innecesariamente y almacenar espacio en cada renderizado */
const validationSchemaRules = Yup.object({
  /* colocar las reglas para los inputs */
  name: Yup.string()
    .min(2, "Must be 2 characters or more")
    .max(15, "Must be 15 characters or less")
    .required("This input is required"),
  email: Yup.string()
    .email("Invalid email format: example@example.com")
    .required("This input is required"),
  password1: Yup.string()
    .min(6, "Must be 6 characters or more")
    .required("This input is required"),
  /* .oneOf([Yup.ref("password1")]) para que haga referencia al password1 y lo campare a ver si son o no iguales */
  password2: Yup.string()
    .oneOf([Yup.ref("password1")], "The passwords must be equal")
    .required("This input is required"),
});

export const FormikBasicNoDynamic = () => {
  const handleChangeManual = ({
    event,
    setFieldTouched,
    setFieldValue,
  }: HandleChangeInterface) => {
    // setFieldTouched viene del objeto formik, sirve para "tocar" el campo dependiendo del name
    // setFieldValue viene del objeto formik, sirve para asignar el valor a un campo dependiendo del name
    setFieldTouched(event.target.name, true);
    setFieldValue(event.target.name, event.target.value);
  };

  return (
    <div>
      <h1>Formik Basic No Dynamic Form</h1>
      <p>Formulario básico NO DINÁMICO creado con la librería Formik.</p>
      <br />

      <Formik
        initialValues={initialForm}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={validationSchemaRules}
      >
        {(formik) => (
          <Form>
            <MyTextInput
              label="Nombre"
              name="name"
              type="text"
              placeholder="Colocar un nombre"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleChangeManual({
                  event,
                  setFieldTouched: formik.setFieldTouched,
                  setFieldValue: formik.setFieldValue,
                })
              }
            />

            <MyTextInput
              label="Email"
              name="email"
              type="email"
              placeholder="correo@correo.com"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleChangeManual({
                  event,
                  setFieldTouched: formik.setFieldTouched,
                  setFieldValue: formik.setFieldValue,
                })
              }
            />

            <MyTextInput
              label="Password"
              name="password1"
              type="password"
              placeholder="**********"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleChangeManual({
                  event,
                  setFieldTouched: formik.setFieldTouched,
                  setFieldValue: formik.setFieldValue,
                })
              }
            />

            <MyTextInput
              label="Repeat Password"
              name="password2"
              type="password"
              placeholder="**********"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleChangeManual({
                  event,
                  setFieldTouched: formik.setFieldTouched,
                  setFieldValue: formik.setFieldValue,
                })
              }
            />

            <button type="submit">Send Form</button>

            <button type="button" onClick={formik.handleReset}>
              Reset Form
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
