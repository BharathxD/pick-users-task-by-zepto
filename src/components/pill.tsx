import { cn } from "@/lib/utils";
import { memo } from "react";

interface PillProps extends React.HTMLAttributes<HTMLLIElement> {}

const Pill = ({ className, ...rest }: PillProps) => (
  <li
    className={cn(
      "flex w-40 list-none items-center justify-between rounded-md border border-neutral-700 bg-neutral-900 p-2",
      className
    )}
    {...rest}
  />
);

Pill.dispkayName = "Pill";

export default memo(Pill);
