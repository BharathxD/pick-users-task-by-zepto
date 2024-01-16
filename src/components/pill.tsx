import { memo } from "react";

interface PillProps extends React.HTMLAttributes<HTMLLIElement> {}

const Pill = ({ children, ...rest }: PillProps) => {
  return (
    <li className="flex w-40 list-none items-center justify-center rounded-md border p-2" {...rest}>
      {children}
    </li>
  );
};

Pill.dispkayName = "Pill";

export default memo(Pill);
