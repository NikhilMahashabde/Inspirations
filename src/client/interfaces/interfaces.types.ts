import { TripNode } from "../../server/model/trips";

export interface MyTripsInterface {
  _id: string;
  name: string;
  authorisation: string[];
  purpose: string;
  budget: number;
  startDate: string;
  endDate: string;
  nodes: TripNode[];
}

export interface TripData extends MyTripsInterface {
  _id: string;
}

export interface DeleteResponse {
  updatedTrip: TripData;
}

export interface UpdateTripResponse {
  updatedTrip: TripData;
}
