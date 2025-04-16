import api from "@/api";
import { GlobalContext } from "@/App";
import AboutMeSection from "@/Compo/AboutMeSection";
import { NavBar } from "@/Compo/NavBar";
import { ProductTypes } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export function AboutUs() {
  const context = useContext(GlobalContext);
  if (!context) throw Error("Context is missing!");
  const { searchBy } = context;

  const getProducts = async () => {
    const res = await api.get("/products");
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });


  const filteredProducts = data?.filter((product: ProductTypes) =>
    product.name.toLowerCase().includes(searchBy.toLowerCase())
  );
  
  return (
    <>
      <div>
      <NavBar />
      {/* Other content like AboutMeSection */}
      <AboutMeSection/>

      {searchBy && (
        <div className="mt-5">
          <h2>Search Results:</h2>
          {!isLoading ? (
            filteredProducts?.map((product: ProductTypes) => (
              <div key={product.productId}>
                <p>{product.name}</p>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
    </>
  );
}
