import type { Account } from "@/lib/constants";
import Image from "next/image";

interface UserAvatarProps {
  account: Pick<Account, "imageUrl" | "username">;
}

const UserAvatar = ({ account }: UserAvatarProps) => (
  <div className="flex flex-row items-center gap-4">
    <div className="aspect-square size-10 rounded-full border border-neutral-500 bg-neutral-700">
      <Image height={40} width={40} src={account.imageUrl} alt={`${account.username}'s profile picture`} />
    </div>
    <h5>{account.username}</h5>
  </div>
);

export default UserAvatar;
