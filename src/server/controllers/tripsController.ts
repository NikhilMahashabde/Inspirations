import { Request, Response } from "express";

const createNewTrip = async (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ message: "success" });
};

export { createNewTrip };
