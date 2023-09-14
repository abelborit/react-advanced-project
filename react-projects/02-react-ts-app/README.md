# Proyecto con React y TypeScript

---

## 2. Patrones de componentes: Compound Component Pattern (Patrón de Componente Compuesto / Composición de componentes)

Se usa el patrón de construcción de componentes llamado "Compound Component Pattern" el cual es muy usado por Material UI, ionic y muchos otros que trabajan con componentes previamente creados que se pueden anidar entre si mediante HOCs (Higher Order Components)

- ### 2.1 Patrones de componentes: Extensible Styles (Extensión de estilos)

  Con la implementación anterior del Compound Component Pattern, hay algunos problemas a solucionar como por ejemplo los estilos, porque si se coloca un estilo mediante className o estilos en linea o clases por módulos, estos estilos no llegan a los componentes hijos o puede ser que sí lleguen pero no cumplan la función que estábamos esperando.

  Por eso se usará el patrón "Extensible Styles" para extender la funcionalidad de nuestros componentes añadiendo la posibilidad de interpretar clases de CSS y/o estilos en línea (inline styles). Para lograrlo es necesario realizar ciertas modificaciones a las interfaces y componentes para tener un componente personalizable.

  En ShoppingPage.tsx en los componentes ProductCard, ProductImage, ProductTitle y ProductButtons si quisiera añadir un className o estilos en línea con el atributo style, daría un error usando TypeScript diciendo en pocas palabras que className o style no es asignable a las propiedades definidas en el componente ProductCard o ProductImage o ProductTitle o ProductButtons, para solucionar eso, se usará este patrón y poder pasar estilos o clases a los componentes y estos puedan interpretarlos.

- ### 2.2 Patrones de componentes: Control Props (Control de Propiedades)

  La idea con este patrón es ser capaz de controlar el estado interno y la emisión de los valores del componente a través de las propiedades, es decir, darle el control al desarrollador sobre las propiedades y estado del componente.

  En este ejercicio se hará que unas cards del dashboard principal estén sincronizadas con unas cards más pequeñas que aparecerán en el extremo superior derecho simulando que es un carrito de compras. Al aumentar o disminuir la cantidad del producto tanto en el dashboard principal o en el carrito, ambos lugares deberían tener la misma cantidad.

  Usualmente este patrón es el que se utiliza de manera tradicional en formularios, es decir:

  ```
  <input
    value={ algún valor de solo lectura }
    onChange={ alguna función que cambia el valor }
  />
  ```

- ### 2.3 Patrones de componentes: State Initializer + Function Child + Render Props

  Aquí se utilizará el patrón State Initializer junto al diseño de componentes que utiliza Formik.

  Este patrón lo usa Formik que es una librería que se encarga de trabajar con formularios. La forma de trabajar de Formik es que nos crea un objeto en donde dentro de este objeto vamos a tener el control absoluto de lo que suecede en el componente o en los componentes que van a estar internamente.

  Usando este patrón vamos a tener el control de cómo se renderizan, tener el control del estado inicial, poder cambiar el valor que tienen internamente nuestros componentes con el fin de que los desarrolladores que usen estos componentes tengan el poder de cambiar lo que desean o sino que nosotros le demos el poder de cambiar solo lo que nosotros queremos o lo necesario.

  El patrón principalmente pide que se pueda ofrecer un estado inicial y una forma de re-establecer el estado a su forma original, pero aquí también se mejorará exponiendo funciones y nuevas propiedades. También se enviará una función como children, similar a la implementación de Formik.

---

## Subir el proyeto a NPM

- Lo realizado se subirá a NPM y para eso se está dejando una guía del paso a paso (Desplegar-NPM.pdf) de una opción de cómo se podría subir a NPM y aquí también algunas instrucciones o información adicional.
- Para poder desplegar en NPM se tiene que crear un proyecto usando la estructura de archivos y directorios que pide NPM para poder deplegarlo ahí. No es tanto una aplicación propia de react pero sería algo parecido.
- Por ejemplo, al ir a NPM y ver algún paquete, NPM tiene ciertos lineamitos para poder desplegarlo ahí:
  - La carpeta dist que sería el build de la aplicación
  - Un ejemplo del uso del paquete (opcional)
  - La carpeta lib que es en donde se colocará el código, sería como el src
  - La carpeta test que son para las pruebas para demostrar que los componentes funcionan según lo esperado
  - Archivo de LICENSE para saber que licencia va a tener el paquete, se puede usar el MIT que sería suficiente para este proyecto
  - El archivo package.json sumándole algunas cosas:
    - name
    - version
    - description
    - main (punto de entrada de la aplicación)
    - types (archivo de definición de TypeScript)
    - scripts
    - repository (para que aparezca en NPM)
    - keywords
    - homepage
- Se utilizará tsdx ya que creará todo lo necesario para que sea un paquete que se pueda subir facilmente a NPM. Esto creará una nueva carpeta donde se tendrá que migrar el códido del proyecto al código del paquete.

#### Estructura del proyecto que nos creo TSDX

- Con la estructura que nos creó TSDX es todo lo necesario para poder hacer el despliegue de nuestro proyecto, que ahora será un paquete, hacia NPM.
- Luego desde este proyecto se pasarán algunas cosas al paquete: assets, components, hooks (solo useProduct.ts), interfaces, styles y de pages solo el componente ProductCard y sus hijos como tal para tenerlo como un ejemplo.
- En el index.tsx del src del ahora paquete que se subirá a NPM, se colocarán todas las exportaciones que serán vistas desde el mundo exterior, es decir, lo que el desarrollador utilizará e importará en su proyecto. Para esto solo se necesitaría exportar los componentes ya que solo eso quiero que se exponga ya que lo demás quedaría de forma interna, se podría copiar lo que está en el archivo barril del index.ts de la carpeta components o sino se puede hacer una exportación de todo lo que está adentro "export \* from './components';" donde se hará referencia a todo lo que tenga el archivo barril.
- Cuando se quieran usar css modules, dará un error cuando se haga el npm run start porque dirá que se quieren usar archivos de css como si fueran de javascript, y para solucionar esto se tienen que hacer algunas configuraciones para permitir importaciones de estilos css como módulos.
  - La configuración que se tiene que hacer está en el PDF del proyecto (Desplegar-NPM.pdf) en el paso 03 pero esta configuración se tiene que hacer por dos razones, una si se usan los css modules y otra si se usan imágenes ya que estas también se están cargando como módulos por ejemplo en el componente ProductImage.tsx. Se creará un archivo tsdx.config.js y cuando se haga un build o cualquier procedimiento pasará por ese archivo y también darse cuenta que se está haciendo la importación tipica de NODE usando require y no de ECMAScript-6 con import y eso es porque se está en node y no es un archivo de typescript y si se quiere hacer usando import se tendrían que hacer unas configuraciones especiales al proyecto y entonces por eso se trabaja como se haría con node por defecto.
  - Se tiene que colocar en las devDependencies "@rollup/plugin-image": "^2.1.1" y "rollup-plugin-postcss": "^4.0.1" o sino instalarlo usando npm i -D rollup-plugin-postcss@4.0.1 y npm i -D @rollup/plugin-image@2.1.1 (según lo que se utilizó en el video, si se usará la versión más reciente de cada uno entonces ver qué nueva configuración se necesita hacer). Se instalan para decirle a TSDX o al proyecto cómo cargar las imágenes y los css modules.
- Con el paso anterior se seguirá con el problema entonces se tiene que crear el archivo de definición de los módulos que vienen a ser los typings los cuales dirán a typescript cómo cargar lo módulos. Este archivo typings.d.ts estará en el src del paquete y tendrá:

  ```ts
  declare module "*.css" {
    const content: { [className: string]: string };
    export default content;
  }

  declare module "*.jpg" {
    const value: any;
    export default value;
  }
  ```

- Tenemos que hacer la importación de React (import React from 'react';) en donde hayan componentes porque regresan un JSX porque si no nos saldrá un error en la compilación.
- Al hacer los test nos dará un problema por la parte del css module y las imágenes que las estamos cargando como módulos entonces se debe instalar como dependencia de desarrollo identity-obj-proxy haciendo un "npm i -D identity-obj-proxy".
- Antes de hacer el npm publish se tiene que hacer un **git add .** luego colocar el **git commit -m "mensaje a colocar"** y después se tiene que hacer el release tag usando **git tag -a v0.0.1 -m "Version 0.0.1 ready!"** cambiando el versionado y el mensaje conforme se actualiza el paquete por ejemplo **git tag -a v0.0.2 -m "Version 0.0.2 ready!"** por último hacer el **git push origin main** o **git push** y también hacer el **git push --tags**
- En el repositorio de github se tiene que ir a la parte de los tags y crear el release colocándo un release title simple y hacer click en Publish release y con eso ya es la versión que está lista para subir a NPM.

---

# Herramientas

- Para el enrutamiento (para la versión 6 en adelante ya tiene el tipado de typescript): https://reactrouter.com/en/main

# Comentarios

- .........

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
