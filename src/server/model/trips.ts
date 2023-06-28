import mongoose, { Document, Schema } from "mongoose";

interface Node {
  nodeType: string;
  duration: number;
  origin: string;
  destination: string;
  activities: string;
  startDate: Date;
  endDate: Date;
  notes: string;
}

export interface TripDocument extends Document {
  name: string;
  authorisation: string[];
  purpose: string;
  budget: number;
  startDate: Date;
  endDate: Date;
  nodes: Node[];
}

const nodeSchema = new Schema<Node>({
  nodeType: { type: String },
  duration: { type: Number },
  origin: { type: String },
  destination: { type: String },
  activities: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  notes: { type: String },
});

const tripSchema = new Schema<TripDocument>({
  name: { type: String },
  authorisation: { type: [String] },
  purpose: { type: String },
  budget: { type: Number },
  startDate: { type: Date },
  endDate: { type: Date },
  nodes: { type: [nodeSchema] },
});

const TripModel = mongoose.model<TripDocument>("Trips", tripSchema);

export default TripModel;
