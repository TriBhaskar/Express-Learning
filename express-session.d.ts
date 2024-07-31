import "express-session";

declare module "express-session" {
  interface SessionData {
    visited?: boolean;
    user: {
      id: number;
      name: string;
      marks: number;
      username: string;
      password: string;
    };
    cart: {
      id: number;
      name: string;
      price: number;
    }[];
  }
}
