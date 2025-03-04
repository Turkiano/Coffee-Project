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

import { Product } from "../types";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { Globalcontext } from "@/App";



export function Home() {
  const theContext = useContext(Globalcontext);
  console.log("context: ", theContext);
  
  const getProducts = async (): Promise<Product[]> => {
    const res = await api.get("/products");
    return res.data;
  };

  //Queries using constructuring
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts, //fetching data
  });

  if (isLoading) return <p>Loading products...</p>;

  return (
    <div className="App">
      <h1 className="text-2xl uppercase align">Products</h1>

      <ul className="mt-10 grid grid-cols-3 gap-4 mx-auto'">
        {data?.map((products) => (
          <li key={products.id}>
            <Card >
              <CardHeader>
                <CardTitle>{products.name}</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content Here</p>
              </CardContent>
              <CardFooter>
                <Button
                  className="text-white bg-blue-500 hover:bg-blue-600"
                  variant="secondary"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>

      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
}
