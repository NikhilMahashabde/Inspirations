import Users from "../model/users";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Session } from "express-session";

interface CustomSession extends Session {
  email: string;
  name: string;
}

// interface loginRequest extends Request {
//   body: {
//     email: string;
//     password: string;
//   };
//   session: Session & {
//     email: string;
//     name: string;
//   };
// }

// interface LoginResponse extends Response {
//   message: string;
//   name: string;
//   // json: (data: {
//   //   message: string;
//   //   data?: string;
//   //   name?: string;
//   // }) => LoginResponse;
// }

const handleLogin = async (req: Request, res: Response) => {
  Object.entries(req.body).forEach(([key, value]) => {
    console.log(key, ":", value);
  });

  if (!(req.body.email && req.body.password))
    return res.status(400).json({ message: "invalid email or password input" });

  const foundUser = await Users.findOne({ email: req.body.email });

  if (!foundUser)
    return res.status(401).json({ message: "Email does not exist" });

  const isValidPassword = bcrypt.compareSync(
    req.body.password,
    foundUser.passwordHash
  );

  if (!isValidPassword)
    return res.status(401).json({ message: "Incorrect password" });

  (req.session as CustomSession).email = foundUser.email;
  (req.session as CustomSession).name = foundUser.name;

  res.json({ message: "logged in successfully", name: foundUser.name });
};

export default handleLogin;
