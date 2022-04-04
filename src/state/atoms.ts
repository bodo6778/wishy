import { atom, selector } from "recoil";
import jwt from "jsonwebtoken";

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

// export const authSelector = selector({
//   key: "authState",
//   get: ({ get }) => {
//     const token = get(tokenState).localValue;

//     if (!token) return false;
//     const user = jwt.decode(token);
//     if (!user || user !== get(userState)) if (!token) return false;

//     return true;
//   },
//   set: ({ get, set }) => {
//     localStorage.removeItem("token");
//     set(userState, undefined);
//   },
// });
