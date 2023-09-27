import { FormikErrors, useFormik } from "formik";
import "../styles/styles.css";

interface FormValuesInterface {
  firstName: string;
  lastName: string;
  email: string;
}

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
};

/* al crearlo de esta forma con validateFunction vemos que hay bastante código y lógica porque si hay mas inputs en el formulario entonces en validateFunction se requieren más if() else() para cubrir todas las validaciones correspondientes, para esto se puede sacar esa función a otro archivo y que sea solo de validaciones pero ahora se usará un validationSchemaBuilder. Esto significa que en lugar de hacerlo todo manual y crear muchos if() else() vamos a crear un validationSchemaBuilder para hacerlo más facil y legible. Formik recomienda usar YUP como en el archivo FormikBasicPage.tsx */

export const FormikBasicPage = () => {
  /* se está haciendo como función aparte y con interface para no sobre cargar tanto el useFormik y perder la legibilidad. Si se quiere hacer de forma directa en el useFormik ya no sería tan necesario la interface porque ya la función validate: (values) => { cuerpo de la función para las validaciones} sabría qué forma tendrá el formulario */
  /* validateFunction recibe los values del formulario en el momento actual que se está usando pero entonces esos values tienen que ser del mismo tipo o forma con el que se está trabajando en el initialForm y por eso se crea la interface */
  const validateFunction = (values: FormValuesInterface) => {
    /* este objeto errors tendrá todos los errores de las validaciones y el cual interpretará formik para saber qué errores hay. Este es un objeto literal en JavaScript pero necesita tener cierto tipado el cual es FormikErrors y este al ser de tipo genérico necesita saber qué errores o llaves va a tener ese error, entonces se le especifica la interface FormValuesInterface y quedaría así FormikErrors<FormValuesInterface> */
    const errors: FormikErrors<FormValuesInterface> = {};

    /* hacer las validaciones que en este caso parece más tedioso hacerlo así porque hay mucho código pero lo que se gana es que se hace en un solo objeto de validaciones y ya nos evitamos hacer doble validación, una por el lado del input como tal y otra validación al hacer el submit  */
    if (!values.firstName) {
      errors.firstName = "This input is required";
    } else if (values.firstName.length >= 12) {
      errors.firstName = "Must be 12 characters or less";
    }

    if (!values.lastName) {
      errors.lastName = "This input is required";
    } else if (values.lastName.length >= 10) {
      errors.lastName = "Must be 10 characters or less";
    }

    if (!values.email) {
      errors.email = "This input is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email format";
    }

    /* esta función validateFunction tendría que regresar los errores */
    return errors;
  };

  /* con el touched nos aseguramos que si un input ha sido y ese input tiene algún error recien se muestre su error y con esto evitamos que todos los inputs (así no se hayan sido tocados) salten con error */
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: initialForm,
      onSubmit: (values) => {
        /* el onSubmit es la función que se va a ejecutar cuando nuestro formulario pase todas las reglas de validación. Se puede trabajar también de forma asíncrona con el async y await o de forma normal */
        console.log(values);
      },
      validate: validateFunction,
      /* puede ser así también */
      // onSubmit(values) {
      //   console.log(values);
      // },
      // validate: (values) => { cuerpo de la función para las validaciones}
    });

  return (
    <div>
      <h1>Formik Basic Tutorial</h1>
      <p>Formulario básico creado con la librería Formik.</p>
      <br />

      <form noValidate onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {/* si errors.firstName existe se muestra el span y se vuelve a colocar errors.firstName para mostrar el error como tal puesto arriba en la función validateFunction */}
        {/* nos evitamos colocar esto y hace más limpio el código */}
        {/* <span>First Name is required</span> */}
        {touched.firstName && errors.firstName && (
          <span>{errors.firstName}</span>
        )}

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {/* nos evitamos colocar esto y hace más limpio el código */}
        {/* <span>Last Name is required</span> */}
        {touched.lastName && errors.lastName && <span>{errors.lastName}</span>}

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {/* nos evitamos colocar esto y hace más limpio el código */}
        {/* <span>Email is required</span> */}
        {/* <span>Check for an valid email format</span> */}
        {touched.email && errors.email && <span>{errors.email}</span>}

        <button type="submit">Send Form</button>
      </form>
    </div>
  );
};
