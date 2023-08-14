import { Request, Response } from "express";
import Trips, { TripDocument, TripNode } from "../model/trips";
import { INewNodeAITripData } from "../interfaces/interfaces.types";
import { createChat } from "completions";
// @ts-nocheck

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// interface ErrorResponse {
//   error: {
//     message: string;
//   };
// }

const handleAddTripNodeAI = async (req: Request, res: Response) => {
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: {
        message: "OpenAI API key not configured",
      },
    });
  }

  const chat = createChat({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-3.5-turbo",
  });

  const id = req.params.id;

  if (!req.body.newNodeAIPromptData.nodeType)
    return res.status(400).json({ error: " missing or incorrect nodetype " });

  try {
    const foundTrip = await Trips.findById(id);

    if (!foundTrip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    const userPrompt = req.body.newNodeAIPromptData;
    console.log(generatePrompt(userPrompt, foundTrip));

    try {
      const resp = await chat.sendMessage(
        generatePrompt(userPrompt, foundTrip)
      );

      const aiData = JSON.parse(resp.content);

      // @ts-ignore
      let newNode: TripNode = {};

      switch (req.body.newNodeAIPromptData.nodeType.toLowerCase()) {
        case "accommodation":
          newNode = {
            nodeType: `${req.body.newNodeAIPromptData.nodeType}`,
            duration: 0,
            origin: `${req.body.newNodeAIPromptData.origin}` || "",
            destination: `Accommodation at ${req.body.newNodeAIPromptData.destination}: ${aiData.accommodation}`,
            activities: `${req.body.newNodeAIPromptData.activities}` || "",
            description: `${aiData.description}` || "",
            startTime: new Date(aiData.startTime) || new Date(),
            endTime: new Date(aiData.endTime) || new Date(),
            notes: `Other options: ${aiData.notes}` || "",
            budget: aiData.budget,
            _id: req.body.newNodeAIPromptData._id,
          };

          break;
        case "travel":
          newNode = {
            nodeType: `${req.body.newNodeAIPromptData.nodeType}`,
            duration: 0,
            origin: `${req.body.newNodeAIPromptData.origin}` || "",
            destination: `Travel to ${req.body.newNodeAIPromptData.destination}: ${aiData.mode}`,
            activities: `${req.body.newNodeAIPromptData.activities}` || "",
            description: `${aiData.description}` || "",
            startTime: new Date(aiData.startTime) || new Date(),
            endTime: new Date(aiData.endTime) || new Date(),
            notes: `Other options: ${aiData.notes}` || "",
            budget: aiData.budget,
            _id: req.body.newNodeAIPromptData._id,
          };
          break;

        case "activity":
          newNode = {
            nodeType: `${req.body.newNodeAIPromptData.nodeType}`,
            duration: 0,
            origin: `${req.body.newNodeAIPromptData.origin}` || "",
            destination: ` Activity at ${req.body.newNodeAIPromptData.destination}: ${aiData.activity}`,
            activities: `${aiData.activity}` || "",
            description: `${aiData.description}` || "",
            startTime: new Date(aiData.startTime) || new Date(),
            endTime: new Date(aiData.endTime) || new Date(),
            notes: `Other options: ${aiData.notes}` || "",
            budget: aiData.budget,
            _id: req.body.newNodeAIPromptData._id,
          };
          break;

        case "sightseeing":
          newNode = {
            nodeType: `${req.body.newNodeAIPromptData.nodeType}`,
            duration: 0,
            origin: `${req.body.newNodeAIPromptData.origin}` || "",
            destination: `Sightseeing at ${req.body.newNodeAIPromptData.destination}: ${aiData.sightseeing}`,
            activities: `${aiData.sightseeing}` || "",
            description: `${aiData.description}` || "",
            startTime: new Date(aiData.startTime) || new Date(),
            endTime: new Date(aiData.endTime) || new Date(),
            notes: `Other options: ${aiData.notes}` || "",
            budget: aiData.budget,
            _id: req.body.newNodeAIPromptData._id,
          };
          break;
        case "meal":
          newNode = {
            nodeType: `${req.body.newNodeAIPromptData.nodeType}`,
            duration: 0,
            origin: `${req.body.newNodeAIPromptData.origin}` || "",
            destination: `Meal at ${req.body.newNodeAIPromptData.destination}: ${aiData.meal}`,
            activities: `${aiData.meal}` || "",
            description: `${aiData.description}` || "",
            startTime: new Date(aiData.startTime) || new Date(),
            endTime: new Date(aiData.endTime) || new Date(),
            notes: `Other options: ${aiData.notes}` || "",
            budget: aiData.budget,
            _id: req.body.newNodeAIPromptData._id,
          };
          break;
        default:
          return res.json({ updatedTrip: foundTrip });
      }

      console.log(newNode);

      foundTrip.nodes.splice(userPrompt.nodeTo, 0, newNode);

      await foundTrip.save();

      return res.json({ updatedTrip: foundTrip });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }

    // return succesfull trip. update main trip component.
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

export { handleAddTripNodeAI };

function generatePrompt(
  userPrompt: INewNodeAITripData,
  foundTrip: TripDocument
) {
  let AIPrompt = "";
  const nodeType = userPrompt.nodeType.toLowerCase();
  switch (nodeType) {
    case "accommodation":
      AIPrompt = `Visiting ${userPrompt.destination}. Provide suggestion for each key value below, return response in json string format
      {
        accommodation: name of accomodation,
        description: short description of accomodation and address,
        budget: estimated cost to stay 1, only digits,
        startTime: estimtated check in time ISO string,, 
        endTime: estimated check out time in ISO string,
        notes: provide two more options for accommodation names nearby as a string
      }`;
      break;
    case "travel":
      // eslint-disable-next-line no-case-declarations
      let origin,
        destination = "";
      if (Number(userPrompt.nodeFrom) == -1) {
        origin = foundTrip.startLocation;
      } else {
        if (userPrompt.nodeFrom !== null) {
          origin = foundTrip.nodes[userPrompt.nodeFrom].destination;
        }
      }
      if (userPrompt.nodeTo === foundTrip.nodes.length) {
        destination = foundTrip.endLocation;
      } else {
        if (userPrompt.nodeTo !== null) {
          destination = foundTrip.nodes[userPrompt.nodeTo].destination;
        }
      }
      AIPrompt =
        AIPrompt = `Travelling from ${origin} to ${destination} . Provide suggestion for each key value below, return response in json string format
      {
        mode: method of travel e.g. drive, public transport etc.,
        description: short description of journey,
        budget: estimated cost as a number without $ in string format,
        startTime: estimtated start time ISO string,
        endTime: estimated arrival time in ISO string,
        notes: provide two more alternative modes of travel for this journey
      }`;

      break;

    case "activity":
      AIPrompt = `Visiting ${userPrompt.destination}. Provide suggestion for each key value below, return response in json string format
      {
        activity: name of activity,
        description: short description of activity and address,
        budget: estimated cost per person as a number without $ in string format,
        startTime: estimtated start time of activity time ISO string,, 
        endTime: estimtated end time of activity in ISO string,
        notes: provide two more options for activities in the area nearby as a string
      }`;
      break;

    case "sightseeing":
      AIPrompt = `Visiting ${userPrompt.destination}. Provide suggestion for each key value below, return response in json string format
      {
        sightseeing: name of sightseeing activity,
        description: short description of activity and address,
        budget: estimated cost per person as a number without $ in string format,
        startTime: estimtated start time of activity time ISO string,, 
        endTime: estimtated end time of activity in ISO string,
        notes: provide two more options for sightseeing in the area nearby as a string
      }`;
      break;

    case "meal":
      AIPrompt = `Visiting ${userPrompt.destination}. Provide suggestion for each key value below, return response in json string format
      {
        meal: name of a place to eat a meal,
        description: short description of meal establishment and address,
        budget: estimated cost per person as a number without $ in string format,
        startTime: estimtated start time of activity time ISO string,, 
        endTime: estimtated end time of activity in ISO string,
        notes: provide two more options for eating meals in the area nearby as a string
      }`;
      break;

    default:
      AIPrompt = `Unknown nodeType: ${nodeType}`;
      break;
  }
  return AIPrompt;
}
