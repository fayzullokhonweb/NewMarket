import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addProduct } from "../features/productSlice";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  price: number;
  rating: number;
  discountPercentage: number;
}

function SingleProduct() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  const [productAmount, setProductAmount] = useState(1);

  const setAmount = (type: "increase" | "decrease") => {
    if (type === "decrease" && productAmount > 1) {
      setProductAmount((prev) => prev - 1);
    } else if (type === "increase" && productAmount < 9) {
      setProductAmount((prev) => prev + 1);
    }
  };

  const addToBag = () => {
    if (!product) return;

    const newProduct = {
      ...product,
      amount: productAmount,
      img: product.thumbnail, // Assuming the selected image is the thumbnail
    };
    dispatch(addProduct(newProduct));
    setProductAmount(1);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="font-sans bg-white">
      <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 rounded-lg">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 py-10 rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
              <img
                className="mx-auto rounded object-cover h-[380px]"
                src={product.thumbnail}
                alt="Product"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl capitalize font-extrabold text-gray-800">
              {product.title} | {product.category}
            </h2>

            <div className="flex space-x-2 mt-4">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`w-5 ${
                    i < Math.round(product.rating)
                      ? "fill-blue-600"
                      : "fill-[#CED5D8]"
                  }`}
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              ))}
              <h4 className="text-gray-800 text-base">
                {Math.floor(Math.random() * (400 - 100 + 1)) + 100} Reviews
              </h4>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <p className="text-gray-800 text-3xl font-bold">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-gray-400 text-base">
                <span style={{ textDecoration: "line-through" }}>
                  $
                  {(
                    product.price *
                    (1 + product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
                <span className="text-sm ml-1">Tax included</span>
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">
                Choose a Color
              </h3>
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  type="button"
                  className="w-10 h-10 bg-black border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"
                ></button>
                <button
                  type="button"
                  className="w-10 h-10 bg-gray-300 border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"
                ></button>
                <button
                  type="button"
                  className="w-10 h-10 bg-gray-100 border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"
                ></button>
                <button
                  type="button"
                  className="w-10 h-10 bg-blue-400 border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"
                ></button>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center p-2 w-32 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
              <button
                onClick={() => setAmount("decrease")}
                disabled={productAmount === 1}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 fill-current"
                  viewBox="0 0 124 124"
                >
                  <path
                    d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>

              <span className="mx-5 text-base ">{productAmount}</span>
              <button
                onClick={() => setAmount("increase")}
                disabled={productAmount === 9}
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 fill-current"
                  viewBox="0 0 42 42"
                >
                  <path
                    d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={addToBag}
                type="button"
                className="min-w-[200px] px-5 py-2.5 rounded text-sm tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-transparent text-white hover:text-blue-700 transition-all duration-300"
              >
                Buy now
              </button>
              <button
                onClick={addToBag}
                type="button"
                className="min-w-[200px] px-5 py-2.5 rounded text-sm tracking-wider font-medium border border-blue-700 outline-none bg-transparent hover:bg-blue-700 text-blue-700 hover:text-white transition-all duration-300"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
