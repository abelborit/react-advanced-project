import { ErrorMessage, useField } from "formik";

interface MySelectInputProps {
  label: string;
  name: string;
  placeholder?: string;
  [x: string]: any;
}

/* para hacer un multiselect: */
/* Se tiene que cambiar:
1- los initialValues en el FormikAbstraction ( jobType: [])
2- las validaciones( jobType: Yup.array().of( Yup.string().required("no puedes seleccionar la opcion por defecto")).min(1,'debes seleccionar al menos una opcion') )
3- le pasas multiple={true}
(  <MySelect label="Choose your job Type" name="jobType"   multiple={true} ...

Esta propiedad que se puso [x:string]:any hará la magia... */

export const MySelectInput = (props: MySelectInputProps) => {
  const [field /* ,metadata */] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{props.label}</label>

      {/* aquí se está esparciendo el field y props para hacerlo mucho más flexible y recibir todos las propiedades necesarias */}
      {/* aquí no se está colocando los option que deberían ir porque al momento de esparcir las props estas también reciben los hijos donde todo esto sería un HOC */}
      <select {...field} {...props} />

      <ErrorMessage name={props.name} component="span" />

      {/* se hizo de esta forma para conocer qué es lo que traía el hook useField y que probablemente se pueda usar en alguna oportunidad pero en este caso se trabajará con el componente ErrorMessage que nos da Formik */}
      {/* {metadata.touched && metadata.error && (
        <span className="error">{metadata.error}</span>
      )} */}
    </>
  );
};
