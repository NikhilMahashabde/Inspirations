import { Request, Response } from "express";
import Trips, { TripDocument } from "../model/trips";
import { Session } from "express-session";
import axios from "axios";

interface CustomSession extends Session {
  email?: string;
}

const createNewTrip = async (req: Request, res: Response) => {
  let searchQuery = "";
  if (req.body.destinations.length == 0) {
    searchQuery = "travel";
  } else {
    searchQuery = req.body.destinations.join(",");
  }

  const unsplashImageUrl = `https://api.unsplash.com/photos/random?query=${searchQuery}&client_id=Iy-9nBKpFYGdxpRDphCLXT_rdtdPdF1eGkPeTj7UEQA&orientation=landscape&count=1`;
  const tripImage = [];
  try {
    const response = await axios.get(unsplashImageUrl);
    tripImage.push(response.data[0].urls.regular);
  } catch (err) {
    console.log(err);
  }

  const newTrip: TripDocument = new Trips({
    name: req.body.name,
    images: tripImage,
    description: req.body.description,
    purpose: req.body.purpose,
    budget: req.body.budget,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    participants: req.body.participants,
    authorisation: [(req.session as CustomSession)?.email],
    endLocation: req.body.endLocation,
    startLocation: req.body.startLocation,
    destinations: req.body.destinations,
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

const getTripsByUserEmail = async (req: Request, res: Response) => {
  const userEmail = (req.session as CustomSession)?.email;
  if (!userEmail) return res.status(400).json({ message: "Unauthorised" });

  try {
    const retrievedTrips = await Trips.find({
      authorisation: { $in: [userEmail] },
    });

    res.json({ message: "success", tripList: retrievedTrips });
  } catch (error) {
    res.status(500).json({ message: `Error retrieving trip ${error}` });
  }
};

const handleDeleteTrip = async (req: Request, res: Response) => {
  const id = req.params.id;

  const userEmail = (req.session as CustomSession)?.email;
  if (!userEmail) return res.status(400).json({ message: "Unathorised" });

  try {
    await Trips.findByIdAndDelete(id);

    res.json({ message: "deleted trip success", deletedTrip: id });
  } catch (error) {
    res.status(500).json({ message: `Error Deleeting trip ${id} - ${error}` });
  }
};

export { createNewTrip, getTripById, getTripsByUserEmail, handleDeleteTrip };
