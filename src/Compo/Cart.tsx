import api from "@/api";
import { GlobalContext } from "@/App";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { OrderTypes, ProductTypes } from "@/types";
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
  }, {} as {[productId: string]: ProductTypes[]});

  //to get the total cart
  let total = 0;
  state.cart.forEach((item) => {
    total += item.price;
  });

  const checkoutOrder: OrderTypes = {
    userId: "3878983a-85de-4f53-abab-5b9d9f9c2625",
    status: "Processing",
    items: [],
  };

  Object.keys(groups).forEach((key) => {
    const products = groups[key];

    checkoutOrder.items.push({
      quantity: products.length,
      productId: key,
    }); 
  }
);

  console.log("checkoutOrder: ", checkoutOrder);



  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.post("/orders/checkout", checkoutOrder, {
        headers: {
          authorization: `bearer ${token}`
        }
      })
      
      return res.data
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }

  }



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
                <div className="justify-between">
                  <h4 className="flex items-center gap-1">{product.name}</h4>
                  <h3>SAR {product.price}</h3>
                </div>

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
          <p className="leading-none font-semibold mt-3"> Total: SAR {total}</p>
          <Button className = "mt-5"onClick={handleCheckout}>Checkout</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
