import type { Account } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { memo } from "react";
import Pill from "./pill";

interface SelectUserListItemProps {
  account: Account;
  isSelected: boolean;
  removeSelectedUser: (email: Account["email"]) => void;
}

const SelectUserListItem = ({ account, isSelected, removeSelectedUser }: SelectUserListItemProps) => (
  <Pill key={account.email} className={cn(isSelected && "border border-neutral-500")}>
    <span>{account.username}</span>
    <button
      onClick={() => removeSelectedUser(account.email)}
      className="rounded-full border border-neutral-700 bg-neutral-800 p-1 transition-colors hover:bg-neutral-700">
      <X size={15} />
    </button>
  </Pill>
);

SelectUserListItem.DisplayName = "SelectUserListItem";

export default memo(SelectUserListItem);
