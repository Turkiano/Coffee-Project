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
import { ChangeEvent, useEffect, useState } from "react";

export function EditProduct({ product }: { product: ProductTypes }) {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  // Update the Dialog component to close after save
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  // Add this useEffect to sync props with state
  useEffect(() => {
    setUpdatedProduct(product);
  }, [product, open]);

  const updateProduct = async () => {
    try {
      console.log("Sending to API:", updatedProduct); // Debug log

      const res = await api.patch(
        `/products/${updatedProduct.productId}`,
        updatedProduct,
      );
      return res.data;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw for error handling
    }
  };

  const handleUpdateProduct = async () => {
    await updateProduct();
    queryClient.invalidateQueries({ queryKey: ["products"] });
    setOpen(false); // Close dialog after save
  };

  // const handleUpdateProduct = async () => {
  //   try {
  //     // Optimistic update
  //     queryClient.setQueryData<ProductTypes[]>(['products'], (old) => 
  //       old?.map(p => 
  //         p.productId === updatedProduct.productId ? updatedProduct : p
  //       ) || []
  //     );
      
  //     await updateProduct();
      
  //     // Force refresh
  //     await queryClient.invalidateQueries({ 
  //       queryKey: ["products"],
  //       exact: true,
  //       refetchType: 'active'
  //     });
      
  //     setOpen(false);
  //   } catch (error) {
  //     // Rollback on error
  //     queryClient.invalidateQueries({ 
  //       queryKey: ["products"],
  //       exact: true
  //     });
  //     console.error("Update failed:", error);
  //   }
  // };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [id]: id === "quantity" || id === "price" ? Number(value) || 0 : value,
    }));
  };
  // useEffect(() => {
  //   console.log("Updated product state:", updatedProduct);
  // }, [updatedProduct]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to your products here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={updatedProduct.name}
              className="col-span-3"
              onChange={handleChange}
            />
            <Label htmlFor="categoryId" className="text-right">
              Category Id
            </Label>
            <Input
              id="categoryId"
              value={updatedProduct.categoryId}
              className="col-span-3"
              onChange={handleChange}
            />
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <Input
              id="image"
              value={updatedProduct.image}
              className="col-span-3"
              onChange={handleChange}
            />
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              value={updatedProduct.quantity}
              className="col-span-3"
              onChange={handleChange}
            />
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              value={updatedProduct.price}
              className="col-span-3"
              onChange={handleChange}
            />
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={updatedProduct.description}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleUpdateProduct}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
