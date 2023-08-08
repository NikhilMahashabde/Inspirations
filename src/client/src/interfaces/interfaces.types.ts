import { TripNode } from "../../../server/src/model/trips";

export interface MyTripsInterface {
  // updateTripData: any;
  _id: string;
  name: string;
  authorisation: string[];
  startLocation: string;
  endLocation: string;
  purpose: string;
  budget: number;
  startDate: string;
  endDate: string;
  images: string[];
  nodes: TripNode[] | [];
  destinations: string[];
  participants: number;
}

export interface DeleteResponse {
  updatedTrip: MyTripsInterface;
}

export interface UpdateTripResponse {
  updatedTrip: MyTripsInterface;
}

export interface NodeFormValues {
  destination: string;
  nodeType: string;
  budget: number | null;
  description: string | null;
  activities: string | null;
  origin: string | null;
  notes: string | null;
}

export interface INewTripData {
  _id: string;
  nodeType: string;
  duration: number | null;
  origin: string | null;
  destination: string | null;
  activities: string | null;
  description: string | null;
  startTime: string | null;
  endTime: string | null;
  budget: number | null;
  notes: string | null;
}

export interface INewNodeAITripData {
  nodeType: string;
  nodeFrom: number | null;
  nodeTo: number | null;
  _id: string;
  destination: string | null;
  budget: number;
  options: string;
}
