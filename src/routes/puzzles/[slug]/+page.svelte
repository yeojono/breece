<script lang="ts">
	import type { Writable } from 'svelte/store';
	import PageContainer from '../../../components/page-container.svelte';
	import SequencePuzzle from '../../../components/sequence-puzzle.svelte';
	import { puzzles } from '../../../data/puzzles';
	import type { ResultStoreType } from '../../../store/result';
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

	const givenShapes = puzzles[puzzleIdx];

	const handlePuzzleComplete = () => {
		ResultStoreModule.addPuzzleResponseToResult(challengeId, String(puzzleIdx), {
			shapes: [],
			confidenceRatings: []
		});
		if (puzzleIdx < puzzles.length - 1) {
			window.location.href = `/puzzles/${puzzleIdx + 1}?challengeId=${challengeId}`;
		} else {
			window.location.href = `/puzzles/complete?challengeId=${challengeId}`;
		}
	};
</script>

<PageContainer>
	<SequencePuzzle {givenShapes} on:puzzleComplete={handlePuzzleComplete} />
</PageContainer>
