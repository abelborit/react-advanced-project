import { ErrorMessage, useField } from "formik";

interface MyTextInputProps {
  label: string;
  name: string;
  type: "text" | "email" | "password";
  placeholder?: string;
  /* y también puede recibir X cantidad de propiedades adicionales que queramos pasarle y se puede ir colocando una a una o sino también de la siguiente forma usando un comodín "[x: string]: any;" que significa que puede recibir cualquier llave que será de tipo string y su valor será cualquier cosa y con este comodín nos permite agregar cualquier cantidad de propiedades adcionales */
  [x: string]: any;
}

export const MyTextInput = (props: MyTextInputProps) => {
  /* este componente MyTextInput será para evitar ser redundante en el código ya que en FormikAbstraction.tsx en lo que retorna el componente había esta secuencia: */
  /*
    <label htmlFor="">XXXXX</label>
    <Field type="" name="" className={} onChange={} />
    <ErrorMessage name="" component="" />
  */
  /* para esto Formik nos ofrece una forma de venir al Formik Context que es creado por el objeto <Formik></Formik> en FormikAbstraction.tsx y con eso podemos ir a ese contexto, tomarlo y traer todas las propiedades que necesitemos y se puede extraer facil con un custom hook de la librería Formik que es useField */

  /* useField() recibe propiedaes que serán las props que queremos colocar en el formulario y esto desestructura un array donde nosotros llamaremos a cada elemento usando los nombres de field y metadata y el tercer elemento serán para otras funcionas que por ahora no usaremos */
  /* field será el onBlur, onChange, name y value */
  /* metadata será error, initialError, initialTouched, initialValue, touched, value */
  const [field, metadata] = useField(props);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <label htmlFor={props.id || props.name}>{props.label}</label>
        {props.type !== "email" && (
          <p
            style={{
              fontSize: "0.8rem",
              color: `${metadata.touched && metadata.error ? "red" : ""}`,
            }}
          >
            ({field?.value ? field?.value?.length : 0} Characters)
          </p>
        )}
      </div>

      {/* aquí se está esparciendo el field y props para hacerlo mucho más flexible y recibir todos las propiedades necesarias */}
      <input {...field} {...props} />

      <ErrorMessage name={props.name} component="span" />

      {/* se hizo de esta forma para conocer qué es lo que traía el hook useField y que probablemente se pueda usar en alguna oportunidad pero en este caso se trabajará con el componente ErrorMessage que nos da Formik */}
      {/* {metadata.touched && metadata.error && (
        <span className="error">{metadata.error}</span>
      )} */}
    </>
  );
};
