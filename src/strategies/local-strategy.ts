import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constants";

passport.use(
  new Strategy((username, password, done) => {
    try {
      const findUser = mockUsers.find((user) => user.username === username);
      if (!findUser) {
        throw new Error("User not found");
      }
    } catch (error) {
      return done(error);
    }
  })
);
