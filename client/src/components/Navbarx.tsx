import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

export default function Navbarx() {
  return (
    <Navbar className="bg-gray-200">
      <NavbarBrand>
        <p className="font-bold text-inherit">FIN FUSION</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}