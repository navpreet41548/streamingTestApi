const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const axios = require("axios");
const fs = require("fs");
app.use(express.json());
app.use(cors());

const url =
  "https://api.elevenlabs.io/v1/text-to-speech/CYw3kZ02Hs0563khs1Fj/stream";

// const headers = {
//   Accept: "audio/mpeg",
//   "Content-Type": "application/json",
//   "xi-api-key": "2fa3058213be8b237bfc2baa596480c8",
// };

// const data = {
//   text: "My name is Nav I am from NavWebDev. I noticed that you don't have a website. I am offering to create a website for your business for completely free. I want to know if you are interested",
//   model_id: "eleven_monolingual_v1",
//   voice_settings: {
//     stability: 0.5,
//     similarity_boost: 0.5,
//   },
// };

// async function makeTextToSpeechRequest() {
//   try {
//     const response = await axios.post(url, data, {
//       headers: headers,
//       responseType: "stream", // Indicate that the response is a stream
//     });

//     const audioStream = response.data; // The audio stream

//     // Here, you can pipe the audio stream to a file or do further processing
//     const outputStream = fs.createWriteStream("output.mp3"); // Example: Saving to a file
//     audioStream.pipe(outputStream);

//     console.log("Text-to-speech request successful.");
//   } catch (error) {
//     console.error("Error making text-to-speech request:", error);
//   }
// }

app.get("/stream-audio", async (req, res) => {
  const url =
    "https://api.elevenlabs.io/v1/text-to-speech/CYw3kZ02Hs0563khs1Fj/stream";
  const headers = {
    Accept: "audio/mpeg",
    "Content-Type": "application/json",
    "xi-api-key": "6888ebdfc6db0aac05a0f383516db7d1",
  };

  const data = {
    text: "Now that you know how to get all the voices, let’s see how to create a new one. First, you need to get samples for the voice you want to add. Since no model training is involved, there is no need to provide long samples - if they have a combined length of ≈1 min this is enough. Their quality plays the biggest role. Once you have the samples ready, choose a name, labels describing the voice (accent, gender, tone etc.) and create it as described in Add Voice endpoint documentation. If you want to edit the samples, labels or the name of the voice, you can do this with the POST /v1/voices/{voice_id}/edit endpoint. Find more information, see here. Once you have your voice ready, get its ID from the voices endpoint, and you’re ready to query our TTS endpoint. First you need to decide whether you want to use the streaming response or not. In general, we recommend streaming unless your client doesn’t support it. Second, you need to choose your voice settings. We recommend using default voice settings before experimenting with the expressivity and similarity settings. In the third optional step you can specify the model to be used for speech generation. You can get a full list of available models by querying models endpoint. You can find the streaming endpoint documentation here and the regular endpoint documentation here.",
    model_id: "eleven_monolingual_v1",
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.5,
    },
  };

  try {
    const response = await axios.post(url, data, {
      headers: headers,
      responseType: "stream", // Indicate that the response is a stream
    });

    // Set the appropriate headers for the audio response
    res.setHeader("Content-Type", "audio/mpeg");

    // Pipe the audio stream to the response
    response.data.pipe(res);
  } catch (error) {
    console.error("Error making text-to-speech request:", error);
    res.status(500).send("Error making text-to-speech request");
  }
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
