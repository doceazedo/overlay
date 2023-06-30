import { VM } from "vm2";
import { parseMessageTemplate } from "utils/parse-message-template";

const vm = new VM({
  timeout: 100,
  allowAsync: false,
  sandbox: {
    username: "DoceAzedo",
  },
});

const parsedMessage = parseMessageTemplate(
  "{{username}} a rolled a {{ Math.floor(Math.random() * 6) + 1 }} 🎲"
)
  .map((x) => {
    if (x.type == "text") return x.value;
    try {
      const output = vm.run(x.value);
      return output;
    } catch (error) {
      return `{{${x.value}}}`;
    }
  })
  .join("");

console.log(parsedMessage);
