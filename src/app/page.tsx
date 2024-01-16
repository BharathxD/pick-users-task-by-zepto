"use client";

import { Input } from "@/components/input";
import Pill from "@/components/pill";
import Users from "@/components/users";
import useKeyPress from "@/hooks/use-key-press";
import { Account, accounts } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const [selectedUsers, setSelectedUsers] = useState<Account[]>([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>(-1);
  useEffect(() => {
    setSelectedUserIndex((prev) => selectedUsers.length);
  }, [selectedUsers]);
  const handleRemoveSelectedUser = useCallback((email: Account["email"]) => {
    setSelectedUsers((prev) => {
      return prev.filter((account) => account.email !== email);
    });
  }, []);
  const handleSelectUser = useCallback((email: Account["email"]) => {
    setSelectedUserIndex(-1);
    setSelectedUsers((prev) => {
      if (prev.find((account) => account.email === email)) {
        console.info("It's already there");
        return prev;
      }
      const account = accounts.find((account) => account.email === email);
      if (!account) {
        console.info("No such account");
        return prev;
      }
      return [...prev, account];
    });
  }, []);
  useKeyPress({
    targetKey: "ArrowLeft",
    callback: () => {
      setSelectedUserIndex((prev) => {
        if (prev - 1 < 0) return selectedUsers.length - 1;
        return prev - 1;
      });
    },
  });
  useKeyPress({
    targetKey: "ArrowRight",
    callback: () => {
      setSelectedUserIndex((prev) => {
        if (prev + 1 >= selectedUsers.length) return 0;
        return prev + 1;
      });
    },
  });
  useKeyPress({
    targetKey: "Backspace",
    callback: () => {
      setSelectedUsers((prev) => {
        const newSelectedUsers = [...prev];
        newSelectedUsers.pop();
        return newSelectedUsers;
      });
    },
  });
  return (
    <main className="space-y-6 p-24">
      <h1>Pick users</h1>
      <div className="flex flw-row h-fit w-full border-b border-neutral-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50">
        <ul className="flex flex-row flex-wrap gap-2">
          {selectedUsers.length !== 0 &&
            selectedUsers.map((account) => (
              <Pill
                key={account.email}
                onClick={() => handleRemoveSelectedUser(account.email)}
                className={cn(
                  account.email === selectedUsers[selectedUserIndex]?.email &&
                    "bg-red-500"
                )}
              >
                {account.username}
              </Pill>
            ))}
          <Users
            handleSelectedUser={handleSelectUser}
            selectedUsers={selectedUsers}
            className="absolute top-[125%] w-full min-w-[300px]"
          />
        </ul>
      </div>
    </main>
  );
}
