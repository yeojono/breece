<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { ShapeType } from '../model/shapes';
	import Sequence from './sequence.svelte';
	import Shape from './shapes/shape.svelte';

	export let givenShapes: ShapeType[];

	let enteredShapes: ShapeType[] = [];

	const shapeSet = Array.from(new Set(givenShapes));

	const insertShape = (shape: ShapeType) => {
		enteredShapes = [...enteredShapes, shape];
	};

	const dispatch = createEventDispatcher();
	$: if (enteredShapes.length >= 3) {
		dispatch('puzzleComplete');
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
		<!-- Scan shapes argument for unique shapes and auto build buttons -->
		{#each shapeSet as shapeOption}
			<button on:click={() => insertShape(shapeOption)}>
				<Shape key={shapeOption} size={32} />
			</button>
		{/each}
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
