import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  price: number;
  amount: number;
}

interface ProductsState {
  products: Product[];
  amount: number;
  price: number;
}

interface ChangeAmountPayload {
  id: number;
  type: "increase" | "decrease";
}

const dataFromLocalStorage = (): ProductsState => {
  return (
    JSON.parse(localStorage.getItem("products") || "null") || {
      products: [],
      amount: 0,
      price: 0,
    }
  );
};

const initialState: ProductsState = dataFromLocalStorage();

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (item) {
        item.amount += action.payload.amount;
      } else {
        state.products.push(action.payload);
      }
      productsSlice.caseReducers.calculateTotal(state);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
      productsSlice.caseReducers.calculateTotal(state);
    },

    clearCart: (state) => {
      state.amount = 0;
      state.products = [];
      state.price = 0;
      localStorage.removeItem("products");
    },
    changeAmount: (state, action: PayloadAction<ChangeAmountPayload>) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        if (action.payload.type === "increase") {
          item.amount += 1;
        } else if (action.payload.type === "decrease") {
          item.amount -= 1;
        }
        productsSlice.caseReducers.calculateTotal(state);
      }
    },
    calculateTotal: (state) => {
      let price = 0;
      let amount = 0;
      state.products.forEach((item) => {
        price += item.price * item.amount;
        amount += item.amount;
      });
      state.amount = amount;
      state.price = price;
      localStorage.setItem("products", JSON.stringify(state));
    },
  },
});

export const {
  addProduct,
  removeProduct,
  clearCart,
  changeAmount,
  calculateTotal,
} = productsSlice.actions;

export default productsSlice.reducer;
