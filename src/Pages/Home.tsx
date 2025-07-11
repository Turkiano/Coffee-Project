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
import HeroSection from "@/Compo/HeroSection";
import { PromoSection } from "@/Compo/PromoSection";

export function Home() {
  const context = useContext(GlobalContext);
  if (!context) throw Error("Context is missing!!");
  const { handleAddToCart, searchBy } = context;

  const getProducts = async (): Promise<ProductTypes[]> => {
    const res = await api.get("/products");

    return res.data;
  };

  //Queries using constructuring
  const { data, error, isLoading } = useQuery<ProductTypes[]>({
    queryKey: ["products"],
    queryFn: getProducts, //fetching data
  });

  // if (isLoading) return <p>Loading products...</p>;

  // **Filter Products Based on Search Input**
  const filteredProducts = data?.filter((product) =>
    product.name.toLowerCase().includes(searchBy.toLowerCase()),
  );

  return (
    <>
      <div className="w-full mt-0 ">
        <NavBar />
      </div>
      <HeroSection />


      <div className="px-5  mt-19  bg-[#141e20] w-full">
        <h1 className="text-2xl uppercase align">Products</h1>
        <div className="mt-10 text-green-500">
          {filteredProducts?.length === 0 && (
            <p> No products found, search for other names</p>
          )}
        </div>
        {!isLoading ? (
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto md:w-1/2 ">
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
                    <CardFooter className="flex flex-col md:flex-row gap-3 justify-center space-x-4">
                      <Button
                        asChild
                        variant="outline"
                        className=" bg-[#141e20] text-white"
                      >
                        <Link to={`/products/${product.productId}`}>
                          Details
                        </Link>
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
        ) : (
          <div className="pb-12 felx justify-center w-full">
            <span className=" text-xl">Loading products...</span>
            <span className=" text-xl">Less than 60 seconds</span>
          </div>
        )}
        {error && <p className="text-red-500">Error: {error.message}</p>}
      </div>
            <PromoSection />

    </>
  );
}
