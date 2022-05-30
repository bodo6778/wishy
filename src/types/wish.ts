export type Link = {
  link: string;
  price: number;
  pricy: number;
};

export type WishType = {
  title: string;
  description: string;
  price: number;
  need: number;
  links?: Link[];
};

export type WishlistType = {
  title: string;
  description: string;
  wishes: WishType[];
};

export type UserProfile = {
  name: string;
  username: string;
  wishlists: WishlistType[];
};
