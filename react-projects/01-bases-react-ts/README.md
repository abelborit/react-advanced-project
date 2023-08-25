# Reforzamiento sobre React

- TypeScript con los principales Hooks de React
- Pequeñas animaciones con GreenSock
- Timelines
- Custom Hooks
- Referencias a elementos del DOM
- Objetos como estado
- Interfaces
- Types
- Reducers
- Actions Creators

# Herramientas

- Para realizar animacions: https://greensock.com/gsap/

# Comentarios

- En TypeScript los archivos con la extensión `.d.ts` son archivos de definición, es decir que no importan nada en su aplicación pero sí nos ayuda mucho a la hora de las definiciones de lo que puedan tener las funciones, tipados, etc.

- Las `interface` son reglas que le podemos colocar a los objetos. Estas no tienen ninguna representación física en JavaScript, es decir, que una `interface` no importa qué tan grande sea esta cuando se compila, es decir, cuando se traduce a JavaScript, es igual a 0 líneas de código y no llega a nuestro bundle final de producción.

- Usar `PropTypes` o `interface` no varía tanto pero usar `interface` cuando se traduce a JavaScript, es igual a 0 líneas de código pero, usar `PropTypes` se transforma a un pequeño código de JavaScript y se suma a nuestro build final de producción, eso sería para usarlo solo con JavaScript ya que con TypeScript tiene un tipado estricto y no llega a nuestro bundle final de producción.

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
