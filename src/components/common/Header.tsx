import { Lock, Heart } from "lucide-react";
import UserProfile from "./UserProfile";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Catalogue", href: "#", active: true },
  { label: "About Us", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Header() {
  return (
    <header className="bg-white rounded-b-3xl shadow-md px-8 py-4 flex items-center justify-between w-full">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="bg-black text-white font-bold text-2xl px-6 py-2 rounded-lg tracking-widest">
          LOGO
        </div>
      </div>
      {/* Nav */}
      <nav>
        <ul className="flex items-center gap-7 text-gray-500 font-medium">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={
                  link.active
                    ? "font-bold text-gray-900 underline underline-offset-4"
                    : "hover:text-gray-900 transition-colors"
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {/* Right side: icons, user */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Lock className="w-5 h-5 text-gray-700" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Heart className="w-5 h-5 text-gray-700" />
        </button>
        <UserProfile />
      </div>
    </header>
  );
}
