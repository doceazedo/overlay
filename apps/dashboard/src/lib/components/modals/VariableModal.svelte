<script lang="ts">
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import type { VariableData, VariableValue } from 'db/models/variables';
	import Modal from './Modal.svelte';

	export let active = false;
	export let variable: VariableData | null = null;
	export let variables: VariableData[] = [];

	const hasDigitsOnly = (str: string) =>
		!!str.length && [...str].every((c) => '0123456789'.includes(c));

	const updateDefaultValues = () => {
		key = variable?.key || '';
		value = variable?.value != null ? `${variable.value}` : '';
		incrementCooldown = variable?.incrementCooldown || 0;
		restartOnStreamEnds = variable?.restartOnStreamEnds || false;
		updateIsNumber();
	};

	let isLoading = false;

	let key = '';
	let value: string = '';
	let incrementCooldown = 0;
	let restartOnStreamEnds = false;
	let isNumber = false;

	const updateIsNumber = () => (isNumber = hasDigitsOnly(value));
	$: value, updateIsNumber();

	$: variable, updateDefaultValues();

	const handleSubmit = async () => {
		isLoading = true;
		const data: Omit<VariableData, 'key'> = {
			value: hasDigitsOnly(value) ? Number.parseInt(value) : value,
			incrementCooldown,
			restartOnStreamEnds
		};
		try {
			const resp = await fetch(`/api/variables/${key}`, {
				method: 'POST',
				body: JSON.stringify(data)
			});
			if (!resp.ok) throw Error(); // TODO: error message
			// TODO: toast success

			const idx = variables.findIndex((x) => x.key == key);
			if (idx >= 0) {
				variables[idx] = {
					...variables[idx],
					...data
				};
			} else {
				variables.push({
					key,
					...data
				});
			}
			variables = variables;
			active = false;
		} catch (error) {
			// TODO: toast error
		}
		isLoading = false;
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<Modal title="{variable ? 'Edit' : 'New'} variable" bind:active>
		<div class="field is-horizontal">
			<div class="field-label">
				<label class="label" for="key">Key</label>
			</div>
			<div class="field-body">
				<div class="field">
					<div class="control">
						<input
							class="input"
							type="text"
							name="key"
							placeholder="foo"
							required
							bind:value={key}
						/>
					</div>
				</div>
			</div>
		</div>

		<div class="field is-horizontal">
			<div class="field-label">
				<label class="label" for="value">Value</label>
			</div>
			<div class="field-body">
				<div class="field">
					<div class="control">
						<input class="input" type="text" name="value" placeholder="bar" required bind:value />
					</div>
				</div>
			</div>
		</div>

		{#if isNumber}
			<div transition:slide={{ duration: 200, easing: quintOut }}>
				<div class="field is-horizontal">
					<div class="field-label" />
					<div class="field-body">
						<div class="field is-narrow">
							<div class="control">
								<label class="checkbox">
									<input type="checkbox" bind:checked={restartOnStreamEnds} />
									Restart after stream ends
								</label>
							</div>
						</div>
					</div>
				</div>

				<div class="field is-horizontal">
					<div class="field-label">
						<label class="label" for="cooldown">Increment cooldown</label>
					</div>
					<div class="field-body">
						<div class="field">
							<div class="control">
								<input
									class="input"
									type="number"
									name="cooldown"
									placeholder="60000"
									required
									bind:value={incrementCooldown}
								/>
							</div>
							<p class="help">
								The value will only be incremented again after the cooldown has passed.
							</p>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<svelte:fragment slot="footer">
			<button
				class="button is-success"
				type="submit"
				class:is-loading={isLoading}
				disabled={isLoading}>Save</button
			>
		</svelte:fragment>
	</Modal>
</form>
