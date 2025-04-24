"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderItem({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const pathname = usePathname();

  return (
    <li key={label}>
      <Link
        href={href}
        className={
          href === pathname
            ? "font-bold text-gray-900 dark:text-gray-200 underline underline-offset-4"
            : "hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        }
      >
        {label}
      </Link>
    </li>
  );
}
