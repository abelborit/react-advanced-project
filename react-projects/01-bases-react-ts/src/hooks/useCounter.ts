import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface HookProps {
  maxCount: number;
}

export const useCounter = ({ maxCount = 15 }: HookProps) => {
  const [counter, setCounter] = useState(8);
  // tomar el elemento mediante una referencia para poder hacer la animación. A diferencia del useState el useRef al cambiar su valor no hará un re-renderizado del componente, es decir, no se vuelve a construir
  // Se puede colocar useRef(null) para que se inicialice en null pero no es la forma recomendada porque no se sabe qué información tiene el objeto elementToAnimate, entonces puedo pasar por encima del ref={} del h3 y me saldrá un error donde se puede tomar el tipado y eso hará que el objeto elementToAnimate tenga algunas llaves, es decir, que dentro del objeto elementToAnimate en algún momento tendrá un undefined o el HTMLHeadingElement (la etiqueta HTML) pero con eso nos damos cuenta que sigue mandando error entonces se coloca recién el null porque se tiene que inicializar de alguna manera. En este caso se colocará de tipo any para que cualquier elemento HTML pueda tener esta animación ya que antes solo se podía con elementos de cabecera
  const elementToAnimate = useRef<any>(null);
  // crear useRef() para el timeLine para que se cree una sola vez y se almacene la referencia en memoria
  const timeLine = useRef(gsap.timeline());

  const handleIncrement = (argsValue: number = 1): void => {
    setCounter((prevState) =>
      prevState < maxCount ? prevState + argsValue : maxCount
    );
  };

  const handleIncrementOne = (): void => {
    // Math.min() tomará el valor mínimo haciendo una comparación de una serie de valores, entonces es un arreglo de números, es decir va a tomar el valor mínimo de prevState + 1 o maxCount
    setCounter((prevState) => Math.min(prevState + 1, maxCount));
  };

  // cuando se trabaje con referencias HTML sería conveniente usar el useLayoutEffect(()=> {}, []) para asegurarnos que se use después de que se contruyó el HTML pero en la mayor parte de los casos se puede trabajar de forma normak con el useEffect(()=> {}, [])
  useLayoutEffect(() => {
    // se hace una evaluación porque cabe la posibilidad que la referencia al elemento en elementToAnimate sea null
    // if (!elementToAnimate.current) return;

    // se movió el código de la animación aquí porque con el useLayoutEffect nos aseguramos que el código HTML ya fue creado y que sus dimensiones ya están correctamente establecidas. Aquí con el useLayoutEffect se está dejando su arreglo de dependecias vacías para que apenas se contruya solo se ejecute una vez
    timeLine.current.to(elementToAnimate.current, {
      y: -10,
      duration: 0.25,
      ease: "ease.out",
    });

    timeLine.current.to(elementToAnimate.current, {
      y: 0,
      duration: 0.5,
      ease: "bounce.out",
    });

    // para decirle que no empiece a hacer la animación desde el inicio, es decir, que no haga la animación apenas cree el elemento
    timeLine.current.pause();
  }, []);

  useEffect(() => {
    // si queremos que se ejecute la animación solo cuando llegue al maxCount
    // if (counter < maxCount) return;

    // forma de estilizar los console.log()
    console.log(
      "%cSe llegó al valor máximo",
      "color:red; background-color:#111"
    );

    /* dar una animación de forma SÍ recomendada según GreenSock la cual es crear un TimeLine (es como una barra de carga para saber en todo momento en qué punto se encuentra la animación) en donde vamos a controlar la secuencia de animaciones para no esperar a que una termine y luego hacer otra porque si se espera eso entonces tendríamos que hacer muchos .then() */
    // este timeLine será como un controlador de tiempo y como se está creando la referencia arriba entonces me da un objeto del cual se tiene que acceder a la llave current y con eso se mejoraría de cierta forma lo que se menciona líneas abajo pero no nos da el resultado esperado de tener la animación controlada
    // el problema mencionado es que con estos timeLine que por ejemplo si se comenta el condicional if() y el console.log() entonces nos damos cuenta que cada vez que cambie el counter este timeLine se vuelve a crear entonces habrían dos timeLine que hacen la animación y por eso hacer que se repita varias veces, es decir, va sumando animaciones
    // timeLine.current.to(elementToAnimate.current, {
    //   y: -10,
    //   duration: 0.25,
    //   ease: "ease.out",
    // });

    // timeLine.current.to(elementToAnimate.current, {
    //   y: 0,
    //   duration: 0.5,
    //   ease: "bounce.out",
    // });

    // cada vez que cambie el counter hará la animación pero en este caso como anteriormente se pausó y ahora queremos que de play, es como un video que ya terminó y luego le damos play, entonces no avanzará nada porque precisamente ya terminó, pero para esto play() se le puede pasar parámetros que en este caso le pasaremos un 0 para que se lance desde el inicio
    timeLine.current.play(0);
  }, [counter]);

  return { counter, elementToAnimate, handleIncrement, handleIncrementOne };
};
