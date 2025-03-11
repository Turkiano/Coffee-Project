import { createBrowserRouter, RouterProvider } from "react-router";

import { Dashboard } from "./Pages/Dashboard";
import { Home } from "./Pages/Home";
import "./App.css";
import { createContext, useState } from "react";
import { ProductTypes } from "./types";
import { NavBar } from "./Compo/NavBar";
import { BrowserRouter } from "react-router-dom";
import { Login } from "./Pages/login";
import { SignUp } from "./Pages/SignUp";

export type GlobalContextTypes = {
  state: GlobalStateTypes;
  handleAddToCart: (products: ProductTypes) => void;
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
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signUp",
      element: <SignUp />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="App">
          <GlobalContext.Provider value={{ state, handleAddToCart }}>
            <RouterProvider router={router} />
          </GlobalContext.Provider>
        </div>
      </BrowserRouter>
    </>
  );
}
export default App;
