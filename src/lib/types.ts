export interface Book {
  id: number;
  title: string;
  author: string;
}

export interface Journal {
  id: number;
  title: string;
  content: string;
  image: string;
  mood: number|undefined;
}

export type User = {
  id: string;
  email: string|undefined;
  password: string|undefined;
  avatar: string|undefined;
  provider: string|undefined;
  username: string|undefined;
  expiredAt: Date|undefined;
  createdAt: Date|undefined;
  lastActiveAt: Date|undefined;
  points: number;
  affirmTrackId: number;
  productId: string;
  purchaseTime: Date;
  purchaseToken: string
}

export type Task = {
  id          : number;
  name        : String;
  description : String;
  isComplete  : Boolean;
  createdAt?   : Date| undefined;
  completedAt? : Date| undefined;
}
