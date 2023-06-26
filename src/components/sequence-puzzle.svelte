<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { SequenceCharacter, ShapeType } from '../model/shapes';
	import Sequence from './sequence.svelte';
	import Shape from './shapes/shape.svelte';
	import ConfidenceMetre from './confidence-metre.svelte';
	import type { ConfidenceRating, ConfidenceRatingResponse, PuzzleResponse, SequenceResponse } from '../store/result';
	import {
		shapesFromCharacterSequence,
		type PuzzleConfig,
		sequenceCharacterFromShapeType
	} from '../data/puzzles';

	export let puzzleConfig: PuzzleConfig;
	let givenShapes: ShapeType[] = shapesFromCharacterSequence(
		puzzleConfig.sequence,
		puzzleConfig.a,
		puzzleConfig.b
	);

	let enteredSequence: SequenceCharacter[] = [];
	let enteredShapes: ShapeType[] = [];
	let enteringConfidence: boolean = false;

	$: enteredShapes = shapesFromCharacterSequence(
		enteredSequence.join(''),
		puzzleConfig.a,
		puzzleConfig.b
	);

	const sequence: SequenceResponse[] = [];
	const confidenceRatings: ConfidenceRatingResponse[] = [];

	const shapeSet = [puzzleConfig.a, puzzleConfig.b];

	// initialise timestamp to onload
	let responseTimestamp = Date.now();

	const appendSequence = (shape: ShapeType) => {
		const char = sequenceCharacterFromShapeType(puzzleConfig, shape);
		enteredSequence = [...enteredSequence, char];
		const responseTime = (Date.now()-responseTimestamp)/1000;
		sequence.push({ character: char, responseTime })
		responseTimestamp = Date.now()
		enteringConfidence = true;
	};

	const handleSubmitConfidence = ({
		detail: { confidence }
	}: CustomEvent<{ confidence: ConfidenceRating }>) => {
		const responseTime = (Date.now()-responseTimestamp)/1000;
		confidenceRatings.push({ confidenceRating: confidence, responseTime });
		responseTimestamp = Date.now()
		enteringConfidence = false;
	};

	const dispatch = createEventDispatcher<{ puzzleComplete: PuzzleResponse }>();

	$: if (enteredSequence.length === 3 && !enteringConfidence) {
		dispatch('puzzleComplete', {
			sequence,
			confidenceRatings,
		});
	}

	const handleSkip = () => {
		const dispatchedSequence = [ ...sequence ];
		const dispatchedRatings = [ ...confidenceRatings ];
		const oldSequenceLength = dispatchedSequence.length;
		const oldRatingsLength = dispatchedRatings.length;
		dispatchedSequence.length = 3;
		dispatchedRatings.length = 3;
		dispatchedSequence.fill({character: 'SKIP', responseTime: 0}, oldSequenceLength)
		dispatchedRatings.fill({confidenceRating: 0, responseTime: 0}, oldRatingsLength)
		dispatch('puzzleComplete', {
			sequence: dispatchedSequence,
			confidenceRatings: dispatchedRatings,
		});
	};
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
	<button class="skip" on:click={handleSkip}>skip</button>
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

	button.skip {
		position: absolute;
		bottom: 4px;
		left: 4px;

		background: none;
		border: none;
		padding: none;
		cursor: pointer;
	}
</style>
