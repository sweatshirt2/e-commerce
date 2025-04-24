"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useCart, users, useUser } from "@/context";
import { TUserSession } from "@/context/user/user.type";

export default function UserProfile() {
  const { user, dispatchUser } = useUser();
  const { dispatchCart } = useCart();

  const handleSetUser = (newUser: TUserSession) => {
    return () => {
      dispatchUser({ type: "SET_USER", payload: newUser });
      dispatchCart({
        type: "SET_USER_ID",
        payload: { userId: newUser.userId },
      });
    };
  };

  return (
    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 shadow-sm">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <span>{user.name || "Choose Profile"}</span>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {users.map((userItem) => (
            <DropdownMenuItem onClick={handleSetUser(userItem)}>
              {userItem.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
