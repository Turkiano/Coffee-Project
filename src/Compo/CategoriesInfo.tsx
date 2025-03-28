import api from "@/api";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { CategoryTypes } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function CategoriesInfo(){
    const [category, setcategory] = useState<CategoryTypes>({
        categoryId: "",
        name: "",
        createdAt: "" 
      });
  
      const getCategory = async (): Promise<CategoryTypes[]> => {
          const res = await api.get("/categorys");
          return res.data;
        };
  
        const {
          data: users,
          error,
          isLoading,
        } = useQuery<CategoryTypes[]>({
          queryKey: ["categorys"],
          queryFn: getCategory, //fetching data
        });
  
  
        if (isLoading) return <p>Loading categories data...</p>;
        if (error) return <p>Error loading categories data</p>;


    return(
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
                <TableHead className="text-left">Crated At </TableHead>
                
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((category) => (
                <TableRow key={category.categoryId}>
                  <TableCell className="text-left ">{category.categoryId}</TableCell>
                  <TableCell className="text-left ">{category.name}</TableCell>
                  <TableCell className="text-left ">{category.createdAt}</TableCell>
               
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
              </>

    )
}