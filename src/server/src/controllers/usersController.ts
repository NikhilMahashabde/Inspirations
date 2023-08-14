import Users from "../model/users";
import bcrypt from "bcrypt";
import { Session } from "express-session";
import { Request, Response } from "express";

interface CustomSession extends Session {
  email: string;
  name: string;
}

const createNewUser = async (req: Request, res: Response) => {
  if (
    !(
      req.body.name &&
      req.body.email &&
      req.body.password &&
      req.body.verifyPassword
    )
  )
    return res.status(400).json({ error: "Data missing from form" });

  if (req.body.password !== req.body.verifyPassword)
    return res.status(400).json({ error: "Passwords do not match" });

  try {
    const result = await Users.findOne({ email: req.body.email });
    if (result) return res.status(400).json({ error: "Email already exists" });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }

  const newUser = {
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync()),
  };

  try {
    await Users.create(newUser);
    res.json({ message: "Success", name: newUser.name });
    (req.session as CustomSession).email = newUser.email;
    (req.session as CustomSession).name = newUser.name;
  } catch (error) {
    res.status(400).json({ message: `Error creating user ${error}` });
  }
};

export { createNewUser };
