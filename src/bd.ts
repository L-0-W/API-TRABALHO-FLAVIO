export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  published: boolean;
}

export let users = [
  {
    id: 10,
    name: "Flávio",
    email: "flavio@flavio.com",
    senha: "flavio",
    idade: 100,
    admin: false,
  },
  {
    id: 11,
    name: "Pero",
    email: "pero@pero.com",
    senha: "pero22",
    idade: 50,
    admin: false,
  },
  {
    id: 12,
    name: "Flávia",
    email: "flavia@flavia.com",
    senha: "flavia",
    idade: 22,
    admin: false,
  },
  {
    id: 13,
    name: "Flávia",
    email: "flavia@flavia.com",
    senha: "flavia",
    idade: 22,
    admin: false,
  },
  {
    id: 14,
    name: "Flávia",
    email: "flavia@flavia.com",
    senha: "flavia",
    idade: 22,
    admin: true,
  },
  {
    id: 15,
    name: "Flávia",
    email: "flavia@flavia.com",
    senha: "flavia",
    idade: 22,
    admin: false,
  },
];

export let posts: Post[] = [];
