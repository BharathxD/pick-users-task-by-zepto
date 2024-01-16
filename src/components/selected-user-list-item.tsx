import type { Account } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import { memo } from "react";
import Pill from "./pill";

interface SelectUserListItemProps {
  account: Account;
  isSelected: boolean;
  removeSelectedUser: (email: Account["email"]) => void;
}

const SelectUserListItem = ({ account, isSelected, removeSelectedUser }: SelectUserListItemProps) => (
  <Pill key={account.email} className={cn(isSelected && "border border-neutral-500")}>
    <div className="flex flex-row items-center gap-4">
      <div className="aspect-square size-10 rounded-full border border-neutral-500 bg-neutral-700">
        <Image height={40} width={40} src={account.imageUrl} alt={`${account.username}'s profile picture`} />
      </div>
      <span>{account.username}</span>
    </div>
    <button
      onClick={() => removeSelectedUser(account.email)}
      className="ml-4 rounded-full border border-neutral-700 bg-neutral-800 p-1 transition-colors hover:bg-neutral-700">
      <X size={15} />
    </button>
  </Pill>
);

SelectUserListItem.DisplayName = "SelectUserListItem";

export default memo(SelectUserListItem);
