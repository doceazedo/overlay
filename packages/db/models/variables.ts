import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

export type VariableValue = string | number;

export type VariableData = {
  key: string;
  value: VariableValue;
  incrementCooldown?: number;
  lastIncremented?: string;
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
  return variable || null;
};

export const setVariable = async (
  key: string,
  data: Omit<VariableData, "key">
) => {
  await variables.read();

  const idx = variables.data.variables.findIndex((x) => x.key == key);
  if (idx >= 0) {
    variables.data.variables[idx] = {
      ...variables.data.variables[idx],
      ...data,
    };
  } else {
    variables.data.variables.push({
      key,
      ...data,
    });
  }

  await variables.write();

  return variables.data.variables[idx];
};

export const incrementVariable = async (key: string) => {
  const variable = await getVariable(key);
  if (!variable) return null;
  if (isNaN(variable.value as any)) return variable.value;

  const now = new Date();
  if (variable.incrementCooldown && variable.lastIncremented) {
    if (
      now.getTime() - new Date(variable.lastIncremented).getTime() <=
      variable.incrementCooldown
    )
      return variable.value;
  }

  const updatedVariable = await setVariable(key, {
    value: (variable.value as number) + 1,
    lastIncremented: now.toISOString(),
  });
  return updatedVariable.value;
};

export const deleteVariable = async (key: string) => {
  await variables.read();
  const idx = variables.data.variables.findIndex((x) => x.key == key);
  if (idx < 0) return null;
  const deletedVariable = variables.data.variables[idx];
  variables.data.variables.splice(idx, 1);
  await variables.write();
  return deletedVariable;
};
