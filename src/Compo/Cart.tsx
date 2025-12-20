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
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

//   const token = localStorage.getItem("token");
// console.log("TOKEN AT CHECKOUT:", token);
// if (!token) throw new Error("No authentication token found");


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

  // Calculate total price properly
  let total = 0;
  state.cart.forEach((item) => {
    total += item.price;
  });

  // Prepare items for checkout - FIXED VERSION
  const items: OrderItemTypes[] = Object.keys(groups).map((key) => {
    const products = groups[key];
    const product = products[0];

    return {
      productId: key,
      productName: product.name,
      quantity: products.length,
      unitPrice: product.price,
    };
  });

  console.log("Cart items for checkout:", items);
  console.log("Total price:", total);

  // Create checkoutOrder with all required properties - FIXED
  const checkoutOrder: OrderTypes = {
    status: "Processing",
    items,
    totalPrice: total,
    orderDate: new Date().toISOString(),
  };

  console.log("Final checkoutOrder:", checkoutOrder);

  const handleCheckout = async () => {
    if (state.cart.length === 0) {
      setCheckoutError("Cart is empty");
      return;
    }

    setIsCheckingOut(true);
    setCheckoutError("");

    try {
      const token = localStorage.getItem("token");
      console.log("TOKEN AT CHECKOUT:", token);

      if (!token) {
        throw new Error("No authentication token found");
      }

      console.log("Sending checkout request with:", checkoutOrder);

      const res = await api.post("/orders/checkout", checkoutOrder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Full checkout response:", res.data);

      if (res.status === 201) {
        handleRemoveFromCart();

        const orderId = res.data.orderId; // **<-- CHANGE THIS LINE**

        console.log("Extracted orderId:", orderId);

        if (!orderId) {
          console.error(
            "No order ID found in response. Full response:",
            res.data,
          );
          throw new Error("No order ID received from server");
        }

        navigate(`/receipt/${orderId}`);
      } else {
        throw new Error(`Unexpected response status: ${res.status}`);
      }

      return res.data;
    } catch (error) {
      console.error("Checkout error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Checkout failed";
      setCheckoutError(errorMessage);
    } finally {
      setIsCheckingOut(false);
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
          <Button
            className="mt-5"
            onClick={handleCheckout}
            disabled={isCheckingOut || state.cart.length === 0}
          >
            {isCheckingOut ? "Processing..." : "Checkout"}
          </Button>
          {checkoutError && (
            <p className="text-red-500 text-sm mt-2">{checkoutError}</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
