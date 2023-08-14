import { Request, Response } from "express";
import Trips, { TripNode } from "../model/trips";
import { MyTripsInterface } from "../interfaces/interfaces.types";

const handleAddTripNode = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!req.body.newTripData.nodeType)
    return res.status(400).json({ error: " missing or incorrect nodetype " });

  try {
    const foundTrip = await Trips.findById(id);

    if (!foundTrip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    //if trip found, create a blank node the Node type with basic data.
    const newNode: TripNode = {
      nodeType: `${req.body.newTripData.nodeType}`,
      duration: req.body.newTripData.duration,
      origin: `${req.body.newTripData.origin}`,
      destination: `${req.body.newTripData.destination}`,
      activities: `${req.body.newTripData.activities}`,
      description: `${req.body.newTripData.description}`,
      startTime: new Date(req.body.newTripData.startTime),
      endTime: new Date(req.body.newTripData.endTime),
      notes: req.body.newTripData.notes,
      budget: req.body.newTripData.budget,
      _id: req.body.newTripData._id,
    };

    foundTrip.nodes.push(newNode);

    await foundTrip.save();

    return res.json({ updatedTrip: foundTrip });

    // return succesfull trip. update main trip component.
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

const handleDeleteTripNode = async (req: Request, res: Response) => {
  const id = req.params.id;
  const nodeIndex = req.body.index;

  if (!(id && String(nodeIndex))) {
    return res.status(400).json({
      message: "did not submit ID or correct node index, node not deleted",
    });
  }

  try {
    const Trip = await Trips.findOne({ _id: id });

    if (!Trip)
      return res
        .status(500)
        .json({ message: "Cannot find trip, did not delete", trip: Trip });

    if (nodeIndex < 0 || nodeIndex >= Trip.nodes.length)
      return res
        .status(400)
        .json({ message: "Invalid node index. Node not deleted." });

    Trip.nodes.splice(nodeIndex, 1);

    await Trip.save();

    return res
      .status(200)
      .json({ message: "Node deleted successfully.", updatedTrip: Trip });
  } catch (error) {
    console.error(error);
  }
};

const handleUpdateTripNode = async (req: Request, res: Response) => {
  const tripData: MyTripsInterface = req.body.data;

  if (!req.body.data)
    return res.status(400).json({
      message: "did not submit Trip ",
    });

  try {
    await Trips.findByIdAndUpdate(tripData._id, tripData);
    return res.json({ updatedTrip: tripData });
  } catch (error) {
    return console.log(error);
  }
};

export { handleAddTripNode, handleDeleteTripNode, handleUpdateTripNode };
