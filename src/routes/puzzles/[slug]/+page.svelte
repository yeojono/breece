<script>
	import SequencePuzzle from '../../../components/sequence-puzzle.svelte';
	import { puzzles } from '../../../data/puzzles';
	export let data;

	const puzzleIdx = Number(data.slug);
	if (puzzles[puzzleIdx] === undefined) {
		throw Error('Puzzle not found')
	}

	const givenShapes = puzzles[puzzleIdx];
</script>

<div class="container">
	<SequencePuzzle	{givenShapes} />
</div>

<style>
  .container {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 32px;
  }
</style>