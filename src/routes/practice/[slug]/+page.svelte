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

	const puzzleIdx = Number(data.slug);
	if (practicePuzzles[puzzleIdx] === undefined) {
		throw Error('Puzzle not found');
	}

	const puzzleConfig = practicePuzzles[puzzleIdx];

	const handlePuzzleComplete = (e: CustomEvent<PuzzleResponse>) => {
		if (puzzleIdx < practicePuzzles.length - 1) {
			window.location.href = `/practice/${puzzleIdx + 1}`;
		} else {
			window.location.href = `/`;
		}
	};
</script>

<SequencePuzzle {puzzleConfig} on:puzzleComplete={handlePuzzleComplete} />
