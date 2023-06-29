import { variables } from 'db/models/variables';

export const load = async () => {
	await variables.read();
	return {
		variables: variables.data.variables
	};
};
