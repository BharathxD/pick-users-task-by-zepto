import { cn } from "@/lib/utils";
import { forwardRef, memo } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn("size-full min-h-10 bg-transparent outline-none", className)}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default memo(Input);
