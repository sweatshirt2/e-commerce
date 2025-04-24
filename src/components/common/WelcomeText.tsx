"use client";

import { useUser } from "@/context";

export default function WelcomeText() {
  const { user } = useUser();
  return (
    <div className="px-12">
      <h3 className="text-2xl text-slate-800 dark:text-slate-200 font-bold">
        Welcome {user.name}
      </h3>
    </div>
  );
}
