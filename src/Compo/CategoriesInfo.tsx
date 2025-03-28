import api from "@/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { CategoryTypes } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AlertCategory } from "./AlertCategory";

export function CategoriesInfo() {
  const queryClient = useQueryClient();

  const [category, setcategory] = useState<CategoryTypes>({
    categoryId: "",
    name: "",
    createdAt: "",
  });

  const getCategory = async (): Promise<CategoryTypes[]> => {
    const res = await api.get("/categorys");
    return res.data;
  };

  const {
    data: categorys,
    error,
    isLoading,
  } = useQuery<CategoryTypes[]>({
    queryKey: ["categorys"],
    queryFn: getCategory, //fetching data
  });

  if (isLoading) return <p className="text-center text-blue-500">Loading categories data...</p>;
  if (error) return <p className="text-center text-red-500">Error loading categories data</p>;
  

  const deleteCategory = async (categoryId: string) => {
    try {
      const res = await api.delete(`/categorys/${categoryId}`);
      console.log("Delete Category response:", res.data);
      return res.data;
    } catch (error: any) {
      console.error("Delete Category error:", error.response?.data || error.message);
      return Promise.reject(new Error("Something went wrong"));
    }
  };

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory(id);
    queryClient.invalidateQueries({ queryKey: ["categorys"] });
  };

  return (
    <>
      {/* ✅ Categories Table */}
      <TabsContent value="categories">
        <div className="scroll-m-20 text-4xl my-10 font-semibold tracking-tight">
          <Table>
            <TableCaption>A list of your registered categories.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Category ID</TableHead>
                <TableHead className="text-left">Category Name</TableHead>
                <TableHead className="text-left">Created At </TableHead>
                <TableHead className="text-left">Action </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categorys?.map((category) => (
                <TableRow key={category.categoryId}>
                  <TableCell className="text-left ">
                    {category.categoryId}
                  </TableCell>
                  <TableCell className="text-left ">{category.name}</TableCell>
                  <TableCell className="text-left ">
                    {category.createdAt}
                  </TableCell>
                  <TableCell className="text-left">
                    {" "}
                    <AlertCategory
                      category={category}
                      onConfirm={() =>
                        handleDeleteCategory(category.categoryId)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </>
  );
}
