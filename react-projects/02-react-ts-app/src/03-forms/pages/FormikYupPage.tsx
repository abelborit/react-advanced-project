import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/styles.css";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
};

export const FormikYupPage = () => {
  /* con el touched nos aseguramos que si un input ha sido y ese input tiene algún error recien se muestre su error y con esto evitamos que todos los inputs (así no se hayan sido tocados) salten con error */
  const {
    // values,
    errors,
    touched,
    // handleChange,
    handleSubmit,
    // handleBlur,
    getFieldProps,
  } = useFormik({
    initialValues: initialForm,
    onSubmit: (values) => {
      /* el onSubmit es la función que se va a ejecutar cuando nuestro formulario pase todas las reglas de validación. Se puede trabajar también de forma asíncrona con el async y await o de forma normal */
      console.log(values);
    },
    /* se usará un validationSchemaBuilder. Esto significa que en lugar de hacerlo todo manual y crear muchos if() else() vamos a crear un validationSchemaBuilder para hacerlo más facil y legible. Formik recomienda usar YUP */
    /* ya no se usa el FormikErrors porque Yup ya lo está haciendo e internamente en validationSchema está usando FormikErrors */
    validationSchema: Yup.object({
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
    }),
    /* puede ser así también */
    // onSubmit(values) {
    //   console.log(values);
    // },
  });

  return (
    <div>
      <h1>Formik Yup Tutorial</h1>
      <p>Formulario usando la libraría Yup junto con la librería Formik.</p>
      <br />

      <form noValidate onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        {/* con getFieldProps nos permite evitar estar usando lo mismo para todos los inputs, es decir, de usar el value, onChange y onBlur, solo mandando el nombre del filedProp que necesito, en este caso sería firstName e incluso con el getFieldProps ya establece el name porque si se descomenta entonces aparece un error "is specified more than once, so this usage will be overwritten". Este getFieldProps regresa un objeto (por eso se está desestructurando) en donde está en onChange, onBlur, value, etc */}
        <input
          type="text"
          // name="firstName"
          // value={values.firstName}
          // onChange={handleChange}
          // onBlur={handleBlur}
          {...getFieldProps("firstName")}
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
          // name="lastName"
          // value={values.lastName}
          // onChange={handleChange}
          // onBlur={handleBlur}
          {...getFieldProps("lastName")}
        />
        {/* nos evitamos colocar esto y hace más limpio el código */}
        {/* <span>Last Name is required</span> */}
        {touched.lastName && errors.lastName && <span>{errors.lastName}</span>}

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          // name="email"
          // value={values.email}
          // onChange={handleChange}
          // onBlur={handleBlur}
          {...getFieldProps("email")}
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
