
import { createBrowserRouter, RouterProvider } from "react-router";

import { Dashboard } from "./Pages/Dashboard";
import { Home } from "./Pages/Home";
import "./App.css";
import { createContext, useState } from "react";
import { Product } from "./types";


type GlobalState = {
  cart: Product []
}
export const Globalcontext = createContext<GlobalState | null>(null)

function App() {
  const [state, setState] = useState<GlobalState>({
    cart: []
  })

  const handleAddToCart = (product: Product)=>{
    setState({
      ...state,
      cart: [...state.cart, product]
    })
  }

  const router = createBrowserRouter([
    {
    path: "/",
    element: <Home/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  }
])

  
  return (
    <>

      <div className="App">
        <Globalcontext.Provider value = {{state, handleAddToCart}}>
        <RouterProvider router={router}/>
        </Globalcontext.Provider>
      </div>
    </>
  );
}
export default App;
