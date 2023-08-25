import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const MAXIMUM_COUNT = 10;

export const CounterEffect = () => {
  const [counter, setCounter] = useState(8);
  // tomar el elemento mediante una referencia para poder hacer la animación. A diferencia del useState el useRef al cambiar su valor no hará un re-renderizado del componente, es decir, no se vuelve a construir
  // Se puede colocar useRef(null) para que se inicialice en null pero no es la forma recomendada porque no se sabe qué información tiene el objeto counterElementHTML, entonces puedo pasar por encima del ref={} del h3 y me saldrá un error donde se puede tomar el tipado y eso hará que el objeto counterElementHTML tenga algunas llaves, es decir, que dentro del objeto counterElementHTML en algún momento tendrá un undefined o el HTMLHeadingElement (la etiqueta HTML) pero con eso nos damos cuenta que sigue mandando error entonces se coloca recién el null porque se tiene que inicializar de alguna manera
  const counterElementHTML = useRef<HTMLHeadingElement>(null);

  const handleIncrement = (argsValue: number = 1): void => {
    setCounter((prevState) =>
      prevState < MAXIMUM_COUNT ? prevState + argsValue : MAXIMUM_COUNT
    );
  };

  const handleIncrementOne = (): void => {
    // Math.min() tomará el valor mínimo haciendo una comparación de una serie de valores, entonces es un arreglo de números, es decir va a tomar el valor mínimo de prevState + 1 o MAXIMUM_COUNT
    setCounter((prevState) => Math.min(prevState + 1, MAXIMUM_COUNT));
  };

  // cuando se trabaje con referencias HTML sería conveniente usar el useLayoutEffect(()=> {}, []) para asegurarnos que se use después de que se contruyó el HTML pero en la mayor parte de los casos se puede trabajar de forma normak con el useEffect(()=> {}, [])
  useEffect(() => {
    if (counter < 10) return;

    // forma de estilizar los console.log()
    console.log(
      "%cSe llegó al valor máximo",
      "color:red; background-color:#111"
    );

    /* dar una animación de la forma NO recomendada según GreenSock porque se está pasando la etiqueta del elemento o si se le pasa una clase entonces afectaría a todos los que sean iguales */
    // el to() es una función que trbajará desde de la posición en la que se encuentra actualmente a los parámetros que le pasaré, recibe dos parámetros to("",{}) donde el primero es el selector (el elemento que vamos a utilizar) y el segundo es el objeto que tendrá la configuración. Se coloca -10 porque la posición actual en y es de 0
    // las funciones to() son promesas entonces se pueden trabajan con un .then() con la idea de que al final cuando ya termine entonces haga otra animación por ejemplo para volver al inicio
    // gsap.to("h3", { y: -10, duration: 0.25, ease: "ease.out" }).then(() => {
    //   gsap.to("h3", { y: 0, duration: 0.5, ease: "bounce.out" });
    // });

    /* dar una animación de una forma buena pero aún no la recomendada según GreenSock donde se puede trabajar normal seleccionando al elemento HTML a través de una referencia, pero lo recomendable es trabajar con un TimeLine */
    // gsap
    //   .to(counterElementHTML.current, {
    //     y: -10,
    //     duration: 0.25,
    //     ease: "ease.out",
    //   })
    //   .then(() => {
    //     gsap.to(counterElementHTML.current, {
    //       y: 0,
    //       duration: 0.5,
    //       ease: "bounce.out",
    //     });
    //   });

    /* dar una animación de forma SÍ recomendada según GreenSock la cual es crear un TimeLine (es como una barra de carga para saber en todo momento en qué punto se encuentra la animación) en donde vamos a controlar la secuencia de animaciones para no esperar a que una termine y luego hacer otra porque si se espera eso entonces tendríamos que hacer muchos .then() */
    // este timeLine será como un controlador de tiempo
    // hay un problema con estos timeLine que por ejemplo si se comenta el condicional if() y el console.log() entonces nos damos cuenta que cada vez que cambie el counter este timeLine se vuelve a crear entonces habrían dos timeLine que hacen la animación y por eso hacer que se repita varias veces, es decir, va sumando animaciones
    const timeLine = gsap.timeline();
    timeLine.to(counterElementHTML.current, {
      y: -10,
      duration: 0.25,
      ease: "ease.out",
    });

    timeLine.to(counterElementHTML.current, {
      y: 0,
      duration: 0.5,
      ease: "bounce.out",
    });
  }, [counter]);

  return (
    <>
      <h2>CounterEffect:</h2>
      {/* <h3>{counter}</h3> */}
      <h3 ref={counterElementHTML}>{counter}</h3>

      <button onClick={() => handleIncrement()}>+1</button>
      <button onClick={() => handleIncrement(2)}>+2</button>

      <button onClick={handleIncrementOne}>Only +1</button>
    </>
  );
};
