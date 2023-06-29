import { error, json } from '@sveltejs/kit';
import { setVariable, type VariableData, deleteVariable } from 'db/models/variables';

export const POST = async ({ request, params }) => {
	const data = (await request.json()) as Omit<VariableData, 'key'>;
	const variable = await setVariable(params.key, data);
	return json({ variable });
};

export const DELETE = async ({ params }) => {
	const deletedVariable = await deleteVariable(params.key);
	if (!deletedVariable) throw error(404, 'Variable not found');
	return json({ variable: deletedVariable });
};
