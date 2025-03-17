import api from "@/api";
import { ProductTypes } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function ProductDetails() {
  const params = useParams(); //to capture the product id
  // Convert string ID to Guid format



  const getProduct = async () => {
    try {
      if (params.productId) {
        const res = await api.get(`/products/${params.productId}`) //adjust the end-point
        console.log("API Response:", res.data);  // Debugging

        return res.data
      }
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const { data: product, error, isLoading } = useQuery<ProductTypes>({
    queryKey: ["productDetails"],
    queryFn: getProduct
  })

  //early return (we might have wrong product id)
  if (!product) {
    return <p>Product was not found!</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  //The page might take time to load a product details
  if (isLoading) {
    return <p>Loading . . .</p>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <h3>{product.name}</h3>
    </div>
  );
}
