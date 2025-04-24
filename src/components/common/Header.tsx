// app/example/page.tsx
import { headers } from "next/headers";
import UserProfile from "../user/UserProfile";
import { ModeToggle } from "../theme-toggle";
import UserCart from "../user/UserCart";
import HeaderItem from "./HeaderItem";

const navLinks = [
  { label: "Home", href: "" },
  { label: "Catalogue", href: "/products" },
  { label: "Dashboard", href: "/dashboard" },
  // { label: "FAQ", href: "#" },
  // { label: "Contact", href: "#" },
];

export default async function Header() {
  return (
    <header className="bg-white dark:bg-black rounded-b-3xl shadow-md px-8 py-4 flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <div className="bg-black dark:bg-white  text-white dark:text-black font-bold text-2xl px-6 py-2 rounded-lg tracking-widest">
          ULearna
        </div>
      </div>

      <nav>
        <ul className="flex items-center gap-7 text-gray-500 dark:text-gray-200 font-medium">
          {navLinks.map((link, index) => (
            <HeaderItem
              key={`header-link-${index}`}
              label={link.label}
              href={link.href}
            />
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <div className="text-black dark:text-white">
          <ModeToggle />
        </div>
        <UserProfile />
        <div className="text-black dark:text-white">
          <UserCart />
        </div>
      </div>
    </header>
  );
}
