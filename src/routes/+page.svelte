<script lang="ts">
	import { onMount } from 'svelte';
	import type { DemographicInfo } from '../store/result';
	import { generateId } from '../util/id';
	import { puzzles } from '../data/puzzles';
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
		ResultStoreModule.createResult(String(challengeId), fields);
		const randomOrder = ResultStoreModule.getResult(challengeId).puzzleOrder;
		const slug = Object.keys(puzzles).indexOf(randomOrder[0]);
		window.location.href = `/puzzles/${slug}?challengeId=${challengeId}`;
	};

	const handleClearData = () => {
		if (
			confirm(
				'All previous results will be forgotten. This cannot be undone. Are you sure you wish to proceed?'
			)
		) {
			ResultStoreModule.clearResults();
		}
	};
</script>

<h1>🧩</h1>
<DemographicForm bind:fields />
<div class="buttons-container">
	<button class="start-btn big-btn" on:click={beginChallenge}>START</button>
	<button
		class="big-btn"
		on:click={() => {
			window.location.href = '/practice/0';
		}}
	>
		✍️ PRACTICE
	</button>
</div>

<div class="data-btns">
	<button on:click={ResultStoreModule.exportAllData}>⬇️ Download All Data</button>
	<button on:click={ResultStoreModule.exportToCsv}>💾 Export Results</button>
	<button on:click={handleClearData}>⚠️ Clear Data</button>
</div>

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

	div.data-btns {
		position: absolute;
		top: 4px;
		left: 4px;
		display: flex;
		gap: 4px;
	}
</style>
