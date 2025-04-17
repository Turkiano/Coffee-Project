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
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Menu } from "lucide-react";
import { GlobalContext } from "@/App";
import { useQuery } from "@tanstack/react-query";
import { ProductTypes } from "@/types";
import api from "@/api";

// interface NavBarProps {
//   searchBy: string;
//   setSearchBy: (value: string) => void;
// }

export function NavBar() {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("Context is missing in NavBar!");

  const { searchBy, setSearchBy } = context;
  const [debouncedSearch, setDebouncedSearch] = useState(searchBy);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchBy);
    }, 300); // Delay in ms

    return () => {
      clearTimeout(handler);
    };
  }, [searchBy]);

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

  //Fetch all products from the API
  const { data: products } = useQuery<ProductTypes[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/products");
      return res.data;
    },
  });

  // Filter based on search input
  const filtered = products?.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

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
          <Link to="/reservation">Reservation</Link>
          {userRole === "Admin" && <Link to="/dashboard">Dashboard</Link>}
        </div>
        {/* Search Input */}
        <div className="flex space-x-3 justify-self-end">
          {/* Search Input */}
          <div className="relative w-48 mr-5">
            <Input
              type="search"
              placeholder="Search for products"
              value={searchBy}
              onChange={handleChange}
              className="bg-background"
            />

            {/* Filtered Results Dropdown */}
            {searchBy && filtered && filtered.length > 0 && (
              <ul className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg text-black max-h-60 overflow-y-auto">
                {filtered.slice(0, 5).map((product) => (
                  <li key={product.productId}>
                    <Link
                      to={`/products/${product.productId}`}
                      onClick={() => setSearchBy("")}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <span>{product.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* No Results Message */}
            {searchBy && filtered?.length === 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white text-black rounded-md shadow-md px-4 py-2">
                No products found.
              </div>
            )}
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

        <div className="relative w-40 mr-5 col-span-2">
          <Input
            type="search"
            placeholder="🔍 Search"
            value={searchBy}
            onChange={handleChange}
            className="bg-[#141e20]"
          />

          {searchBy.length > 0 && filtered && (
            <ul className="absolute mt-2 bg-white text-black rounded shadow-md w-60 max-h-60 overflow-y-auto z-50 left-3 top-14">
              {filtered.slice(0, 5).map((product) => (
                <li key={product.productId}>
                  <Link
                    to={`/products/${product.productId}`}
                    onClick={() => setSearchBy("")}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <span>{product.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {searchBy && filtered?.length === 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white text-black rounded-md shadow-md px-4 py-2">
              No products found.
            </div>
          )}
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
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="bg-[#141e20]"
                >
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
              <DropdownMenuLabel>Pages</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="bg-[#141e20]">
                <Link to="/">Home</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="bg-[#141e20]">
                <Link to="/aboutUs">About Us</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="bg-[#141e20]">
                <Link to="/reservation">Reservation</Link>
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
