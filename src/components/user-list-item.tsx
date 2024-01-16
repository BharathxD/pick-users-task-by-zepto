import type { Account } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { memo, useEffect, useRef } from "react";
import UserAvatar from "./user-avatar";

interface UserListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  account: Account;
  selected: boolean;
}

const UserListItem = ({ account, selected, ...rest }: UserListItemProps) => {
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (selected && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selected]);

  return (
    <li
      ref={itemRef}
      className={cn(
        "flex flex-row items-center justify-between p-3 transition-colors hover:cursor-pointer hover:bg-neutral-700",
        selected && "bg-neutral-700"
      )}
      key={account.email}
      {...rest}>
      <UserAvatar account={account} />
      <p className="text-neutral-500">{account.email}</p>
    </li>
  );
};

UserListItem.displayName = "UserListItem";

export default memo(UserListItem);
