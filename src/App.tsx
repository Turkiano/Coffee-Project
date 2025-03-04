import { createBrowserRouter, RouterProvider } from "react-router";

import { Dashboard } from "./Pages/Dashboard";
import { Home } from "./Pages/Home";
import "./App.css";
import { createContext, useState } from "react";
import { ProductTypes } from "./types";


export type GlobalContextTypes = {
  state: GlobalStateTypes
  handleAddToCart: (products: ProductTypes)=>void
}

export type GlobalStateTypes = {
  cart: ProductTypes[];
};

export const GlobalContext = createContext<GlobalContextTypes | null>(null);

function App() {
  const [state, setState] = useState<GlobalStateTypes>({
    cart: [],
  });

  const handleAddToCart = (product: ProductTypes) => {
    setState({
      ...state,
      cart: [...state.cart, product],
    });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

  return (
    <>
      <div className="App">
        <GlobalContext.Provider value={{ state, handleAddToCart }}>
          <RouterProvider router={router} />
        </GlobalContext.Provider>
      </div>
    </>
  );
}
export default App;
