import { ChangeEvent } from "react";
import { Formik, Form, FormikErrors } from "formik";
import * as Yup from "yup";
import { MySelectInput, MyTextInput } from "../components";
import formDataJSON from "../data/custom-form.json";
import "../styles/styles.css";

/* crear el initialForm pero si se coloca en código duro los campos entonces ya no sería dinámicos. La idea es que basado en la data que se envía desde el JSON se creen los campos. En este caso al tiparlo entonces se dice que será cualquier key o propiedad la cual es de tipo string y esta tendrá como value cualquier tipo (string, number, boolean, etc) */
const initialForm: { [key: string]: any } = {};
const requiredInputs: { [key: string]: any } = {};

/* se crea el ciclo for of para que en initialForm se puedan crear las llaves/valor a partir del formDataJSON y con eso no de ningún error al escribir en el formulario ya que sin eso entonces signfica que al escribir en el input estará buscando el name el cual no existe porque aún no se ha creado entonces cuando se escriba recién lo crea y por eso aparece que es un formulario no controlado */
for (const input of formDataJSON) {
  initialForm[input.name] = input.value;

  /* se coloca continue porque me encuentro dentro de un ciclo y si dentro de los inputs no encuentra validations entonces que este ciclo no se corte y solo continúe, si coloco return entonces se cortaría el ciclo y eso no queremos */
  if (!input.validations) continue;

  /* crear el esquema de forma individual por cada campo */
  let schemaRules = Yup.string();

  for (const rule of input.validations) {
    if (rule.type === "required") {
      schemaRules = schemaRules.required("This input is required");
    }

    if (rule.type === "minLength") {
      schemaRules = schemaRules.min(
        (rule as any).value || 2,
        `Must be ${(rule as any).value || 2} characters or more`
      );
    }

    if (rule.type === "email") {
      schemaRules = schemaRules.email(
        "Invalid email format: example@example.com"
      );
    }

    // ..... otras reglas de validación
  }

  requiredInputs[input.name] = schemaRules;
}

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

/* se coloca afuera para evitar que se cree de nuevo innecesariamente y almacenar espacio en cada renderizado */
const validationSchemaRules = Yup.object({ ...requiredInputs });

/* la idea de los formularios dinámicos es que se creen en el momento de ejecución. Puede ser que desde el backend nos manden un formulario o tener configuración de un formulario en un formato JSON que sería como recibir la respuesta de una petición HTTP porque se recibe un JSON. Entonces basado en un JSON se crearía un formulario */
export const FormikBasicDynamic = () => {
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
      <h1>Formik Basic Dynamic Form</h1>
      <p>Formulario básico DINÁMICO creado con la librería Formik.</p>
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
            {/* se coloca type={formDataElement.type as any} porque el type espera que sea text | email | password pero como no sabemos que tipo será, por lo tanto, es necesario especificar que puede ser de cualquier tipo.*/}
            {formDataJSON.map((formDataElement) => {
              if (
                formDataElement.type === "input" ||
                formDataElement.type === "password" ||
                formDataElement.type === "email"
              ) {
                return (
                  <MyTextInput
                    key={formDataElement.name}
                    label={formDataElement.label}
                    name={formDataElement.name}
                    type={formDataElement.type as any}
                    placeholder={formDataElement.placeholder}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleChangeManual({
                        event,
                        setFieldTouched: formik.setFieldTouched,
                        setFieldValue: formik.setFieldValue,
                      })
                    }
                  />
                );
              } else if (formDataElement.type === "select") {
                return (
                  <MySelectInput
                    key={formDataElement.name}
                    label={formDataElement.label}
                    name={formDataElement.name}
                    type={formDataElement.type}
                  >
                    <option value="">Select an option</option>
                    {formDataElement.options?.map((elementOption) => (
                      <option key={elementOption.id} value={elementOption.id}>
                        {elementOption.optionName}
                      </option>
                    ))}
                  </MySelectInput>
                );
              }
            })}

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
