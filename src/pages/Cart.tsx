
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../features/productSlice";
import { RootState } from "../app/store";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

function Cart() {
  const dispatch = useDispatch();

  // Using useSelector to extract state from Redux store
  const { amount, products } = useSelector(
    (state: RootState) => state.products
  );

  const handleRemoveProduct = (productId: number) => {
    dispatch(removeProduct(productId));
  };

  return (
    <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-white py-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
          <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
          <hr className="border-gray-300 mt-4 mb-8" />

          {amount === 0 ? (
            <h4 className="empty">Your cart is empty.</h4>
          ) : (
            products.map((product: Product) => (
              <div key={product.id} className="space-y-4">
                <div className="grid grid-cols-3 items-center gap-4 mb-3">
                  <div className="col-span-2 flex items-center gap-4">
                    <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-gray-800">
                        {product.title}
                      </h3>
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className="text-xs text-red-500 cursor-pointer "
                      >
                        Remove
                      </button>

                     
                    </div>
                  </div>
                  <div className="ml-auto flex flex-col items-end gap-1">
                    <h2 className="ml-3 font-normal text-sm">
                      Amount{" "}
                      <span className="font-semibold text-base">{amount}</span>{" "}
                      x
                    </h2>
                    <h4 className="text-base font-bold text-gray-800">
                      ${product.price.toFixed(2)}
                    </h4>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-gray-100 rounded-md p-4 md:sticky top-0 h-[340px]">
          <ul className="text-gray-800 mt-8 space-y-4">
            <li className="flex flex-wrap gap-4 text-base">
              Discount <span className="ml-auto font-bold">$0.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base">
              Shipping <span className="ml-auto font-bold">$2.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base">
              Tax <span className="ml-auto font-bold">$4.00</span>
            </li>
            <li className="flex flex-wrap gap-4 text-base font-bold">
              Total <span className="ml-auto">$52.00</span>
            </li>
          </ul>

          <div className="mt-8 space-y-2">
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Checkout
            </button>
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
