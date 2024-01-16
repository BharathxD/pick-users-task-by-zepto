import { Account } from "@/lib/constants";
import { memo } from "react";

interface PillProps extends React.HTMLAttributes<HTMLLIElement> {}

const Pill = ({ children, ...rest }: PillProps) => (
  <li
    className="list-none p-2 w-40 border rounded-md flex items-center justify-center"
    {...rest}
  >
    {children}
  </li>
);

Pill.dispkayName = "Pill";

export default memo(Pill);
