import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Role } from "@/types";
import { jwtDecode } from "jwt-decode";
import { Menu } from "lucide-react";
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
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-md">
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-gray-900 text-white p-6">
            <div className="flex flex-col gap-4">
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
              <Link to="/about" className="hover:text-gray-300">
                About Us
              </Link>
              {userRole === Role.Admin && (
                <Link to="/dashboard" className="hover:text-gray-300">
                  Dashboard
                </Link>
              )}
              {token ? (
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/signUp">Sign Up</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Logo Section */}
      <div>
        <Link to="/" className="text-xl font-bold">
          Logo
        </Link>
      </div>

      {/* Desktop Menu Links */}
      <div className="hidden md:flex gap-6">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link to="/about" className="hover:text-gray-300">
          About Us
        </Link>
        {userRole === Role.Admin && (
          <Link to="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
        )}
      </div>

      {/* Authentication Section */}
      <div className="hidden md:flex">
        {token ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Account</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link to="/signUp">Sign Up</Link>
            </Button>
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
