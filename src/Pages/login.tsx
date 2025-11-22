import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import api from "@/api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Call the login API ONCE
      const res = await api.post("/users/login", user);

      // Extract token from the backend response
      const token = res.data.token;
      console.log("Full login response data:", res.data);

      if (!token) {
        setError("Login failed: No token received.");
        return;
      }

      // Save token for authenticated requests
      localStorage.setItem("token", token);

      console.log("Saved token:", token);

      // Redirect to the homepage
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Wrong email or password. Please try again.");
    }
  };

  return (
    <div className="m-0">
      <h1>Login Page</h1>

      <div className="w-1/3 m-auto mt-10">
        <form onSubmit={handleSubmit}>
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

          <Button type="submit">Login</Button>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <p>
            Create an Account{" "}
            <Link to="/signUp" className="text-blue-600">
              here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
