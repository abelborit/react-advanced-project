import {
  ProductCard,
  ProductImage,
  ProductTitle,
  ProductButtons,
} from "../components";
import { productArray } from "../data/products";

const productElement = productArray[0];

export const ShoppingPage = () => {
  return (
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
          initialValues={{
            quantity: 4,
            maxQuantity: 10,
          }}
        >
          {/* pasar una función como un children y esta función retorna un JSX Element */}
          {({ reset }) => (
            <>
              <ProductImage />
              <ProductTitle />
              <ProductButtons />

              <button onClick={reset}>Reset</button>
            </>
          )}
        </ProductCard>
      </div>
    </div>
  );
};
