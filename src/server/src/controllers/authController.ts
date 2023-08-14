import axios from "axios";
import Users from "../model/users";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Session } from "express-session";
import jwt from "jsonwebtoken";

interface CustomSession extends Session {
  email: string;
  name: string;
}

// interface loginRequest extends Request {
//   body: {
//     email: string;
//     password: string;
//   };
//   session: Session & {
//     email: string;
//     name: string;
//   };
// }

// interface LoginResponse extends Response {
//   message: string;
//   name: string;
//   // json: (data: {
//   //   message: string;
//   //   data?: string;
//   //   name?: string;
//   // }) => LoginResponse;
// }

const handleJWT = async (req: Request, res: Response) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    const accessToken = authorizationHeader.split(" ")[1];
    // console.log("accesstoken:", accessToken);

    try {
      const decodedToken = jwt.decode(accessToken);

      //const userInfoVerifyUrl= decodedToken.aud[1]
      const userInfoEndpoint =
        "https://dev-8v4vi8wg2ppia707.us.auth0.com/userinfo"; // Replace with your Auth0 domain's /userinfo endpoint

      const userResponse = await axios.get(userInfoEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      //reauth

      const email = userResponse.data.email;

      const foundUser = await Users.findOne({ email: email });

      if (foundUser && foundUser.passwordHash !== "OAUTH")
        return res.status(400).json({
          error: "Email is already regstered as a standard non-auth0 client",
        });

      if (!foundUser) {
        try {
          const newUser = {
            name: userResponse.data.name,
            email: userResponse.data.email,
            passwordHash: "OAUTH",
          };

          await Users.create(newUser);

          (req.session as CustomSession).email = newUser.email;
          (req.session as CustomSession).name = newUser.name;
          return res.json({
            message: "Success",
            name: newUser.name,
            isAuthenticated: true,
          });
        } catch (error) {
          return res
            .status(400)
            .json({ message: `Error creating user ${error}` });
        }
      }

      (req.session as CustomSession).email = foundUser.email;
      (req.session as CustomSession).name = foundUser.name;

      return res.json({
        message: "Success",
        name: foundUser.name,
        isAuthenticated: true,
      });
    } catch (error) {
      // console.log(error);
    }
    return res.json({ message: "came here" });
  }
};

const handleLogin = async (req: Request, res: Response) => {
  // Object.entries(req.body).forEach(([key, value]) => {
  //   console.log(key, ":", value);
  // });

  if (!(req.body.email && req.body.password))
    return res.status(400).json({ message: "invalid email or password input" });

  const foundUser = await Users.findOne({ email: req.body.email });

  if (!foundUser)
    return res.status(401).json({ message: "Email does not exist" });

  const isValidPassword = bcrypt.compareSync(
    req.body.password,
    foundUser.passwordHash
  );

  if (!isValidPassword)
    return res.status(401).json({ message: "Incorrect password" });

  (req.session as CustomSession).email = foundUser.email;
  (req.session as CustomSession).name = foundUser.name;

  res.json({ message: "logged in successfully", name: foundUser.name });
};
export { handleJWT, handleLogin };
