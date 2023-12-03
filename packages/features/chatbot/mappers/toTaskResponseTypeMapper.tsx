// Checkers
// Types
import type { ConversationResponseType, RouterResponseType, TaskResponseType } from "../types/responseTypes";
import { isNull, isNotNull } from "../utils/checkers";

const map = (
  routerResponse: RouterResponseType,
  conversationResponse: ConversationResponseType
  // docRetrieverResponse: DocRetrieverResponseType
): TaskResponseType => {
  // Step 1: parse the response and route results accordingly
  const url_param_enum = routerResponse.url_param_enum;
  const external_link_enum = routerResponse.external_link_enum;
  // const doc_external_link = docRetrieverResponse.doc_external_link;

  // Step 2: encapsulate the response
  const taskResponse = {
    url_param: url_param_enum,
    external_link: external_link_enum,
    // doc_external_link: doc_external_link,
    message: [] as string[],
  };
  // Case 1: url parser succeeded, append the url param message
  if (isNotNull(url_param_enum)) {
    taskResponse.message.push(routerResponse.url_param_msg);
  }
  // Case 2: external link parser succeeded, append the external link message
  if (isNotNull(external_link_enum)) {
    taskResponse.message.push(routerResponse.external_link_msg);
  }
  // Case 3: doc retriever succeeded, append the doc external link
  // if (isNotNull(docRetrieverResponse.text)) {
  // taskResponse.message.push(docRetrieverResponse.text);
  // }
  // Case 4: neither parser succeeded, append the conversation response
  if (isNull(url_param_enum) && isNull(external_link_enum)) {
    taskResponse.message.push(conversationResponse.text);
  }

  return taskResponse;
};

export default map;
