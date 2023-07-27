import { TripNode } from "../../server/model/trips";

export interface MyTripsInterface {
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
}
