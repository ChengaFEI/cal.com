// Runnables
// Mappers
import toTaskResponseType from "./mappers/toTaskResponseTypeMapper";
import runConversation from "./runnables/conversationRunnable";
import runDocRetriever from "./runnables/docRetrieverRunnable";
import runRouter from "./runnables/routerRunnable";
// Types
import type { TaskResponseType } from "./types/responseTypes";

const runTask = async (inputValue: string): Promise<TaskResponseType> => {
  // Step 1: run all chatbots
  const [routerResponse, conversationResponse, docRetrieverResponse] = await Promise.all([
    // Runnable 1: parse the url params
    runRouter(inputValue),
    // Runnable 2: talk to the user
    runConversation(inputValue),
    // Runnable 3: doc retriever
    runDocRetriever(inputValue),
  ]);
  // Step 2: map the responses to a task response
  const taskResponse = toTaskResponseType(routerResponse, conversationResponse, docRetrieverResponse);
  console.log(taskResponse);
  return taskResponse;
};

export default runTask;
