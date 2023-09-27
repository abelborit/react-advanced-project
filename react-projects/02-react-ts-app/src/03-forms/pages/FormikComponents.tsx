import { ChangeEvent } from "react";
import { Formik, Form, Field, ErrorMessage, FormikErrors } from "formik";
import * as Yup from "yup";
import "../styles/styles.css";

/* sale warning con los "any" ya que se debería evitar su uso pero en este caso se dejará así */
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
  firstName: "",
  lastName: "",
  email: "",
  terms: false,
  jobType: "",
};

export const FormikComponents = () => {
  /* se crea la función handleChangeManual porque en las validaciones, por ejemplo de longitud máxima de un string, son ejecutadas en dos escenarios: si se envía el formulario y si se visita el campo y posteriormente se vuelve a el. Entonces si la pagina es cargada y el usuario empieza a digitar en el campo inmediatamente luego de la carga, esta validación no se aplica (y el usuario podría escribir el firstname de la longitud que desee) ya que no se presentó ninguno de los casos anteriores entonces se hace esta función de forma manual */
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
      <h1>Formik Components</h1>
      <p>
        Formulario usando la libraría Yup junto con la librería Formik y
        aplicando sus propios componentes.
      </p>
      <br />
      {/* Estos componentes utilizan en el fondo una configuración del context, es decir se crea un context provider el cual proporciona la información que viene del useFormik, y los props que se muestran en la URL son los props que le estamos colocando nosotros (initialValues, onSubmit, validationSchema) y son los que le tenemos que enviar al contexto para que ese contexto distribuya todo ese objeto a lo largo de todos sus hijos. Según la URL se puden pasar los hijos ya sea como funciones o como componente según vimos en los patrones. Se puede aplicar lo mismo que muestra la URL y crear el contexto y su configuración pero lo haremos de una forma un poco más sencilla evitando crear el contexto para proporcionar la información de nuestro formulario y recien usar los componentes de Formik. (https://formik.org/docs/tutorial#leveraging-react-context) */}

      {/* Formik es un componente porque retorna un JSX.Element. Lo que se está haciendo aquí es que en vez de usar el hook de useFormik se está colocando directamente en el objeto de Formik y eso nos ayuda a ya no usar todo el hook de useFormik y su código, aunque relativamente es el mismo código, solo que el componente Formik ya lo trabaja internamente */}
      <Formik
        initialValues={initialForm}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          /* colocar las reglas para los inputs */
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("This input is required"),
          lastName: Yup.string()
            .max(12, "Must be 12 characters or less")
            .required("This input is required"),
          email: Yup.string()
            .email("Invalid email format")
            .required("This input is required"),
          /* en los checkbox para validar que esté activado, es decir, que sea true, entonces se le coloca oneOf que se le pasa un arreglo y solo puede tomar un valor de ahí que en este caso le pasaremos el true */
          // terms: Yup.boolean().oneOf(
          //   [true],
          //   "Must accept Terms and Conditions"
          // ),
          /* también se puede usar isTrue para validar los checkbox */
          terms: Yup.boolean().isTrue("Must accept Terms and Conditions"),
          jobType: Yup.string()
            .required("This input is required")
            .notOneOf(["it-junior"], "This option is not valid yet."),
        })}
      >
        {/* trabajarlo así usando una función pasada como un children dentro de un HOC me da la facilidad que pueda tener todo el objeto de Formik ahí en la expresión formik */}
        {/* NOTA: si se usa MUI entonces no se podría usar el Field y ErrorMessage, se debería desestructurar de la función el handleBlur, el getFieldProps, etc, y colocarlo según las necesidades en los componentes de MUI */}
        {(formik) => (
          /* al usar el Form de los componentes de Formik ya no es necesario usar el onSubmit porque el Form ya sabe lo que tiene que hacer al mandar el formulario */
          <Form>
            {/* en vez de usar los inputs clásicos se usará el componente Field de la librería Formik pero necesita ciertas propiedades para saber qué elemento de mi formulario va a controlar entonces se le coloca el name y también el type para saber qué tipo será el input */}
            {/* en vez de usar los mensajes de error clásicos con sus condicionales para que aparezcan o no, se puede usar el componente ErrorMessage que también necesita que especifique cuál es el campo que va a manejar ese error, es decir, qué errores de qué campo se colocarán aquí. El ErrorMessage es literalmente un texto, entonces se puede colocar dentro de un span para que tome los estilos que se colocaron pero también se puede pasar una propiedad component para definir qué tipo de componente será */}
            <label htmlFor="firstName">First Name</label>
            <Field
              type="text"
              name="firstName"
              className={
                formik.touched.firstName && formik.errors.firstName
                  ? "has-error"
                  : ""
              }
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleChangeManual({
                  event,
                  setFieldTouched: formik.setFieldTouched,
                  setFieldValue: formik.setFieldValue,
                })
              }
            />
            <span>
              <ErrorMessage name="firstName" />
            </span>

            <label htmlFor="lastName">Last Name</label>
            <Field
              type="text"
              name="lastName"
              className={
                formik.touched.lastName && formik.errors.lastName
                  ? "has-error"
                  : ""
              }
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleChangeManual({
                  event,
                  setFieldTouched: formik.setFieldTouched,
                  setFieldValue: formik.setFieldValue,
                })
              }
            />
            <ErrorMessage name="lastName" component="span" />

            <label htmlFor="email">Email Address</label>
            <Field
              type="email"
              name="email"
              className={
                formik.touched.email && formik.errors.email ? "has-error" : ""
              }
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleChangeManual({
                  event,
                  setFieldTouched: formik.setFieldTouched,
                  setFieldValue: formik.setFieldValue,
                })
              }
            />
            <ErrorMessage name="email" component="span" />

            {/* para los inputs que son select no es type="select" sino se coloca con as="select" */}
            <label htmlFor="jobType">Job Type</label>
            <Field
              as="select"
              name="jobType"
              className={
                formik.touched.jobType && formik.errors.jobType
                  ? "has-error"
                  : ""
              }
            >
              <option value="">----------</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="it-senior">IT Senior</option>
              <option value="it-junior">IT Junior</option>
            </Field>
            <ErrorMessage name="jobType" component="span" />

            <label>
              <Field
                type="checkbox"
                name="terms"
                className={
                  formik.touched.terms && formik.errors.terms ? "has-error" : ""
                }
              />
              Terms and Conditions
            </label>
            <ErrorMessage name="terms" component="span" />

            <button type="submit">Send Form</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
