import { useQuery } from "@tanstack/react-query";
import api from "../api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ProductTypes } from "../types";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { GlobalContext } from "@/App";
import { NavBar } from "@/Compo/NavBar";
import { Link } from "react-router-dom";

export function Home() {
  const context = useContext(GlobalContext);
  if (!context) throw Error("Context is missing!!");
  const { state, handleAddToCart } = context;
  console.log("Cart: ", state);

  const getProducts = async (): Promise<ProductTypes[]> => {
    const res = await api.get("/products");
    console.log("API Response:", res.data);  // Debugging

    return res.data;
  };

  //Queries using constructuring
  const { data, error, isLoading } = useQuery<ProductTypes[]>({
    queryKey: ["products"],
    queryFn: getProducts, //fetching data
  });

  if (isLoading) return <p>Loading products...</p>;

  return (
    <>
      <div className="w-full mt-0 mb-15">
        <NavBar />
      </div>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl uppercase align">Products</h1>

        <ul className="mt-10 grid grid-cols-3 gap-4 mx-auto'">
          {data?.map((product) => {
            return (
              <li key={product.productId}>
                <Card>
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card Content Here</p>
                  </CardContent>
                  <CardFooter className="flex justify-center space-x-4">
                    <Button asChild variant="outline" className="text-black">
                      <Link to={`/products/${product.productId}`}>Details</Link>
                    </Button>
                    <Button
                      className="text-white"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to 🛒
                    </Button>
                  </CardFooter>
                </Card>
              </li>
            );
          })}
        </ul>
        {error && <p className="text-red-500">Error: {error.message}</p>}
      </div>
    </>
  );
}
