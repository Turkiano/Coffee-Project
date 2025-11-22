import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import api from "@/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Login() {
  const navigator = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const res = await api.post("/users/login", user);
    return res.data; // { token: "...", user: {...} }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await handleLogin(); // <-- use result here

      console.log("Login result:", result);

      // Extract the token
      const token = result.token;

      if (!token) {
        setError("Login response did not include a valid token.");
        return;
      }

      // Save token in localStorage
      localStorage.setItem("token", token);
      console.log("Saved token:", token);

      navigator("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="m-0">
      <div className=" ">
        <h1>Login Page</h1>
      </div>
      <div className="w-1/3 m-auto mt-10">
        <form action="POST" onSubmit={handleSubmit}>
          <div>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <Button type="submit">Login</Button>
          <p>
            Create an Account{" "}
            <Link to="/signUp" className="text-blue-600">
              {" "}
              here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
