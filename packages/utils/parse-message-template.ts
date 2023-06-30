type ParsedMessage = { value: string; type: "text" | "script" }[];

export const parseMessageTemplate = (message: string) => {
  const result: ParsedMessage = [];
  let currentIndex = 0;

  while (currentIndex < message.length) {
    const openingIndex = message.indexOf("{{", currentIndex);

    if (openingIndex === -1) {
      const remainingText = message.slice(currentIndex);
      result.push({ value: remainingText, type: "text" });
      break;
    }

    const closingIndex = message.indexOf("}}", openingIndex + 2);

    if (closingIndex === -1) {
      const remainingText = message.slice(currentIndex);
      result.push({ value: remainingText, type: "text" });
      break;
    }

    const textBefore = message.slice(currentIndex, openingIndex);

    if (textBefore.length > 0) {
      result.push({ value: textBefore, type: "text" });
    }

    const variable = message.slice(openingIndex + 2, closingIndex);
    result.push({ value: variable, type: "script" });

    currentIndex = closingIndex + 2;
  }

  return result;
};
