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
import { useContext, useState } from "react";
import { GlobalContext } from "@/App";
import { NavBar } from "@/Compo/NavBar";
import { Link } from "react-router-dom";
import HeroSection from "@/Compo/HeroSection";
import { PromoSection } from "@/Compo/PromoSection";

export function Home() {
  const [searchBy, setSearchBy] = useState("");
  console.log("The state: ", searchBy);
  const context = useContext(GlobalContext);
  if (!context) throw Error("Context is missing!!");
  const { state, handleAddToCart } = context;

  const getProducts = async (): Promise<ProductTypes[]> => {
    const res = await api.get("/products");

    return res.data;
  };

  //Queries using constructuring
  const { data, error, isLoading } = useQuery<ProductTypes[]>({
    queryKey: ["products"],
    queryFn: getProducts, //fetching data
  });

  if (isLoading) return <p>Loading products...</p>;

  // **Filter Products Based on Search Input**
  const filteredProducts = data?.filter((product) =>
    product.name.toLowerCase().includes(searchBy.toLowerCase()),
  );

  return (
    <>
      <div className="w-full mt-0 ">
        <NavBar searchBy={searchBy} setSearchBy={setSearchBy} />{" "}
        {/* Pass state as prop */}
      </div>
      <HeroSection />

      <PromoSection />

      <div className="px-5  mt-19  bg-[#141e20] w-full">
        <h1 className="text-2xl uppercase align">Products</h1>
        <div className="mt-10 text-green-500">
          {filteredProducts?.length === 0 && (
            <p> No products found, search for other names</p>
          )}
        </div>
        <ul className="mt-10 grid grid-cols-3 gap-4 mx-auto w-1/2 ">
          {filteredProducts?.map((product) => {
            return (
              <li key={product.productId}>
                <Card>
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-[200px] h-[150px] object-cover rounded-lg mx-auto"
                      />
                    </CardDescription>
                    {/* <CardDescription>Card Description</CardDescription> */}
                  </CardHeader>
                  <CardContent>
                    <p>SAR {product.price}</p>
                  </CardContent>
                  <CardFooter className="flex justify-center space-x-4">
                    <Button
                      asChild
                      variant="outline"
                      className=" bg-[#141e20] text-white"
                    >
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
