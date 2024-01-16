"use client";

import InputWithUserSelect from "@/components/input-with-user-selection";
import SelectedUserListItem from "@/components/selected-user-list-item";
import useUserSelection from "@/hooks/use-user-selection";

const PickUsers = () => {
  const { selectedUsers, selectedUserIndex, handleRemoveSelectedUser, handleSelectUser } = useUserSelection();
  return (
    <ul className="flex flex-row flex-wrap items-center gap-2">
      {selectedUsers.length !== 0 &&
        selectedUsers.map((account) => (
          <SelectedUserListItem
            key={account.email}
            account={account}
            isSelected={account.email === selectedUsers[selectedUserIndex]?.email}
            removeSelectedUser={handleRemoveSelectedUser}
          />
        ))}
      <InputWithUserSelect handleUserSelection={handleSelectUser} selectedUsers={selectedUsers} />
    </ul>
  );
};

export default PickUsers;
