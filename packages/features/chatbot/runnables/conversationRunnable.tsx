// LangChain APIs
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ConversationSummaryMemory } from "langchain/memory";
import { PromptTemplate } from "langchain/prompts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

// Environment variables
import { OPENAI_API_KEY } from "../.env";
import { docContents, docIndex } from "../docs/docs";
// Parameters
import { GPT_MODEL } from "../params/models";
// Types
import type { ConversationResponseType } from "../types/responseTypes";

// Component 1: short-term memory
const memory = new ConversationSummaryMemory({
  memoryKey: "chat_history",
  llm: new ChatOpenAI({
    modelName: GPT_MODEL,
    openAIApiKey: OPENAI_API_KEY,
    temperature: 0,
  }),
});

// Component 2: chatbot
const model = new ChatOpenAI({
  modelName: GPT_MODEL,
  openAIApiKey: OPENAI_API_KEY,
  temperature: 0,
});

const run = async (inputValue: string): Promise<ConversationResponseType> => {
  const vectorStore = await MemoryVectorStore.fromTexts(
    docContents,
    docIndex,
    new OpenAIEmbeddings({
      openAIApiKey: OPENAI_API_KEY,
    })
  );

  const document = await vectorStore.similaritySearch(inputValue, 1);
  const documentContent = document[0].pageContent;
  await memory.saveContext(
    { input: `Please read the following article: ${documentContent}` },
    { output: "Yes thank you for the given input, I have read throught the article" }
  );
  // Component 3: prompt template
  const prompt =
    PromptTemplate.fromTemplate(`The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

    \n\nCurrent conversation:
    {chat_history}
    Human: {input}
    AI:`);

  // Component 4: model chain
  const chain = new LLMChain({ llm: model, prompt, memory });

  // TODO: this method only receives one argument, not two
  const result = await chain.call({
    input: inputValue,
  });
  return result;
};

export default run;
