type Account = {
  username: string;
  email: string;
  imageUrl: string;
};

const accounts: Account[] = [
  {
    username: "Terry",
    imageUrl: "https://robohash.org/Terry.png?set=set4",
    email: "atuny0@sohu.com",
  },
  {
    username: "Sheldon",
    imageUrl: "https://robohash.org/Sheldon.png?set=set4",
    email: "hbingley1@plala.or.jp",
  },
  {
    username: "Terrill",
    imageUrl: "https://robohash.org/Terrill.png?set=set4",
    email: "rshawe2@51.la",
  },
  {
    username: "Miles",
    imageUrl: "https://robohash.org/Miles.png?set=set4",
    email: "yraigatt3@nature.com",
  },
  {
    username: "Mavis",
    imageUrl: "https://robohash.org/Mavis.png?set=set4",
    email: "kmeus4@upenn.edu",
  },
  {
    username: "Alison",
    imageUrl: "https://robohash.org/Alison.png?set=set4",
    email: "jtreleven5@nhs.uk",
  },
  {
    username: "Oleta",
    imageUrl: "https://robohash.org/Oleta.png?set=set4",
    email: "dpettegre6@columbia.edu",
  },
  {
    username: "Ewell",
    imageUrl: "https://robohash.org/Ewell.png?set=set4",
    email: "ggude7@chron.com",
  },
  {
    username: "Demetrius",
    imageUrl: "https://robohash.org/Demetrius.png?set=set4",
    email: "nloiterton8@aol.com",
  },
  {
    username: "Eleanora",
    imageUrl: "https://robohash.org/Eleanora.png?set=set4",
    email: "umcgourty9@jalbum.net",
  },
];

const INITIAL_INDEX = -1;

const KEYBOARD_EVENTS = {
  ARROW_DOWN: "ArrowDown",
  ARROW_UP: "ArrowUp",
  ENTER: "Enter",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  BACKSPACE: "Backspace",
};

export type { Account };
export { accounts, INITIAL_INDEX, KEYBOARD_EVENTS };
