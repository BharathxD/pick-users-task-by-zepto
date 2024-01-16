import type { Account } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { memo, useEffect, useRef } from "react";

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
      <div className="flex flex-row items-center gap-4">
        <div className="aspect-square size-10 rounded-full border border-neutral-500 bg-neutral-700">
          <Image
            height={40}
            width={40}
            src={account.imageUrl}
            alt={`${account.username}'s profile picture`}
          />
        </div>
        <h5>{account.username}</h5>
      </div>
      <p className="text-neutral-500">{account.email}</p>
    </li>
  );
};

UserListItem.displayName = "UserListItem";

export default memo(UserListItem);
