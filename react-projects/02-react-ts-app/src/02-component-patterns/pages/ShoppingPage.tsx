import {
  ProductCard,
  ProductImage,
  ProductTitle,
  ProductButtons,
} from "../components";
import { productArray } from "../data/products";
import "../styles/custom-styles.css";

const productElement = productArray[0];

export const ShoppingPage = () => {
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
        <ProductCard
          key={productElement.id}
          product={productElement}
          classNameProps="bg-dark"
          styleProps={{ color: "#fff" }}
          initialValues={{
            quantity: 4,
            maxQuantity: 10,
          }}
        >
          {/* pasar una función como un children y esta función retorna un JSX Element */}
          {({
            count,
            maxQuantity,
            isMaxQuantityReached,
            product,
            increaseOrDecreaseBy,
            reset,
          }) => (
            <>
              <ProductImage classNameProps="custom-image" />
              <ProductTitle classNameProps="text-white" />
              <ProductButtons classNameProps="custom-buttons" />

              <button onClick={reset}>Reset</button>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => increaseOrDecreaseBy(-2)}>-2</button>
                {!isMaxQuantityReached && (
                  <button onClick={() => increaseOrDecreaseBy(2)}>+2</button>
                )}
              </div>
              <span>Count: {count}</span>
              <span>MaxQuantity: {maxQuantity}</span>
              {JSON.stringify(product, null, 3)}
            </>
          )}
        </ProductCard>
      </div>

      {/* para revisar el estado en la pantalla */}
      {/* <div>
        <code>{JSON.stringify(shoppingCartState, null, 5)}</code>
      </div> */}
    </div>
  );
};
