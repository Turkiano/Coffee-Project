import api from "@/api";
import { GlobalContext } from "@/App";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { OrderItemTypes, OrderTypes, ProductTypes } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const navigate = useNavigate();

  const context = useContext(GlobalContext);
  if (!context) throw Error("Context is missing!!");
  const { state, handleDeleteFromCart, handleAddToCart, handleRemoveFromCart } =
    context;

  const groups = state.cart.reduce(
    (acc, obj) => {
      const key = obj.productId;
      const curGroup = acc[key] ?? [];
      return { ...acc, [key]: [...curGroup, obj] };
    },
    {} as { [productId: string]: ProductTypes[] },
  );

  // Calculate total price
  let total = 0;
  state.cart.forEach((item) => {
    total += item.price;
  });

  // Prepare items for checkout
  const items: OrderItemTypes[] = Object.keys(groups).map((key) => {
    const products = groups[key];
    const product = products[0];

    return {
      productId: key,
      productName: product.name,
      quantity: products.length,
      unitPrice: product.price,
      // Add any other required properties from OrderItemTypes
    };
  });

  // Create checkoutOrder with all required properties
  const checkoutOrder: OrderTypes = {
    userId: "51f3f8e0-92df-4358-bcd8-5fe33a60f2ce",
    status: "Processing",
    items: items,
    totalPrice: total,
    // Add any other required properties from OrderTypes
    orderId: "", // or generate a temporary ID
    orderDate: new Date().toISOString(),
  };

  console.log("checkoutOrder: ", checkoutOrder);

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/orders/checkout", checkoutOrder, {
        headers: {
          authorization: `bearer ${token}`,
        },
      });

      console.log("Checkout response:", res.data);

      if (res.status === 201) {
        handleRemoveFromCart();
        
        // More robust way to get the order ID
        const orderId = res.data.id || res.data.orderId || res.data._id;
        
        if (!orderId) {
          console.error("No order ID found in response:", res.data);
          throw new Error("No order ID received from server");
        }
        
        navigate(`/receipt/${orderId}`);
      }

      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

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
                  className=" bg-[#141e20] text-white"
                  variant="outline"
                  onClick={() => handleAddToCart(product)}
                >
                  +
                </Button>
                <span className="font-bold flex items-center justify-center w-6 h-6 bg-[#141e20] rounded-full">
                  ({products.length})
                </span>
                <Button
                  className=" bg-[#141e20] text-white"
                  variant="outline"
                  onClick={() => handleDeleteFromCart(product.productId)}
                >
                  -
                </Button>
              </div>
            );
          })}
          <p className="leading-none font-semibold mt-3"> Total: SAR {total}</p>
          <Button className="mt-5" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}