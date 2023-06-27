import { Request, Response } from "express";
import { Session } from "express-session";
import Users from "../model/users";

interface CustomSession extends Session {
  email: string;
}

const validateSession = async (req: Request, res: Response) => {
  if (!(req.session as CustomSession).email)
    return res.json({ isLoggedIn: false });

  const foundUser = await Users.findOne({
    email: (req.session as CustomSession).email,
  });

  if (!foundUser)
    return res.status(401).json({ message: "Email does not exist" });

  res.json({ isLoggedIn: true, name: foundUser.name });
};

export default validateSession;
