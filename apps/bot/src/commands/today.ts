import { createBotDynamicReply } from "../commands";

const today = createBotDynamicReply(
  [
    "today",
    "hoje",
    "topico",
    "topic",
    "projeto",
    "project",
    "assunto",
    "subject",
    "sobre",
    "about",
    "wtf",
  ],
  "currentProject"
);

export default today;
