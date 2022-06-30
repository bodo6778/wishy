import { atom } from "recoil";
import { WishlistType } from "types/wish";

export type userProfileState = {
  username: string;
  email: string;
  name: string;
  description: string;
};

export const userState = atom<userProfileState>({
  key: "userAtom", // unique ID (with respect to other atoms/selectors)
  default: {
    username: "",
    email: "",
    name: "",
    description: "",
  }, // default value (aka initial value)
});

export const wishlistsState = atom({
  key: "wishlistsAtom",
  default: [] as WishlistType[],
});
