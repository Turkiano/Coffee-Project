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
  const { state, handleDeleteFromCart, handleAddToCart } = context;

  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.productId;
    const curGroup = acc[key] ?? [];
    return { ...acc, [key]: [...curGroup, obj] };
  }, {});

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
          {Object.keys(groups).map((key) => {
            const products = groups[key];
            const product = products[0];

            console.log("products: ", products);
            console.log("product: ", product);

            return (
              <div
                key={product.productId}
                className="flex justify-between items-center border-b py-2"
              >
                <h4 className="flex items-center gap-1">
                  {product.name}
                </h4>
                <Button
                className="text-white"
                  variant="outline"
                  onClick={() => handleAddToCart(product)}
                >
                  +
                </Button>
                  <span className="font-bold flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full">
                    ({products.length})
                  </span>
                <Button
                 className="text-white"
                  variant="outline"
                  onClick={() => handleDeleteFromCart(product.productId)}
                >
                  -
                </Button>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
