import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState } from "react";

import "./App.css";
import { ProductTypes } from "./types";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/login";
import { SignUp } from "./Pages/SignUp";
import { AboutUs } from "./Pages/AboutUs";
import { Dashboard } from "./Pages/Dashboard";
import { ProductDetails } from "./Pages/ProductDetails";

export type GlobalContextTypes = {
  state: GlobalStateTypes;
  handleAddToCart: (products: ProductTypes) => void;
  handleDeleteFromCart: (id: string) => void
};

export type GlobalStateTypes = {
  cart: ProductTypes[];
};

export const GlobalContext = createContext<GlobalContextTypes | null>(null);

function App() {
  const [state, setState] = useState<GlobalStateTypes>({
    cart: [],
  });




  const handleAddToCart = (product: ProductTypes) => {
    // const isDuplicated = state.cart.find((cartItem) => cartItem.productId === product.productId)
    // if (isDuplicated) return // to check if cart item is duplicated targeting id.

    setState({
      ...state,
      cart: [...state.cart, product],
    });
  };

  const handleDeleteFromCart = (id: string) => {
    const cart = state.cart
    const index = state.cart.findIndex(item => item.productId === id)
    cart.splice(index,1)

    setState({
      ...state,
      cart: cart
    })

  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signUp",
      element: <SignUp />,
    },
    {
      path: "/aboutUs",
      element: <AboutUs />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/products/:productId",
      element: <ProductDetails />,
    },
  ]);

  return (
    <div className="App">
      <GlobalContext.Provider value={{ state, handleAddToCart, handleDeleteFromCart }}>
        {/* Routes */}
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  );
}
export default App;
