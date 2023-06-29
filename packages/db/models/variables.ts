import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

export type VariableValue = string | number;

export type VariableData = {
  key: string;
  value: VariableValue;
  incrementCooldown?: number;
  restartOnStreamEnds?: boolean;
};

type Data = {
  variables: VariableData[];
};

const adapter = new JSONFile<Data>("../../data/variables.json");
export const variables = new Low<Data>(adapter, { variables: [] });

export const getVariable = async (key: string) => {
  await variables.read();
  const variable = variables.data.variables.find((x) => x.key == key);
  return variable?.value || null;
};

export const setVariable = async (key: string, value: VariableValue) => {
  await variables.read();

  const idx = variables.data.variables.findIndex((x) => x.key == key);
  if (idx >= 0) {
    variables.data.variables[idx].value = value;
  } else {
    variables.data.variables.push({
      key,
      value,
    });
  }

  return value;
};

export const incrementVariable = async (key: string) => {
  // TODO: cooldown
  const variable = await getVariable(key);
  if (isNaN(variable as any)) return variable;
  return setVariable(key, ++(variable as number));
};
