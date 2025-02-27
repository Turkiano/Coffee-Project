import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Home } from "./Pages/Home";

function App() {

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

  const handleSubmit = (e: any) =>{
    e.preventDefault(); // Prevent page refresh
    console.log("Form submitted!", product); // to print the input values
    
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
