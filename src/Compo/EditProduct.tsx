import api from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ProductTypes } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";


export function EditProduct({ product }: { product: ProductTypes }) {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const queryClient = useQueryClient();
console.log("updatedProduct:", updatedProduct);


  
  const updateProduct = async() => {
    try {
      const res = await api.patch(`/products/${updatedProduct.productId}`, updatedProduct)
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const handleUpdateProduct = async () =>{
    await updateProduct()
    queryClient.invalidateQueries({ queryKey: ["products"] });



  }

 

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setUpdatedProduct({
      ...updatedProduct,
      name: value,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={updatedProduct.name} className="col-span-3" onChange={handleChange} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleUpdateProduct}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
