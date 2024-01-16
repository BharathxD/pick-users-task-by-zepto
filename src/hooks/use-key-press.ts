import { useEffect, useState } from "react";

interface UseKeyPressProps {
  targetKey: string;
  callback: () => void;
  eventType?: "keydown" | "keyup";
  target?: EventTarget | null;
}

function useKeyPress({ targetKey, callback, target, eventType = "keydown" }: UseKeyPressProps) {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const handleEvent = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        setIsPressed(eventType === "keydown");
        callback();
      }
    };
    window.addEventListener(eventType, handleEvent);
    return () => window.removeEventListener(eventType, handleEvent);
  }, [callback, eventType, target, targetKey]);

  return isPressed;
}

export default useKeyPress;
