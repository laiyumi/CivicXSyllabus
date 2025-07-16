import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4-turbo"),
    system:
      "You are an expert educational consultant specializing in creating effective learning modules in civic innovation domains. Help users design structured learning experiences with clear objectives, engaging content, and appropriate assessments. Be supportive, ask clarifying questions, and provide specific guidance based on educational best practices.",
    messages,
  });

  return result.toDataStreamResponse();
}
