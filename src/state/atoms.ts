import { atom, selector } from "recoil";
import jwt from "jsonwebtoken";
import { WishlistType } from "types/wish";

type loginState = {
  localValue: string | null;
};

type userProfileState = {
  username: string | null;
  email: string | null;
  name: string | null;
};

export const userState = atom({
  key: "userAtom", // unique ID (with respect to other atoms/selectors)
  default: {
    username: null,
    email: null,
    name: null,
  }, // default value (aka initial value)
});

export const wishlistsState = atom({
  key: "wishlistsAtom",
  default: [] as WishlistType[],
});
