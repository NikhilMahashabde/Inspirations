import { Request, Response } from "express";

const handleLogout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(400)
        .json({ error: `failed to destroy session ${err}` });
    }
    res.json({ message: "Successfully logged out", isLoggedOut: true });
  });
};

export default handleLogout;
