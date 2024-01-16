type Account = {
  username: string;
  email: string;
  imageUrl: string;
};

const accounts: Account[] = [
  {
    username: "Terrill",
    email: "Terrill@example.com",
    imageUrl: "https://robohash.org/Terrill.png?set=set4",
  },
  {
    username: "Terry",
    email: "Terry@example.com",
    imageUrl: "https://robohash.org/Terry.png?set=set4",
  },
  {
    username: "Sheldon",
    email: "Sheldon@example.com",
    imageUrl: "https://robohash.org/Sheldon.png?set=set4",
  },
];

export type { Account };
export { accounts };
