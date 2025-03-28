import api from "@/api";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { UserTypes } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function UsersInfo(){

     const [user, setUser] = useState<UserTypes>({
      id: "",
      createdAt: "",
      firstName: "",
      lastName: "",
      phone: 0,
      email: "",
      role: "Customer", // Ensure this matches RoleType ("Admin" | "Customer")
    });

    const getUser = async (): Promise<UserTypes[]> => {
        const res = await api.get("/users");
        return res.data;
      };

      const {
        data: users,
        error,
        isLoading,
      } = useQuery<UserTypes[]>({
        queryKey: ["users"],
        queryFn: getUser, //fetching data
      });


      if (isLoading) return <p>Loading users data...</p>;
      if (error) return <p>Error loading users data</p>;

    return (
        <>
         {/* ✅ Users Table */}
         <TabsContent value="users">
         <div className="scroll-m-20 text-4xl my-10 font-semibold tracking-tight">
           <Table>
             <TableCaption>A list of your registered users.</TableCaption>
             <TableHeader>
               <TableRow>
                 <TableHead className="text-left">User ID</TableHead>
                 <TableHead className="text-left">Created At</TableHead>
                 <TableHead className="text-left">First Name</TableHead>
                 <TableHead className="text-left">Last Name</TableHead>
                 <TableHead className="text-left">Phone</TableHead>
                 <TableHead className="text-left">Email</TableHead>
                 <TableHead className="text-left">Role</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {users?.map((user) => (
                 <TableRow key={user.id}>
                   <TableCell className="text-left ">{user.id}</TableCell>
                   <TableCell className="text-left ">{user.createdAt}</TableCell>
                   <TableCell className="text-left ">{user.firstName}</TableCell>
                   <TableCell className="text-left ">{user.lastName}</TableCell>
                   <TableCell className="text-left ">{user.phone}</TableCell>
                   <TableCell className="text-left ">{user.email}</TableCell>
                   <TableCell className="text-left ">{user.role}</TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </div>
       </TabsContent>
               </>
    )
    
}