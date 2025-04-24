import { Lock, Heart } from "lucide-react";
import UserProfile from "../user/UserProfile";
import { ModeToggle } from "../theme-toggle";
import UserCart from "../user/UserCart";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Catalogue", href: "#", active: true },
  { label: "About Us", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Header() {
  return (
    <header className="bg-white dark:bg-black rounded-b-3xl shadow-md px-8 py-4 flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <div className="bg-black dark:bg-white  text-white dark:text-black font-bold text-2xl px-6 py-2 rounded-lg tracking-widest">
          ULearna
        </div>
      </div>
      {/* Nav */}
      <nav>
        <ul className="flex items-center gap-7 text-gray-500 dark:text-gray-200 font-medium">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={
                  link.active
                    ? "font-bold text-gray-900 dark:text-gray-200 underline underline-offset-4"
                    : "hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                }
              >
                {link.label}
              </a>
            </li>
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
