import { Request, Response } from "express";
import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessageRoleEnum,
} from "openai";
import { prompt } from "../utils/prompt";

const llmController = async (req: Request, res: Response): Promise<void> => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const message = req.query.message;
  if (typeof message !== "string") {
    throw new Error("Query param 'message' has to be of type string");
  }

  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      prompt,
      { role: ChatCompletionRequestMessageRoleEnum.User, content: message },
    ],
  });
  res.send(chatCompletion.data.choices[0].message);
};

export default llmController;
