import api from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";

import { ProductTypes } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert } from "@/Compo/Alert";
import { EditProduct } from "@/Compo/EditProduct";
import { UsersInfo } from "@/Compo/UsersInfo";
import { CategoriesInfo } from "@/Compo/CategoriesInfo";

export function Dashboard() {
  const queryClient = useQueryClient();
  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    image: "",
    quantity: 0,
    price: 0,
    description: ""
    
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  //to get products from API
  const getProducts = async (): Promise<ProductTypes[]> => {
    const res = await api.get("/products");
    return res.data;
  };

  //Queries using constructuring
  const {
    data: products,
    error,
    isLoading,
  } = useQuery<ProductTypes[]>({
    queryKey: ["products"],
    queryFn: getProducts, //fetching data
  });

  // const products = data?.products || [];
  // const users = data?.users || [];

  if (isLoading) return <p>Loading product data...</p>;
  if (error) return <p>Error loading product data</p>;

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const deleteProduct = async (productid: string) => {
    try {
      const res = await api.delete(`/products/${productid}`); // ✅ should match API endpoint
      console.log("Delete response:", res);

      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const postProduct = async () => {
    try {
      const res = await api.post("/products", product); //Passing the data as a 2nd param
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent page refresh~
    await postProduct(); //send the data to the backend
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit} className="w-1/3 mx-auto">
          <h3 className="text-2xl font-semibold tracking-tight mb-3">
            Add New Product
          </h3>
          <Input
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Product Name"
          />
          <Input
            name="categoryId"
            onChange={handleChange}
            className="mt-3"
            type="text"
            placeholder="Category Id"
          />
          <Button className="mt-3" type="submit">
            Submit
          </Button>
        </form>

        <div>
          <Tabs defaultValue="products" className="mx-auto">
            <TabsList>
              <TabsTrigger value="users" className="text-white gap-7">
                Users
              </TabsTrigger>
              <TabsTrigger value="products" className="text-white gap-5">
                Products
              </TabsTrigger>
              <TabsTrigger value="categories" className="text-white gap-5">
                Categories
              </TabsTrigger>
            </TabsList>
            <TabsContent value="users">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="users">
              <UsersInfo />
            </TabsContent>
            <TabsContent value="categories">
              <CategoriesInfo />
            </TabsContent>

            <TabsContent value="products">
              <div className="scroll-m-20 text-4xl my-10 font-semibold tracking-tight">
                <Table>
                  <TableCaption>A list of your recent Products.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className=" "></TableHead>
                      <TableHead className="text-left ">Name</TableHead>
                      <TableHead className="text-left ">Image</TableHead>
                      <TableHead className="text-left">Category Id</TableHead>
                      <TableHead className="text-left">Price</TableHead>
                      <TableHead className="text-left">Product Id</TableHead>
                      <TableHead className="text-left">Quantity</TableHead>
                      <TableHead className="text-left">Update</TableHead>
                      <TableHead className="text-left">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products?.map((product) => (
                      <TableRow key={product.productId}>
                        <TableCell></TableCell>
                        <TableCell className="text-left ">
                          {product.name}
                        </TableCell>
                        <TableCell className="text-left ">
                          {product.image}
                        </TableCell>
                        <TableCell className="text-left ">
                          {product.categoryId}
                        </TableCell>
                        <TableCell className=" text-left ">
                          SAR {product.price}
                        </TableCell>
                        <TableCell className="text-left">
                          {product.productId}
                        </TableCell>
                        <TableCell className="text-left">
                          {product.quantity}
                        </TableCell>
                        <TableCell className="text-left text-white">
                          <EditProduct product={product} />
                        </TableCell>
                        <TableCell className="text-left">
                          {" "}
                          <Alert
                            product={product}
                            onConfirm={() =>
                              handleDeleteProduct(product.productId)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>{" "}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
