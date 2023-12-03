// LangChain APIs
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

// Environment variables
import { OPENAI_API_KEY } from "../.env";
// Documents
import { docContents, docIndex } from "../docs/docs";
import { GPT_MODEL } from "../params/models";
// Types
import type { DocRetrieverResponseType } from "../types/responseTypes";

const run = async (inputValue: string): Promise<DocRetrieverResponseType> => {
  const vectorStore = await MemoryVectorStore.fromTexts(
    docContents,
    docIndex,
    new OpenAIEmbeddings({
      openAIApiKey: OPENAI_API_KEY,
    })
  );

  const document = await vectorStore.similaritySearch(inputValue, 1);
  const documentID = document[0].metadata.id;
  const ducumentContent = document[0].pageContent;

  // create template
  const template = "You are a professional about Cal.com. Please read the following document: {document}";

  const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(template);

  const humanTemplate = "{question}";
  const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate(humanTemplate);

  const chatPrompt = ChatPromptTemplate.fromMessages([systemMessagePrompt, humanMessagePrompt]);

  const model = new ChatOpenAI({
    modelName: GPT_MODEL,
    openAIApiKey: OPENAI_API_KEY,
  });

  const chain = new LLMChain({
    llm: model,
    prompt: chatPrompt,
  });

  const result = await chain.call({
    document: ducumentContent,
    question: inputValue,
  });

  console.log(result.text);
  console.log(document);

  // const prompt = new PromptTemplate({
  //   inputVariables: ["document", "question"],
  //   template: template, // your template without external input
  // });

  // const res = await prompt.format({
  //   document: ducumentContent,
  //   question: inputValue,
  // });

  // // feed the chatbot
  // model.call();

  return {
    doc_external_link: documentID,
    text: result.text,
  };

  /*
    [
      Document {
        pageContent: "Hello world",
        metadata: { id: 2 }
      }
    ]
  */
};

export default run;
