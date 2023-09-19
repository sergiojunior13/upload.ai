import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";

import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";
import { createTranscriptionRoute } from "./routes/create-transcripion";
import { generateAICompletionRoute } from "./routes/generate-ai-completion";

import "dotenv/config";

const app = fastify();

const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;
const port = process.env.PORT || 3333

app.register(fastifyCors, { origin: "*" });

app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionRoute);
app.register(generateAICompletionRoute);

app.listen({ port, host }).then(() => {
  console.log(`HTTP Server Running in ${host}:${port}`);
});
