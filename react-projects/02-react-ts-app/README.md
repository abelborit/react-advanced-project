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
