import type { Account } from "@/lib/constants";
import { memo } from "react";
import UserListItem from "./user-list-item";

interface UserListProps {
  availableUserAccounts: Account[];
  selectUser: (index: number) => void;
  currentIndex: number;
}

const UserList = ({ availableUserAccounts, selectUser, currentIndex }: UserListProps) => {
  return (
    <ul className="absolute max-h-[40dvh] w-[80vw] overflow-hidden overflow-y-scroll rounded-lg border border-neutral-700 bg-neutral-800 shadow-lg md:w-[400px]">
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
        <li className="flex size-full items-center justify-center p-4">No users found.</li>
      )}
    </ul>
  );
};

UserList.displayName = "UserList";

export default memo(UserList);
