<script lang="ts">
	import type { Writable } from 'svelte/store';
	import SequencePuzzle from '../../../components/sequence-puzzle.svelte';
	import { practicePuzzles } from '../../../data/puzzles';
	import type { PuzzleResponse, ResultStoreType } from '../../../store/result';
	import { onMount } from 'svelte';
	import { getQueryParam } from '../../../util/window';
	export let data;

	let challengeId: string;
	onMount(async () => {
		challengeId = getQueryParam('challengeId');
	});

	// slug -> index in puzzle keys
	const puzzleIndex = Number(data.slug);
	const practiceOrder = Object.keys(practicePuzzles);
	const puzzleConfig = practicePuzzles[practiceOrder[puzzleIndex]];
	if (puzzleConfig === undefined) {
		throw Error('Puzzle not found');
	}

	const handlePuzzleComplete = (e: CustomEvent<PuzzleResponse>) => {
		if (puzzleIndex < Object.keys(practicePuzzles).length - 1) {
			window.location.href = `/practice/${puzzleIndex + 1}`;
		} else {
			window.location.href = `/`;
		}
	};
</script>

<SequencePuzzle {puzzleConfig} on:puzzleComplete={handlePuzzleComplete} />
