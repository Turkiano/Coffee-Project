import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState } from "react";

import "./App.css";
import { ProductTypes } from "./types";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/login";
import { SignUp } from "./Pages/SignUp";
import { AboutUs } from "./Pages/AboutUs";
import { Dashboard } from "./Pages/Dashboard";

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
      path: "/aboutUs",
      element: <AboutUs />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

  return (
    <div className="App">
      <GlobalContext.Provider value={{ state, handleAddToCart }}>
        {/* Routes */}
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  );
}
export default App;
