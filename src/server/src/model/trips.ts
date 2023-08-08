import mongoose, { Document, Schema } from "mongoose";

export interface TripNode {
  _id: string | null | undefined;
  nodeType: string;
  duration: number;
  origin: string;
  destination: string;
  activities: string;
  description: string;
  startTime: Date;
  endTime: Date;
  notes: string;
  budget: number;
}

export interface TripDocument extends Document {
  name: string;
  authorisation: string[];
  purpose: string;
  budget: number;
  startDate: Date;
  endDate: Date;
  images: string[];
  nodes: TripNode[];
  tags: string[];
  startLocation: string;
  endLocation: string;
  destinations: string[];
}

const nodeSchema = new Schema<TripNode>({
  nodeType: { type: String },
  duration: { type: Number },
  origin: { type: String },
  destination: { type: String },
  description: { type: String },
  activities: { type: String },
  startTime: { type: Date },
  endTime: { type: Date },
  notes: { type: String },
  budget: { type: Number },
});

const tripSchema = new Schema<TripDocument>({
  name: { type: String },
  authorisation: { type: [String] },

  purpose: { type: String },
  budget: { type: Number },
  startDate: { type: Date },
  endDate: { type: Date },
  nodes: { type: [nodeSchema] },
  startLocation: { type: String },
  endLocation: { type: String },
  images: { type: [String] },
  destinations: { type: [String] },
});

const TripModel = mongoose.model<TripDocument>("Trips", tripSchema);

export default TripModel;
