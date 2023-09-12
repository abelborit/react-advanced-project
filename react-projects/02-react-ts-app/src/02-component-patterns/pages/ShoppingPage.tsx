import {
  ProductCard,
  ProductImage,
  ProductTitle,
  ProductButtons,
} from "../components";
import "../styles/custom-styles.css";
import { productArray } from "../data/products";
import { useShoppingCart } from "../hooks/useShoppingCart";

export const ShoppingPage = () => {
  const { shoppingCartState, handleProductQuantityChange } = useShoppingCart();

  return (
    // <div>
    //     <h1>Shopping Store</h1>
    //     <hr />

    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "row",
    //         flexWrap: "wrap",
    //         gap: "2rem",
    //         justifyContent: "center",
    //       }}
    //     >
    //       {/* este sería un componente normal si en ProductCard se colocara todo en un solo return pero limitaría al desarrollador porque tendría que mandar solo el productData con los campos limitados */}
    //       {/* <ProductCard product={productData} /> */}

    //       {/* ***** COMPOUND COMPONENT PATTERN ***** */}
    //       {/* la idea de un HOC es que haya un componente padre y se le puenda mandar componentes hijos y con esto le damos al desarrollador un mejor control al colocar uno, dos, cuatro o todos los elementos hijos que queremos o se necesiten o en el orden que se requiera */}
    //       {/* FORMA 1: importación tal cual como varios componentes individuales sin entrar a las propiedades del objeto ProductCard creado en el index.ts de la carpeta components */}
    //       <ProductCard product={productData} classNameProps="bg-dark">
    //         <ProductImage classNameProps="custom-image" />
    //         <ProductTitle classNameProps="text-white" />
    //         <ProductButtons
    //           classNameProps="custom-buttons"
    //           styleProps={{ justifyContent: "start" }}
    //         />
    //       </ProductCard>

    //       <ProductCard
    //         product={productData}
    //         styleProps={{
    //           backgroundColor: "#70D1F8",
    //           color: "#333",
    //           padding: "1rem",
    //         }}
    //       >
    //         <ProductImage
    //           styleProps={{ width: "100%", borderRadius: "20px" }}
    //         />
    //         <ProductTitle styleProps={{ color: "#333" }} />
    //         <ProductButtons styleProps={{ justifyContent: "end" }} />
    //       </ProductCard>

    //       {/* FORMA 2: importación como una parte del componente padre (refleja una relación directa del componente padre con sus hijos) de esta forma al ProductCard se le añade nuevas propiedades las cuales van a apuntar al subcomponente */}
    //       <ProductCard product={productData} classNameProps="bg-dark">
    //         <ProductCard.Image classNameProps="custom-image" />
    //         <ProductCard.Title
    //           title={"Titulo Enviado"}
    //           classNameProps="text-white"
    //         />
    //         <ProductCard.Buttons classNameProps="custom-buttons" />
    //       </ProductCard>

    //       {/* colocando más tarjetas aplicando el COMPOUND COMPONENT PATTERN ya que es mucho más dinámico y da más holgura al desarrollador de poder mandar lo que desea mandar */}
    //       <ProductCard product={productData}>
    //         <span>Esta card no tiene imagen</span>
    //         <ProductTitle title={"Titulo Prueba"} />
    //         <ProductButtons />
    //       </ProductCard>

    //       <ProductCard product={productData}>
    //         <span>Esta card no tiene titulo</span>
    //         <ProductImage />
    //         <ProductButtons />
    //       </ProductCard>

    //       <ProductCard product={productData}>
    //         <span>Esta card solo tiene imagen</span>
    //         <ProductImage />
    //       </ProductCard>
    //     </div>
    //   </div>

    /* ****************************************************************************************************** */

    <div>
      <h1>Shopping Store</h1>
      <hr />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        {/* el patrón Control Props es similar al que se usa en los input */}
        {/* <input
          value={counter}
          onChange={(e) => setCounter(e.target.value)}
        /> */}

        {productArray.map((productElement) => (
          <ProductCard
            key={productElement.id}
            product={productElement}
            classNameProps="bg-dark"
            /* esta es una función que recibe un evento el cual es el evento onChangeProps haciendo referencia al evento onChange de React y puede o no dispararse con argumentos y este evento nosotros podemos definir cómo queremos que se vea, en este caso tendrá como argumentos el producto y su cantidad */
            onChangeProps={(event) => handleProductQuantityChange(event)}
            /* si se define así significa que los argumentos que el evento onChangeProps emita serán los que van a mandarse a llamar en la función handleProductQuantityChange, si onChangeProps no emite nada entonces la función handleProductQuantityChange no tendrá ningún argumento y si emite algún valor entonces ese valor tiene que ser esperado por mi función handleProductQuantityChange */
            // onChangeProps={handleProductQuantityChange}
            valueProps={shoppingCartState[productElement.id]?.quantity || 0}
          >
            <ProductImage classNameProps="custom-image" />
            <ProductTitle classNameProps="text-white" />
            <ProductButtons classNameProps="custom-buttons" />
          </ProductCard>
        ))}
      </div>

      <div className="shopping-cart">
        {
          /* 
            con Object.entries() me permite obtener un array de pares clave-valor de los elementos un objeto dado:
            const objectExample = { foo: "bar", baz: 42 };
            console.log(Object.entries(objectExample)); // [ ['foo', 'bar'], ['baz', 42] ]
          */
          /* ya obteniendo el arreglo entonces aplico el map y hago la desestructuración de un array */
          Object.entries(shoppingCartState).map(([key, ProductInCart]) => (
            <ProductCard
              key={key}
              product={ProductInCart}
              classNameProps="bg-dark"
              styleProps={{ width: "120px", padding: "10px" }}
              onChangeProps={(event) => handleProductQuantityChange(event)}
              valueProps={ProductInCart.quantity}
            >
              <ProductImage
                classNameProps="custom-image"
                styleProps={{ width: "100%", padding: "5px" }}
              />
              <ProductButtons classNameProps="custom-buttons" />
            </ProductCard>
          ))

          /* se puede trabajar también sin la desestructuración de un array y solo trabajar con sus posiciones */
          // Object.entries(shoppingCartState).map((elementInCart) => (
          //   <ProductCard
          //     key={elementInCart[0]}
          //     product={elementInCart[1]}
          //     classNameProps="bg-dark"
          //     styleProps={{ width: "120px", padding: "10px" }}
          //     // onChangeProps={() => handleProductQuantityChange()}
          //   >
          //     <ProductImage
          //       classNameProps="custom-image"
          //       styleProps={{ width: "100%", padding: "5px" }}
          //     />
          //     <ProductButtons classNameProps="custom-buttons" />
          //   </ProductCard>
          // ))
        }
      </div>

      {/* para revisar el estado en la pantalla */}
      {/* <div>
        <code>{JSON.stringify(shoppingCartState, null, 5)}</code>
      </div> */}
    </div>
  );
};
