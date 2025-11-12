import api from "@/api";
import { GlobalContext } from "@/App";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { OrderItemTypes, OrderTypes, ProductTypes } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // add this import

export function Cart() {
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

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

  //to get the total cart
  let total = 0;
  state.cart.forEach((item) => {
    total += item.price;
  });

  const checkoutOrder: OrderTypes = {
    userId: "51f3f8e0-92df-4358-bcd8-5fe33a60f2ce",
    status: "Processing",
    items: [],
    totalPrice: 0,
  };
  checkoutOrder.items = [] as OrderItemTypes[];

  Object.keys(groups).forEach((key) => {
    const products = groups[key];
    const product = products[0]; // ✅ first product in the group

    checkoutOrder.items.push({
      productId: key,
      productName: product.name, // ✅ correct
      quantity: products.length,
      unitPrice: product.price, // ✅ correct
    });
  });

  console.log("checkoutOrder: ", checkoutOrder);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setCheckoutError("");
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

        // Redirect to receipt page with the order ID
        navigate(`/receipt/${res.data.id}`);
      }

      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
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
            Checkout
          </Button>
          {checkoutError && (
            <p className="text-red-500 text-sm mt-2">{checkoutError}</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
