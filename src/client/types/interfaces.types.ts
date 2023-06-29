export interface MyTripsInterface {
  _id: string;
  name: string;
  authorisation: string[];
  purpose: string;
  budget: number;
  startDate: Date;
  endDate: Date;
  nodes: [];
}
