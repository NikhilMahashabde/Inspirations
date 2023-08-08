import expressSession from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

dotenv.config();

const databaseURI = process.env.MONGO_URI;
const SESSION_KEY = process.env.SESSION_KEY;
if (!SESSION_KEY)
  throw new Error("SESSION_KEY not found in environment variables.");

const store = new MongoStore({
  mongoUrl: databaseURI,
  collectionName: "sessions",
});

const enableSession = expressSession({
  store: store,
  secret: SESSION_KEY,
  resave: false, // Set resave option explicitly to false
  saveUninitialized: false,
  cookie: {
    path: "/",
    secure: false, // Set to true if using HTTPS
    httpOnly: false, // Cookie is inaccessible to client-side scripts
    maxAge: 86400000, // Cookie expiration time in milliseconds (e.g., 1 day)
  },
});

export default enableSession;
