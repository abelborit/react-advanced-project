import { ProductInterface } from "../interfaces";

const productData = {
  id: "1",
  title: "Coffee Mug - Card",
  /* files in the public directory are served at the root path.
     Instead of /public/coffee-mug.png, use /coffee-mug.png. */
  // img: "../../../public/coffee-mug.png",
  img: "/coffee-mug.png",
};

const productData2 = {
  id: "2",
  title: "Coffee Mug - Card 2",
  /* files in the public directory are served at the root path.
     Instead of /public/coffee-mug.png, use /coffee-mug2.png. */
  // img: "../../../public/coffee-mug2.png",
  img: "/coffee-mug2.png",
};

export const productArray: ProductInterface[] = [productData, productData2];
