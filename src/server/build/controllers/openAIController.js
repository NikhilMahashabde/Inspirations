"use strict";
// import { Configuration, OpenAIApi } from "openai";
// import { Request, Response } from "express";
// import { isAxiosError } from "axios";
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// interface ErrorResponse {
//   error: {
//     message: string;
//   };
// }
// export default async function (req: Request, res: Response) {
//   if (!configuration.apiKey) {
//     res.status(500).json({
//       error: {
//         message: "OpenAI API key not configured",
//       },
//     });
//     return;
//   }
//   const userPrompt = req.body.userPrompt;
//   //   const animal = req.body.animal || "";
//   //   if (animal.trim().length === 0) {
//   //     res.status(400).json({
//   //       error: {
//   //         message: "Please enter a valid animal",
//   //       },
//   //     });
//   //     return;
//   //   }
//   try {
//     const completion = await openai.createCompletion({
//       model: "gpt-3.5-turbo",
//       prompt: generatePrompt(userPrompt),
//       temperature: 0.6,
//     });
//     res.status(200).json({ result: completion.data.choices[0].text });
//   } catch (error) {
//     if (isAxiosError(error)) {
//       console.error(`Error with OpenAI API request: ${error.message}`);
//     }
//     const errorResponse: ErrorResponse = {
//       error: {
//         message: "An error occurred during your request.",
//       },
//     };
//     res.status(500).json(errorResponse);
//   }
// }
// function generatePrompt(userPrompt: string) {
//   const capitalizedAnimal =
//     userPrompt[0].toUpperCase() + userPrompt.slice(1).toLowerCase();
//   return ``;
// }
