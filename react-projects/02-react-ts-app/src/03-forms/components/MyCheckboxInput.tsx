import { ErrorMessage, useField } from "formik";

interface MyCheckboxInputProps {
  label: string;
  name: string;
  [x: string]: any;
}

export const MyCheckboxInput = (props: MyCheckboxInputProps) => {
  const [field /* ,metadata */] = useField({ ...props, type: "checkbox" });

  return (
    <>
      {/* se comenta porque sino no funciona lo del label de hacer click y te manda al input */}
      <label /* htmlFor={props.id || props.name} */>
        <input type="checkbox" {...field} {...props} />
        {props.label}
      </label>

      <ErrorMessage name={props.name} component="span" />

      {/* se hizo de esta forma para conocer qué es lo que traía el hook useField y que probablemente se pueda usar en alguna oportunidad pero en este caso se trabajará con el componente ErrorMessage que nos da Formik */}
      {/* {metadata.touched && metadata.error && (
        <span className="error">{metadata.error}</span>
      )} */}
    </>
  );
};
