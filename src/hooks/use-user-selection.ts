import useKeyPress from "@/hooks/use-key-press";
import { accounts, KEYBOARD_EVENTS, type Account } from "@/lib/constants";
import { useCallback, useState } from "react";

const useUserSelection = () => {
  const [selectedUsers, setSelectedUsers] = useState<Account[]>([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>(selectedUsers.length);

  const handleRemoveSelectedUser = useCallback((email: Account["email"]) => {
    setSelectedUsers((prev) => prev.filter((account) => account.email !== email));
  }, []);

  const handleSelectUser = useCallback(
    (email: Account["email"]) => {
      setSelectedUserIndex(selectedUsers.length + 1);
      setSelectedUsers((prev) => {
        const userExists = prev.find((account) => account.email === email);
        if (userExists) return prev;
        const account = accounts.find((account) => account.email === email);
        if (!account) return prev;
        return [...prev, account];
      });
    },
    [selectedUsers]
  );

  const handleArrowLeftKeyPress = useCallback(() => {
    setSelectedUserIndex((prev) => {
      return prev - 1 < 0 ? selectedUsers.length : prev - 1;
    });
  }, [selectedUsers]);

  const handleArrowRightKeyPress = useCallback(() => {
    setSelectedUserIndex((prev) => (prev + 1 >= selectedUsers.length ? 0 : prev + 1));
  }, [selectedUsers]);

  const handleBackspaceKeyPress = useCallback(() => {
    setSelectedUsers((prev) => prev.filter((_, i) => i !== selectedUserIndex));
    setSelectedUserIndex(selectedUsers.length - 1);
  }, [selectedUserIndex, selectedUsers.length]);

  useKeyPress({ targetKey: KEYBOARD_EVENTS.ARROW_LEFT, callback: handleArrowLeftKeyPress });
  useKeyPress({ targetKey: KEYBOARD_EVENTS.ARROW_RIGHT, callback: handleArrowRightKeyPress });
  useKeyPress({ targetKey: KEYBOARD_EVENTS.BACKSPACE, callback: handleBackspaceKeyPress });

  return { selectedUsers, selectedUserIndex, handleRemoveSelectedUser, handleSelectUser };
};

export default useUserSelection;
