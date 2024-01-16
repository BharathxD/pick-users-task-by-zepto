import useKeyPress from "@/hooks/use-key-press";
import useOnClickOutside from "@/hooks/use-onclick-outside";
import { Account, accounts } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Input } from "./input";

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  handleSelectedUser: (email: Account["email"]) => void;
  selectedUsers: Account[];
}

const Users = ({
  handleSelectedUser,
  selectedUsers,
  className,
  ...rest
}: Props) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);
  const [focussed, setIsFocussed] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const ref = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClickOutside = () => setIsFocussed(false);
  useOnClickOutside(ref, handleClickOutside);
  const [availableAccounts, setAvailableAccounts] =
    useState<Account[]>(accounts);
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
    [availableAccounts, handleSelectedUser, selectedItemIndex]
  );

  const [filter, setFilter] = useState("");

  useEffect(() => {
    setAvailableAccounts((prev) => {
      const availableAccounts = accounts.filter((account) => {
        return !selectedUsers.find(
          (selectedUser) => selectedUser.email === account.email
        );
      });
      // TODO: Skip special characters
      const filteredAccounts = availableAccounts.filter((account) => {
        return new RegExp(filter, "i").test(account.username);
      });
      return filteredAccounts;
    });
  }, [filter, selectedUsers]);

  // const filteredAccounts = availableAccounts.filter((account) =>
  //   new RegExp(filter, "i").test(account.username)
  // );

  useKeyPress({
    targetKey: "ArrowDown",
    callback: () => {
      setSelectedItemIndex((prev) => {
        if (prev + 1 >= availableAccounts.length) {
          inputRef.current?.focus();
          return -1;
        }
        return prev + 1;
      });
    },
  });
  useKeyPress({
    targetKey: "ArrowUp",
    callback: () => {
      setSelectedItemIndex((prev) => {
        // if (!availableAccounts[prev])
        if (prev - 1 < -1) {
          return availableAccounts.length - 1;
        }
        inputRef.current?.focus();
        return prev - 1;
      });
    },
  });
  useKeyPress({
    targetKey: "Enter",
    callback: handleSelectUser,
  });
  useEffect(() => {
    if (selectedItemIndex !== -1) {
      inputRef.current?.blur();
    }
  }, [selectedItemIndex]);
  return (
    <li className="relative" ref={ref} onClick={() => setIsFocussed(true)}>
      <Input
        placeholder="Add new user..."
        ref={inputRef}
        onChange={(event) => {
          setFilter(event.target?.value);
        }}
        className="bg-transparent size-full outline-none px-2 rounded-md"
      />
      {focussed && (
        <ul
          className={cn(
            "rounded-lg border bg-neutral-800 border-neutral-700 shadow-lg overflow-hidden",
            className
          )}
          {...rest}
        >
          {availableAccounts.map((account, i) => {
            return (
              <UserListItem
                onClick={() => handleSelectUser(i)}
                account={account}
                key={account.email}
                selected={i === selectedItemIndex}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
};

interface UserListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  account: Account;
  selected: boolean;
}

const UserListItem = ({ account, selected, ...rest }: UserListItemProps) => {
  return (
    <li
      className={cn(
        "px-4 py-2 hover:bg-neutral-700 hover:cursor-pointer flex flex-row justify-between",
        selected && "bg-neutral-700"
      )}
      key={account.email}
      {...rest}
    >
      <div className="flex flex-row gap-4">
        <div className="aspect-square size-6 rounded-full bg-neutral-700 border" />
        <h5>{account.username}</h5>
      </div>
      <p className="text-neutral-500">{account.email}</p>
    </li>
  );
};

Users.displayName = "Users";

export default memo(Users);
