import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import api from "../api";  
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";




export function SignUp() {

    const navigator = useNavigate()

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState<string | null>(null);

    console.log("User inputs:", user);

    const handleSignUp = async () => {
        try {
            const res = await api.post("/users/signup", user);
            return res.data;
        } catch (error) {
            console.error("Sign-up error:", error);
            setError("Something went wrong! Please try again.");
            return Promise.reject(new Error("Something went wrong!!"));
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null); // Reset error state
        const response = await handleSignUp();
        console.log("response:", response);
        if (response){
                navigator('/login')
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input name="firstName" type="text" value={user.firstName} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input name="lastName" type="text" value={user.lastName} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input name="phone" type="text" value={user.phone} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input name="email" type="email" value={user.email} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input name="password" type="password" value={user.password} onChange={handleChange} />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">Sign Up</Button>
          </form>
          <p className="text-center mt-4 text-sm">
            Have an account? <Link to='/login' className="text-blue-500">Login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
    );
}
