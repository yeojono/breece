<script>
	import ConfidenceMetre from '../../../components/confidence-metre.svelte';
	import PageContainer from '../../../components/page-container.svelte';
	import SequencePuzzle from '../../../components/sequence-puzzle.svelte';
	import { puzzles } from '../../../data/puzzles';
	export let data;

	const puzzleIdx = Number(data.slug);
	if (puzzles[puzzleIdx] === undefined) {
		throw Error('Puzzle not found');
	}

	const givenShapes = puzzles[puzzleIdx];

	const handlePuzzleComplete = () => {
		if (puzzleIdx < puzzles.length - 1) {
			window.location.href = `/puzzles/${puzzleIdx + 1}`;
		} else {
			window.location.href = `/puzzles/complete`;
		}
	};
</script>

<PageContainer>
	<SequencePuzzle {givenShapes} on:puzzleComplete={handlePuzzleComplete} />
	<ConfidenceMetre />
</PageContainer>
