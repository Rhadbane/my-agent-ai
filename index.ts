//import { generateText } from "ai";
// Import the google module from the ai-sdk package
//import { google } from "@ai-sdk/google";   

// Specify the model to use for generating text and a prompt
//const { text } = await generateText({
  //model: google("models/gemini-2.5-flash"),   
  //prompt: "What is an AI agent?", 
//});

//console.log(text);
import { stepCountIs, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { SYSTEM_PROMPT } from "./prompts";
import { getFileChangesInDirectoryTool } from "./tools";

const codeReviewAgent = async (prompt: string) => {
  const result = streamText({
    model: google("models/gemini-2.5-flash"),
    prompt,
    system: SYSTEM_PROMPT,
    tools: {
      getFileChangesInDirectoryTool: getFileChangesInDirectoryTool,
    },
    stopWhen: stepCountIs(10),
  });

  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }
};
await codeReviewAgent(
  "Review the code changes in '../my-agent' directory, make your reviews and suggestions file by file",
);