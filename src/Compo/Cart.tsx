import { GlobalContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useContext } from "react";

export function Cart() {
    const context = useContext(GlobalContext)
  if(!context) throw Error("Context is missing!!")
    const {state} = context


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">🛒</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <h3>Your Selected Items </h3>
        <div>

          {state.cart.map((product) => {
            return (
                <h3>{product.name}</h3>    
            )
          })}
        </div> 
      </PopoverContent>
    </Popover>
  );
}
