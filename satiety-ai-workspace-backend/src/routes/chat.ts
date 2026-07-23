// import { Router } from "express";
// import { generateResponse } from "../services/gemini";

// const router = Router();

// router.post("/", async (req, res) => {
//   try {
//     const { messages } = req.body;

//     if (!messages || !Array.isArray(messages)) {
//       return res.status(400).json({
//         error: "Messages array is required.",
//       });
//     }

//     const reply = await generateResponse(messages);

//     return res.json({
//       reply,
//     });
// } catch (error: any) {
//   console.error("Chat Route Error:", error);

//   // Gemini overloaded
//   if (error?.status === 503) {
//     return res.status(503).json({
//       error:
//         "Satiety AI is currently experiencing high demand. Please try again in a few moments.",
//     });
//   }

//   // Invalid API key / authentication
//   if (error?.status === 401) {
//     return res.status(500).json({
//       error:
//         "AI service configuration error. Please contact the administrator.",
//     });
//   }

//   // Rate limit
//   if (error?.status === 429) {
//     return res.status(429).json({
//       error:
//         "Satiety AI rate limit reached. Please try again shortly.",
//     });
//   }

//   // Network failure
//   if (
//     error instanceof Error &&
//     error.message.includes("fetch")
//   ) {
//     return res.status(500).json({
//       error:
//         "Unable to connect to the AI service. Please check your internet connection and try again.",
//     });
//   }

//   // Unknown error
//   return res.status(500).json({
//     error:
//       "Something went wrong while generating the response. Please try again later.",
//   });
// }
// });

// export default router;


// ==============================above is logic wrt only frontend ,below is wrt to new backend===============================


import { Router } from "express";

import { chat } from "../controllers/chatControllers";

const router = Router();

router.post("/", chat);

export default router;