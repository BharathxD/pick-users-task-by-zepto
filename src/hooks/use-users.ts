// src/hooks/useUsers.ts
import { accounts, type Account } from "@/lib/constants";
import { useCallback, useEffect, useState } from "react";

export const useUsers = (
  selectedUsers: Account[],
  handleSelectedUser: (email: Account["email"]) => void,
  inputRef: React.RefObject<HTMLInputElement>
) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);
  const [availableAccounts, setAvailableAccounts] = useState<Account[]>(accounts);
  const [filter, setFilter] = useState("");

  const handleSelectUser = useCallback(
    (i?: number) => {
      if (!i && i !== 0 && selectedItemIndex === -1) return;
      handleSelectedUser(availableAccounts[i ?? selectedItemIndex]?.email);
      setSelectedItemIndex((prev) => {
        if (prev - 1 < 0) return availableAccounts.length - 1;
        if (prev + 1 >= availableAccounts.length) return 0;
        return prev - 1;
      });
      setAvailableAccounts((prev) => {
        const newAccounts = [...prev];
        newAccounts.splice(i ?? selectedItemIndex, 1);
        return newAccounts;
      });
      if (inputRef.current?.value) {
        inputRef.current.value = "";
      }
      setSelectedItemIndex(-1);
      inputRef.current?.focus();
    },
    [availableAccounts, handleSelectedUser, inputRef, selectedItemIndex]
  );
  useEffect(() => {
    setAvailableAccounts(() => {
      const availableAccounts = accounts.filter((account) => {
        return !selectedUsers.find((selectedUser) => selectedUser.email === account.email);
      });
      // TODO: Skip special characters
      const filteredAccounts = availableAccounts.filter((account) => {
        return new RegExp(filter, "i").test(account.username);
      });
      return filteredAccounts;
    });
  }, [filter, selectedUsers]);

  return {
    selectedItemIndex,
    setSelectedItemIndex,
    availableAccounts,
    handleSelectUser,
    setFilter,
  };
};
