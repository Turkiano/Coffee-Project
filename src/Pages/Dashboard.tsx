import api from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductTypes } from "@/types";

export function Dashboard(){


  const queryClient = new QueryClient()

  const [product, setProduct] = useState({
    name: "",
    categoryId: ""
  })

  const handleChange = (e: any) =>{
    const {name, value} = e.target
    setProduct({
      ...product,
      [name]: value
    })
    
  };

  const postProduct = async ()=>{
    try{
      const res = await api.post("/products", product,) //Passing the data as a 2nd param
      return res.data

    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleSubmit = async (e: any) =>{
    e.preventDefault(); // Prevent page refresh~
    await postProduct() //send the dada to the backend
    queryClient.invalidateQueries({queryKey: ["products"]})  
  };

  //to get products from API
  const getProducts = async (): Promise<ProductTypes[]> => {
    const res = await api.get("/products");
    return res.data;
  };

  //Queries using constructuring
  const { data: products, error, isLoading } = useQuery<ProductTypes[]>({
    queryKey: ["products"],
    queryFn: getProducts, //fetching data
  });

  if (isLoading) return <p>Loading products...</p>;

    return (
      <>
        <form onSubmit={handleSubmit} className="mt-20 w-full mx-auto">
        <h3 className="m-20 text-2xl font-semibold tracking-tight mb-3">
          Add New Product
        </h3>
        <Input  name="name" onChange={handleChange} type="text" placeholder="Product Name" />
        <Input  name="categoryId" onChange={handleChange} className="mt-3" type="text" placeholder="Category Id" />
        <Button  className="mt-3" type="submit">
          Submit
        </Button>
      </form>

      <div>
      <div>
    <Table>
  <TableCaption>A list of your recent Products.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]"></TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Category Id</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {products?.map((product)=>(
      <TableRow key={product.id}>
      <TableCell className="font-medium"></TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.categoryId}</TableCell>
    </TableRow>
    ))}
  </TableBody>
</Table>

    </div>
      </div>
      </>
    )
}