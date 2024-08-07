import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constants";

passport.serializeUser((user: any, done) => {
  console.log("Serializing user");
  console.log(user);
  done(null, user.username);
});

passport.deserializeUser((username: string, done) => {
  console.log("Deserializing user");
  console.log(`id: ${username}`);
  try {
    const findUser = mockUsers.find((user) => user.username === username);
    if (!findUser) return done(new Error("User not found"));
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy((username, password, done) => {
    console.log(`Username: ${username}, Password: ${password}`);

    try {
      const findUser = mockUsers.find((user) => user.username === username);
      if (!findUser) {
        throw new Error("User not found");
      }
      if (findUser.password !== password) {
        throw new Error("Invalid password");
      }
      done(null, findUser);
    } catch (error) {
      done(error, false);
    }
  })
);
