import useKeyPress from "@/hooks/use-key-press";
import useOnClickOutside from "@/hooks/use-on-click-outside";
import { accounts, INITIAL_INDEX, KEYBOARD_EVENTS, type Account } from "@/lib/constants";
import { sanitizeValue } from "@/lib/utils";
import dynamic from "next/dynamic";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import Input from "./input";
import Skeleton from "./skeleton";

const UserList = dynamic(() => import("./user-list"), {
  loading: () => (
    <Skeleton className="absolute h-[40dvh] w-[80vw]  overflow-hidden rounded-lg border border-neutral-700 shadow-lg md:w-[400px]" />
  ),
});

interface UserSelectionProps {
  handleUserSelection: (email: Account["email"]) => void;
  selectedUsers: Account[];
}

const InputWithUserSelection = ({ handleUserSelection, selectedUsers }: UserSelectionProps) => {
  const containerElementRef = useRef(null);
  const inputElementRef = useRef<HTMLInputElement>(null);

  const [isInputFocused, setInputFocus] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(INITIAL_INDEX);
  const [availableUserAccounts, setAvailableUserAccounts] = useState<Account[]>(accounts);

  const handleOutsideClick = useCallback(() => setInputFocus(false), []);
  const handleInsideClick = useCallback(() => setInputFocus(true), []);

  useOnClickOutside(containerElementRef, handleOutsideClick);

  const resetAfterSelection = useCallback(() => {
    if (inputElementRef.current?.value) inputElementRef.current.value = "";
    setCurrentIndex(INITIAL_INDEX);
    inputElementRef.current?.focus();
    setInputValue("");
  }, []);

  const selectUser = useCallback(
    (index?: number) => {
      if (index === undefined && currentIndex === INITIAL_INDEX) return;
      const selectedIndex = index !== undefined ? index : currentIndex;
      handleUserSelection(availableUserAccounts[selectedIndex]?.email);
      setCurrentIndex((prevIndex) => {
        if (prevIndex - 1 < 0) return availableUserAccounts.length - 1;
        if (prevIndex + 1 >= availableUserAccounts.length) return 0;
        return prevIndex - 1;
      });
      setAvailableUserAccounts((prevAccounts) => {
        const updatedAccounts = [...prevAccounts];
        updatedAccounts.splice(index ?? currentIndex, 1);
        return updatedAccounts;
      });
      resetAfterSelection();
    },
    [availableUserAccounts, handleUserSelection, resetAfterSelection, currentIndex]
  );

  const handleDownKeyPress = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex + 1 >= availableUserAccounts.length) {
        inputElementRef.current?.focus();
        return INITIAL_INDEX;
      }
      return prevIndex + 1;
    });
  }, [availableUserAccounts.length]);

  const handleUpKeyPress = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex - 1 < INITIAL_INDEX) {
        return availableUserAccounts.length - 1;
      }
      inputElementRef.current?.focus();
      return prevIndex - 1;
    });
  }, [availableUserAccounts.length]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target?.value);
    },
    [setInputValue]
  );

  useKeyPress({
    targetKey: KEYBOARD_EVENTS.ARROW_DOWN,
    callback: handleDownKeyPress,
  });

  useKeyPress({
    targetKey: KEYBOARD_EVENTS.ARROW_UP,
    callback: handleUpKeyPress,
  });

  useKeyPress({
    targetKey: KEYBOARD_EVENTS.ENTER,
    callback: selectUser,
  });

  useEffect(() => {
    if (currentIndex !== INITIAL_INDEX) inputElementRef.current?.blur();
  }, [currentIndex]);

  useEffect(() => {
    setAvailableUserAccounts(() => {
      const filteredAccounts = accounts.filter((account) => {
        return !selectedUsers.find((selectedUser) => selectedUser.email === account.email);
      });
      const matchedAccounts = filteredAccounts.filter((account) =>
        new RegExp(sanitizeValue(inputValue), "i").test(account.username)
      );
      return matchedAccounts;
    });
  }, [inputValue, selectedUsers]);

  return (
    <li className="relative" ref={containerElementRef} onClick={handleInsideClick}>
      <Input
        placeholder="Add new user..."
        ref={inputElementRef}
        onChange={handleInputChange}
        aria-label="Add new user"
        className="w-full min-w-[300px] px-4"
      />
      {isInputFocused && (
        <UserList
          availableUserAccounts={availableUserAccounts}
          selectUser={selectUser}
          currentIndex={currentIndex}
        />
      )}
    </li>
  );
};

InputWithUserSelection.displayName = "Users";

export default memo(InputWithUserSelection);
