import { Request, Response } from "express";
import Trips, { TripDocument } from "../model/trips";
import { Session } from "express-session";

interface CustomSession extends Session {
  email?: string;
}

const createNewTrip = async (req: Request, res: Response) => {
  const newTrip: TripDocument = new Trips({
    name: req.body.name,
    description: req.body.description,
    purpose: req.body.purpose,
    budget: req.body.budget,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    participants: req.body.participants,
    authorisation: [(req.session as CustomSession)?.email],
  });

  try {
    const savedTrip = await newTrip.save();
    res.json({ message: "success", _id: savedTrip._id });
  } catch (error) {
    res.status(500).json({ message: `Error creating trip ${error}` });
  }
};

const getTripById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const retrievedTrip = await Trips.findById(id);

    res.json({ message: "success", trip: retrievedTrip });
  } catch (error) {
    res.status(500).json({ message: `Error retrieving trip ${error}` });
  }
};

const getTripByUserEmail = async (req: Request, res: Response) => {
  const userEmail = (req.session as CustomSession)?.email;
  if (!userEmail) return res.status(400).json({ message: "Unathorised" });
  console.log(userEmail);

  try {
    const retrievedTrips = await Trips.find({
      authorisation: { $in: [userEmail] },
    });
    console.log(retrievedTrips);

    res.json({ message: "success", tripList: retrievedTrips });
  } catch (error) {
    res.status(500).json({ message: `Error retrieving trip ${error}` });
  }
};

export { createNewTrip, getTripById, getTripByUserEmail };
