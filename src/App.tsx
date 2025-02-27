import "./App.css";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Home } from "./Pages/Home";

function App() {
  //testing .. ..

  return (
    <>
      <div className="App">
        <Home />
        <form className="mt-10 w-1/2 mx-auto">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
            Add New Product
          </h3>
          <Input type="text" placeholder="Product Name" />
          <Input className="mt-3" type="text" placeholder="Category Id" />
          <Button className="mt-3" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
export default App;
