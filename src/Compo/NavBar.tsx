import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { jwtDecode } from "jwt-decode";
import { Cart } from "./Cart";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
import { ModeToggle } from "./mode-toggle";
import { Menu } from "lucide-react";

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
    <>
      {/* desktop */}
      <div className="hidden md:grid w-full fixed top-0  grid-cols-5  items-center border-b p-3 bg-background z-50">
        {/* Logo Section */}
        <div className="justify-self-start">
          <Link to="/" className="text-xl font-bold ">
            Logo
          </Link>
        </div>

        {/* Navigation Menu (Desktop) */}
        <div className="flex space-x-6 mx-auto col-span-3">
          <Link to="/">Home</Link>
          <Link to="/aboutUs">About Us</Link>
          {userRole === "Admin" && <Link to="/dashboard">Dashboard</Link>}
        </div>
        {/* Search Input */}
        {/* Authentication Section */}
        <div className="flex space-x-3 justify-self-end">
          <div className="w-48 mr-5">
            <Input
              type="search"
              placeholder="Search for products"
              value={searchBy} // Controlled input
              onChange={handleChange}
              className="bg-background"
            />
          </div>
          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>Account</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
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
          <ModeToggle />
          <Cart />
        </div>
      </div>

      {/* mobile */}
      <div className="grid md:hidden bg-background w-full fixed top-0  grid-cols-5  items-center border-b p-3  z-50">
        {/* Logo Section */}
        <div className="justify-self-start">
          <Link to="/" className="text-xl font-bold ">
            Logo
          </Link>
        </div>

        <div className="w-40 mr-5 col-span-2">
          <Input
            type="search"
            placeholder="🔍 Search"
            value={searchBy} // Controlled input
            onChange={handleChange}
            className="bg-[#141e20]"
          />
        </div>

        <div className="flex gap-3 col-span-2 items-center justify-self-end">
          <Cart />
          <DropdownMenu>
            <DropdownMenuTrigger className="">
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {token ? (
                <DropdownMenuItem onClick={handleLogout} className="bg-[#141e20]">
                  Logout
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem asChild className="bg-[#141e20]">
                    <Link to="/signUp">Sign Up</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="bg-[#141e20]">
                    <Link to="/login">Login</Link>
                  </DropdownMenuItem>
                </>
              )}
               <DropdownMenuSeparator />
              <DropdownMenuLabel >Pages</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="bg-[#141e20]">
                <Link to="/" >Home</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="bg-[#141e20]">
                <Link to="/aboutUs">About Us</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="bg-[#141e20]">
                {userRole === "Admin" && <Link to="/dashboard">Dashboard</Link>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
