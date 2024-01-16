import type { Account } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface UserListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  account: Account;
  selected: boolean;
}

const UserListItem = ({ account, selected, ...rest }: UserListItemProps) => {
  return (
    <li
      className={cn(
        "flex flex-row justify-between px-4 py-2 hover:cursor-pointer hover:bg-neutral-700",
        selected && "bg-neutral-700"
      )}
      key={account.email}
      {...rest}>
      <div className="flex flex-row gap-4">
        <div className="aspect-square size-6 rounded-full border bg-neutral-700" />
        <h5>{account.username}</h5>
      </div>
      <p className="text-neutral-500">{account.email}</p>
    </li>
  );
};

UserListItem.displayName = "UserListItem";

export default memo(UserListItem);
