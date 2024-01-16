import type { Account } from "@/lib/constants";
import { memo } from "react";
import UserListItem from "./user-list-item";

interface UserListProps {
  availableUserAccounts: Account[];
  selectUser: (index: number) => void;
  currentIndex: number;
}

const UserList = ({ availableUserAccounts, selectUser, currentIndex }: UserListProps) => (
  <ul className="absolute top-[150%] size-[400px] overflow-hidden overflow-y-scroll rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg">
    {availableUserAccounts.length !== 0 ? (
      availableUserAccounts.map((account, i) => (
        <UserListItem
          onClick={() => selectUser(i)}
          account={account}
          key={account.email}
          selected={i === currentIndex}
        />
      ))
    ) : (
      <div className="flex size-full items-center justify-center p-4">No users found.</div>
    )}
  </ul>
);

UserList.displayName = "UserList";

export default memo(UserList);
