<script lang="ts">
	import type { ShapeType } from '../model/shapes';
	import { createEventDispatcher } from 'svelte';
	import { deepEquals } from '../util/array';
	import Sequence from './sequence.svelte';
	import Shape from './shapes/shape.svelte';

	export let givenShapes: ShapeType[];
	export let correctSequence: ShapeType[];

	const dispatch = createEventDispatcher();

	let enteredShapes: ShapeType[] = [];

	const handleSubmit = () => {
		if (deepEquals(enteredShapes, correctSequence)) {
			dispatch('success');
		} else {
			dispatch('failure');
		}
	};

	const shapeSet = Array.from(new Set(givenShapes));

	$: shapeSelectionEnabled = enteredShapes.length < correctSequence.length;

	const insertShape = (shape: ShapeType) => {
		enteredShapes = [...enteredShapes, shape];
	};

	// const backspace = () => (enteredShapes = enteredShapes.slice(0, enteredShapes.length - 1));
</script>
<div style="display: flex; flex-direction: column; align-items: center;">
	<Sequence shapes={[...givenShapes, ...enteredShapes]} givenShapesCount={givenShapes.length} expectedShapesCount={correctSequence.length} />


	<h1>What comes next?</h1>

	<div style="display: flex; gap: 16px">
		<!-- Scan shapes argument for unique shapes and auto build buttons -->
		{#each shapeSet as shapeOption}
				<button
					disabled={!shapeSelectionEnabled}
					on:click={() => insertShape(shapeOption)}
				>
					<Shape key={shapeOption} size={32} />
				</button>
		{/each}
		<!-- <button on:click={backspace}>⇦</button> -->
	</div>

	<div>
		<button on:click={handleSubmit}>Submit</button>
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
