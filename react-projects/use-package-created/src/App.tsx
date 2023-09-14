import {
  ProductCard,
  ProductImage,
  ProductTitle,
  ProductButtons,
} from "do-product-card-package";

import "./App.css";

const productElement = {
  id: "1",
  title: "Coffee Mug - Card",
  // img: "/coffee-mug.png",
};

function App() {
  return (
    <>
      <ProductCard
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
    </>
  );
}

export default App;
