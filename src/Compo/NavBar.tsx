import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { jwtDecode } from "jwt-decode";
import { Cart } from "./Cart";
import { Link } from "react-router-dom";

export function NavBar() {
  const token = localStorage.getItem("token");
  let userRole = null;

  // Decode the token to get the user role
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
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

  return (
    <div className="flex justify-between items-center mx auto border-b p-3 sticky top-0 left-0 bg-background z-50">
      {/* Logo Section */}
      <div>
        <Link to="/" className="text-xl font-bold ">
          Logo
        </Link>
      </div>

      {/* Navigation Menu (Desktop) */}
      <div className=" gap-6">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/aboutUs">
                <NavigationMenuLink>About Us</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {userRole === "Admin" && (
              <NavigationMenuItem>
                <Link to="/dashboard">
                  <NavigationMenuLink>Dashboard</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Authentication Section */}
      <div className="hidden md:flex">
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
          <div className="flex gap-4">
            <Button asChild>
              <Link to="/signUp">Sign Up</Link>
            </Button>
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        )}
      </div>

      <Cart/>
    </div>
  );
}
