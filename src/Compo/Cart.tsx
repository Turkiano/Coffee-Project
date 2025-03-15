import { GlobalContext } from "@/App";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";

export function Cart() {
  const context = useContext(GlobalContext);
  if (!context) throw Error("Context is missing!!");
  const { state, handleDeleteFromCart } = context;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex gap-1 cursor-pointer">
          <ShoppingCart />
          <span>({state.cart.length})</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <h3 className="font-semibold mb-2">Your Selected Items</h3>
        <div>
          {state.cart.length === 0 && <p>No items added</p>}
          {state.cart.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center border-b py-2"
            >
              <h4>{product.name}</h4>
              <Button
                variant="destructive"
                onClick={() => handleDeleteFromCart(product.id)}
              >
                X
              </Button>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
