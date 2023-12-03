// LangChain APIs
import { ChatOpenAI } from "langchain/chat_models/openai";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import { FaissStore } from "langchain/vectorstores/faiss";

// Environment variables
import { OPENAI_API_KEY } from "../.env";
// Parameters
import { EXTERNAL_LINK_ENUMS, EXTERNAL_LINK_MSGS, URL_PARAM_ENUMS, URL_PARAM_MSGS } from "../params/enums";
import { GPT_MODEL } from "../params/models";
// Types
import type { DocRetrieverResponseType } from "../types/responseTypes";

// Instantiate the parser
const parser = new JsonOutputFunctionsParser();

// Define the function schema
const extractionFunctionSchema = {
  name: "extractor",
  description: "Extracts fields from the input.",
  parameters: {
    type: "object",
    properties: {
      url_param_enum: {
        type: "string",
        enum: URL_PARAM_ENUMS,
        description: "The URL parameter to extract.",
      },
      url_param_msg: {
        type: "string",
        enum: URL_PARAM_MSGS,
        description: "The message about rerouting to the webpage which is sent to the user.",
      },
      external_link_enum: {
        type: "string",
        enum: EXTERNAL_LINK_ENUMS,
        description: "The external link to extract.",
      },
      external_link_msg: {
        type: "string",
        enum: EXTERNAL_LINK_MSGS,
        description: "The message about rerouting to the external link which is sent to the user.",
      },
    },
    required: ["url_param_enum", "url_param_msg", "external_link_enum", "external_link_msg"],
  },
};

// Instantiate the ChatOpenAI class
const model = new ChatOpenAI({
  modelName: GPT_MODEL,
  openAIApiKey: OPENAI_API_KEY,
});

// Create a new runnable, bind the function to the model, and pipe the output through the parser
const runnable = model
  .bind({
    functions: [extractionFunctionSchema],
    function_call: { name: "extractor" },
  })
  .pipe(parser);

const run = async (inputValue: string): Promise<DocRetrieverResponseType> => {
  const loader = new DirectoryLoader("../", { ".txt": (path) => new TextLoader(path) });
  const docs = await loader.load();

  // Load the docs into the vector store
  const vectorStore = await FaissStore.fromDocuments(docs, new OpenAIEmbeddings());

  // Run the runnable
  // const result = await runnable.invoke([new HumanMessage(inputValue)]);

  // Query similar documents using FaissStore
  // const query = "hello world"; // Modify the query based on your requirements
  const topKResults = 1; // Adjust the number of top results as needed
  const similarityResults = await vectorStore.similaritySearch(inputValue, topKResults);

  // Extract the first (and only) result from the array
  const similarityResult = similarityResults[0];

  // Convert the single result to a JSON string
  return {
    text: JSON.stringify(similarityResult),
  };
  /**
   {
   result: {
   url_param: "/apps",
   external_link: "https://cal.com/download",
   message: "Going to /apps"
   }
   }
   */
};

export default run;
