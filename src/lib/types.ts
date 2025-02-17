export interface Book {
  id: number;
  title: string;
  author: string;
}

export interface Journal {
  id: number;
  title: string;
  content: string;
  mood: number|undefined;
}

export type User = {
  id: number;
  email: string|undefined;
  password: string|undefined;
  avatar: string|undefined;
  provider: string|undefined;
  username: string|undefined;
  expiredAt: Date|undefined;
  createdAt: Date|undefined;
  lastActiveAt: Date|undefined;
}
