<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { ShapeType } from '../model/shapes';
	import Sequence from './sequence.svelte';
	import Shape from './shapes/shape.svelte';
	import ConfidenceMetre from './confidence-metre.svelte';
	import type { ConfidenceRating, PuzzleResponse } from '../store/result';

	export let givenShapes: ShapeType[];

	let enteredShapes: ShapeType[] = [];
	let enteringConfidence: boolean = false;

	const confidenceRatings: ConfidenceRating[] = [];

	const shapeSet = Array.from(new Set(givenShapes));

	const insertShape = (shape: ShapeType) => {
		enteredShapes = [...enteredShapes, shape];
		enteringConfidence = true;
	};

	const handleSubmitConfidence = ({
		detail: { confidence }
	}: CustomEvent<{ confidence: ConfidenceRating }>) => {
		confidenceRatings.push(confidence);
		enteringConfidence = false;
	};

	const dispatch = createEventDispatcher<{ puzzleComplete: PuzzleResponse }>();

	$: if (enteredShapes.length >= 3 && !enteringConfidence) {
		dispatch('puzzleComplete', {
			shapes: enteredShapes,
			confidenceRatings
		});
	}
</script>

<div style="display: flex; flex-direction: column; align-items: center;">
	<Sequence
		shapes={[...givenShapes, ...enteredShapes]}
		givenShapesCount={givenShapes.length}
		expectedShapesCount={3}
	/>

	<h1>What comes next?</h1>

	<div style="display: flex; gap: 16px">
		{#if enteringConfidence}
			<ConfidenceMetre on:submitConfidence={handleSubmitConfidence} />
		{:else}
			{#each shapeSet as shapeOption}
				<button on:click={() => insertShape(shapeOption)}>
					<Shape key={shapeOption} size={32} />
				</button>
			{/each}
		{/if}
	</div>
</div>

<style>
	div {
		padding: 16px;
	}

	button {
		background: #f6f5f8;
		border: 1px solid darkgrey;
		border-radius: 4px;

		min-width: 40px;
		min-height: 40px;
		padding: 32px;

		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
