<script lang="ts">
	import { onMount } from 'svelte';
	import type { DemographicInfo } from '../store/result';
	import { generateId } from '../util/id';
	import DemographicForm from '../components/demographic-form.svelte';

	let ResultStoreModule: typeof import('../store/result');
	onMount(async () => {
		ResultStoreModule = await import('../store/result');
	});

	let fields: DemographicInfo = {
		participantNumber: '0',
		age: '3',
		gender: 'female' as const,
		hasAsdDiagnosis: false
	};

	const beginChallenge = () => {
		const challengeId = generateId();
		window.location.href = `/puzzles/0?challengeId=${challengeId}`;
		ResultStoreModule.createResult(String(challengeId), fields);
	};
</script>

<h1>🧩</h1>
<DemographicForm bind:fields />
<div class="buttons-container">
	<button class="start-btn big-btn" on:click={beginChallenge}>START</button>
	<button
		class="practice-btn big-btn"
		on:click={() => {
			window.location.href = '/practice/0';
		}}>PRACTICE</button
	>
</div>

<button class="export-btn" on:click={ResultStoreModule.exportToCsv}>Export results</button>

<style>
	h1 {
		margin-top: 0;
	}
	.buttons-container {
		display: flex;
		gap: 8px;
	}
	button.big-btn {
		padding: 16px;

		background: #f6f5f8;
		border: 1px solid darkgray;
		border-radius: 4px;
	}
	button.start-btn:before {
		content: '▶ ';
		color: #0c862f;
	}
	button.practice-btn:before {
		content: '✍️ ';
	}

	.export-btn {
		position: absolute;
		top: 4px;
		left: 4px;
	}
	button.export-btn:before {
		content: '💾 ';
	}
</style>
