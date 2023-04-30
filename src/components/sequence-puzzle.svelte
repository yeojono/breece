<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { SequenceCharacter, ShapeType } from '../model/shapes';
	import Sequence from './sequence.svelte';
	import Shape from './shapes/shape.svelte';
	import ConfidenceMetre from './confidence-metre.svelte';
	import type { ConfidenceRating, PuzzleResponse } from '../store/result';
	import {
		shapesFromCharacterSequence,
		type PuzzleConfig,
		sequenceCharacterFromShapeType
	} from '../data/puzzles';

	export let puzzleConfig: PuzzleConfig;
	let givenShapes: ShapeType[] = shapesFromCharacterSequence(puzzleConfig.sequence, puzzleConfig.a, puzzleConfig.b);
	
	let enteredSequence: SequenceCharacter[] = [];
	let enteredShapes: ShapeType[] = [];
	let enteringConfidence: boolean = false;

	$: enteredShapes = shapesFromCharacterSequence(
		enteredSequence.join(''),
		puzzleConfig.a,
		puzzleConfig.b
	);

	const confidenceRatings: ConfidenceRating[] = [];

	const shapeSet = [puzzleConfig.a, puzzleConfig.b];

	const appendSequence = (shape: ShapeType) => {
		const char = sequenceCharacterFromShapeType(puzzleConfig, shape);
		enteredSequence = [...enteredSequence, char];
		enteringConfidence = true;
	};

	const handleSubmitConfidence = ({
		detail: { confidence }
	}: CustomEvent<{ confidence: ConfidenceRating }>) => {
		confidenceRatings.push(confidence);
		enteringConfidence = false;
	};

	const dispatch = createEventDispatcher<{ puzzleComplete: PuzzleResponse }>();

	$: if (enteredSequence.length === 3 && !enteringConfidence) {
		dispatch('puzzleComplete', {
			sequence: enteredSequence,
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
				<button class="shape-button" on:click={() => appendSequence(shapeOption)}>
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

		cursor: pointer;
	}

	button:hover {
		background: #efecf1;
	}

	button:active {
		background: #d9d6db;
	}
</style>
