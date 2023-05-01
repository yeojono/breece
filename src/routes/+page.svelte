<script lang="ts">
	import { onMount } from 'svelte';
	import type { DemographicInfo, ResultStoreType } from '../store/result';
	import { generateId } from '../util/id';
	import type { Writable } from 'svelte/store';
	import DemographicForm from '../components/demographic-form.svelte';

	let ResultStoreModule: typeof import('../store/result');
	let ResultStore: Writable<ResultStoreType>;
	onMount(async () => {
		ResultStoreModule = await import('../store/result');
		ResultStore = ResultStoreModule.store;
	});

	let fields: DemographicInfo = {
		participantNumber: '0',
		age: '3',
		gender: 'male' as const,
		hasAsdDiagnosis: false
	};

	const beginChallenge = () => {
		const challengeId = generateId();
		window.location.href = `/puzzles/0?challengeId=${challengeId}`;
		ResultStoreModule.createResult(String(challengeId), fields);
	};
</script>

<DemographicForm bind:fields />
<button on:click={beginChallenge}>START</button>

<style>
	button {
		padding: 16px;

		background: #f6f5f8;
		border: 1px solid darkgray;
		border-radius: 4px;
	}
	button:before {
		content: '▶ ';
		color: #0c862f;
	}
</style>
