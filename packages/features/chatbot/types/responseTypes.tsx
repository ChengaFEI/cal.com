export type TaskResponseType = {
  url_param: string;
  external_link: string;
  // doc_external_link: string;
  message: string[];
};

export type RouterResponseType = {
  url_param_enum: string;
  url_param_msg: string;
  external_link_enum: string;
  external_link_msg: string;
};

export type DocRetrieverResponseType = {
  doc_external_link: string;
  text: string;
};

export type ConversationResponseType = {
  text: string;
};
