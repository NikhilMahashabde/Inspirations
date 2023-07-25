import { TripNode } from "../../server/model/trips";

export interface MyTripsInterface {
  _id: string;
  name: string;
  authorisation: string[];
  purpose: string;
  budget: number;
  startDate: string;
  endDate: string;
  nodes: TripNode[] | [];
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
