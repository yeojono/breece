<script lang="ts">
	import type { Writable } from 'svelte/store';
	import SequencePuzzle from '../../../components/sequence-puzzle.svelte';
	import { puzzles } from '../../../data/puzzles';
	import type { PuzzleResponse } from '../../../store/result';
	import { onMount } from 'svelte';
	import { getQueryParam } from '../../../util/window';
	export let data;

	let ResultStoreModule: typeof import('../../../store/result');
	let challengeId: string;
	onMount(async () => {
		ResultStoreModule = await import('../../../store/result');

		challengeId = getQueryParam('challengeId');
	});
	
	// slug -> index in puzzle keys
	const puzzleIndex = Number(data.slug);
	const puzzleOrder = Object.keys(puzzles);
	const puzzleConfig = puzzles[puzzleOrder[puzzleIndex]];
	if (puzzleConfig === undefined) {
		throw Error('Puzzle not found');
	}

	const handlePuzzleComplete = (e: CustomEvent<PuzzleResponse>) => {
		ResultStoreModule.addPuzzleResponseToResult(challengeId, puzzleConfig.puzzleId, e.detail);

		// Find the next puzzle by converting from sorted order -> random order stored in results
		const randomOrder = ResultStoreModule.getResult(challengeId).puzzleOrder;
		const randomIndex = randomOrder.indexOf(puzzleConfig.puzzleId);
		if (randomIndex !== -1 && randomIndex < randomOrder.length - 1) {
			// The slug is the index in puzzle keys.
			const nextPuzzleId = randomOrder[randomIndex+1];
			const nextSlug = Object.keys(puzzles).indexOf(nextPuzzleId);
			window.location.href = `/puzzles/${nextSlug}?challengeId=${challengeId}`;
		} else {
			window.location.href = `/puzzles/complete?challengeId=${challengeId}`;
		}
	};
</script>

<SequencePuzzle {puzzleConfig} on:puzzleComplete={handlePuzzleComplete} />
