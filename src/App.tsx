import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Home } from "./Pages/Home";
import { QueryClient } from "@tanstack/react-query";
import api from "./api";

function App() {

  const queryClient = new QueryClient()

  const [product, setProduct] = useState({
    name: "",
    categoryId: ""
  })

  const handleChange = (e: any) =>{
    const {name, value} = e.target
    setProduct({
      ...product,
      [name]: value
    })
    
  };

  const postProduct = async ()=>{
    try{
      const res = await api.post("/products", product,) //Passing the data as a 2nd param
      return res.data

    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleSubmit = async (e: any) =>{
    e.preventDefault(); // Prevent page refresh
    await postProduct()
    queryClient.invalidateQueries({queryKey: ["products"]})  
  };

  
  return (
    <>
      <div className="App">
        <Home />
        <form onSubmit={handleSubmit} className="mt-10 w-1/2 mx-auto">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
            Add New Product
          </h3>
          <Input  name="name" onChange={handleChange} type="text" placeholder="Product Name" />
          <Input  name="categoryId" onChange={handleChange} className="mt-3" type="text" placeholder="Category Id" />
          <Button  className="mt-3" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
export default App;
