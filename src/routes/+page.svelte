<script>
	import SequencePuzzle from '../components/sequence-puzzle.svelte';

	let rocketFuel = 0;
</script>

<div class="container">
	<SequencePuzzle
		givenShapes={['square', 'circle', 'circle','square', 'circle', 'circle']}
		correctSequence={['square', 'circle', 'circle']}
	/>
	<SequencePuzzle
		givenShapes={['star', 'triangle', 'star','star', 'triangle', 'triangle']}
		correctSequence={['square', 'square', 'square']}
	/>
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