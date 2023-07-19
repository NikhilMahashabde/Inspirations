import { Request, Response } from "express";
import Trips, { TripNode } from "../model/trips";

const handleAddTripNode = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(req.params, req.body);

  if (!req.body.addNodeType)
    return res.status(400).json({ error: " missing or incorrect nodetype " });

  try {
    const foundTrip = await Trips.findById(id);

    console.log(foundTrip);

    if (!foundTrip) {
      console.log("no trip found");
      return res.status(404).json({ error: "Trip not found" });
    }

    //if trip found, create a blank node the Node type with basic data.
    const newNode: TripNode = {
      nodeType: `${req.body.addNodeType}`,
      duration: 0,
      origin: "",
      destination: "",
      activities: "",
      description: "",
      startTime: new Date(),
      endTime: new Date(),
      notes: "",
      budget: 0,
      _id: undefined,
    };

    foundTrip.nodes.push(newNode);

    await foundTrip.save();

    return res.json({ message: "all good" });

    // return succesfull trip. update main trip component.
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

export { handleAddTripNode };
