<script lang="ts">
	import type { Writable } from 'svelte/store';
	import SequencePuzzle from '../../../components/sequence-puzzle.svelte';
	import { puzzles } from '../../../data/puzzles';
	import type { PuzzleResponse, ResultStoreType } from '../../../store/result';
	import { onMount } from 'svelte';
	import { getQueryParam } from '../../../util/window';
	export let data;

	let ResultStoreModule: typeof import('../../../store/result');
	let ResultStore: Writable<ResultStoreType>;
	let challengeId: string;
	onMount(async () => {
		ResultStoreModule = await import('../../../store/result');
		ResultStore = ResultStoreModule.store;

		challengeId = getQueryParam('challengeId');
	});

	const puzzleIdx = Number(data.slug);
	if (puzzles[puzzleIdx] === undefined) {
		throw Error('Puzzle not found');
	}

	const puzzleConfig = puzzles[puzzleIdx];

	const handlePuzzleComplete = (e: CustomEvent<PuzzleResponse>) => {
		console.log(e.detail);
		ResultStoreModule.addPuzzleResponseToResult(challengeId, puzzleConfig.puzzleId, e.detail);
		if (puzzleIdx < puzzles.length - 1) {
			window.location.href = `/puzzles/${puzzleIdx + 1}?challengeId=${challengeId}`;
		} else {
			window.location.href = `/puzzles/complete?challengeId=${challengeId}`;
		}
	};
</script>

<SequencePuzzle {puzzleConfig} on:puzzleComplete={handlePuzzleComplete} />
