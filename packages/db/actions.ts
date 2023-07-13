export type Action =
  | ActionSay
  | ActionReply
  | ActionScript
  | ActionTTS
  | ActionSetVariable;

export type ActionSay = {
  type: "say";
  message: string;
};

export type ActionReply = {
  type: "reply";
  message: string;
};

export type ActionScript = {
  type: "script";
};

export type ActionTTS = {
  type: "tts";
  provider: string;
  voiceID: string;
  message: string;
};

export type ActionSetVariable = {
  type: "set-variable";
  key: string;
  value: string;
  onlySetIfEmpty?: boolean;
};

// TODO: ActionPlaySound, ActionPlayAudio, ActionPlayVideo

export const ACTION_TYPES = ["say", "reply"];
