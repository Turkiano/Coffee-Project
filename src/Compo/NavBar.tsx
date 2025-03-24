import { Button } from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { jwtDecode } from "jwt-decode";
import { Cart } from "./Cart";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ChangeEvent, } from "react";
import { ModeToggle } from "./mode-toggle";


interface NavBarProps {
  searchBy: string;
  setSearchBy: (value: string) => void;
}

export function NavBar({ searchBy, setSearchBy }: NavBarProps) {
    
   
  
  
  const token = localStorage.getItem("token");
  let userRole = null;

  // Decode the token to get the user role
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      userRole =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
    } catch (error) {
      console.error("Invalid Token:", error);
    }
  }
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchBy(e.target.value);
  };


  return (
    <div className="w-full flex justify-between items-center border-b p-3 bg-background z-50">
      {/* Logo Section */}
      <div>
        <Link to="/" className="text-xl font-bold ">
          Logo
        </Link>
      </div>
      

      {/* Navigation Menu (Desktop) */}
      <div className="hidden md:flex space-x-6 mx-auto">
        <Link to="/">Home</Link>
        <Link to="/aboutUs">About Us</Link>
        {userRole === "Admin" && <Link to="/dashboard">Dashboard</Link>}
      </div>
       {/* Search Input */}
       <div className="w-1/7 mr-5">
        <Input
          type="search"
          placeholder="Search for products"
          value={searchBy} // Controlled input
          onChange={handleChange}
        />
      </div>
      {/* Authentication Section */}
      <div className="hidden md:flex space-x-3">
        {token ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Account</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <span className="text-white">👤</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/signUp">Sign Up</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/login">Login</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ModeToggle/>
        <Cart />
      </div>
    </div>
  );
}
