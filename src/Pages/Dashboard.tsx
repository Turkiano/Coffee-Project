import api from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QueryClient, useQuery } from "@tanstack/react-query";
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

export function Dashboard() {
  const queryClient = new QueryClient();

  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id)
    queryClient.invalidateQueries({ queryKey: ["products"] });
  }

  const deleteProduct = async (id: string) => {
    try {
      const res = await api.delete(`/products/ ${id}`); 
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
    await postProduct(); //send the dada to the backend
    queryClient.invalidateQueries({ queryKey: ["products"] });
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

  if (isLoading) return <p>Loading products...</p>;

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

        <div >
          <Tabs defaultValue="products" className="mx-auto">
            <TabsList >
              <TabsTrigger value="users" className="text-white gap-7">Users</TabsTrigger>
              <TabsTrigger value="products" className="text-white gap-5">Products</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
              Make changes to your account here.
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
                      <TableHead className="text-left">Action</TableHead>



                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products?.map((product) => (
                      <TableRow key={product.productId}>
                        <TableCell></TableCell>
                        <TableCell className="text-left ">{product.name}</TableCell>
                        <TableCell className="text-left ">{product.image}</TableCell>

                        <TableCell className="text-left ">{product.categoryId}</TableCell>
                        <TableCell className=" text-left ">SAR {product.price}</TableCell>
                        <TableCell className="text-left">{product.productId}</TableCell>
                        <TableCell className="text-left">{product.quantity}</TableCell>
                        <TableCell className="text-left">
                          <Alert />
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
