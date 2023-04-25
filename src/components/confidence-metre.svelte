<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import RatingFaceALittleSure from './shapes/rating-face-a-little-sure.svelte';
	import RatingFaceNotSure from './shapes/rating-face-not-sure.svelte';
	import RatingFaceVerySure from './shapes/rating-face-very-sure.svelte';

	const dispatch = createEventDispatcher();
	const handleClick = (confidence: number) => () => {
		dispatch('submitConfidence', { confidence });
	};
</script>

<div class="container-box">
    How confident are you?
	<span on:click={handleClick(3)} >
		<RatingFaceVerySure/>
	</span>
	<span on:click={handleClick(2)} >
		<RatingFaceALittleSure/>
	</span>
	<span on:click={handleClick(1)} >
		<RatingFaceNotSure/>
	</span>
</div>

<style>
	.container-box {
		border-radius: 4px;
		border: 1px solid darkgray;
		background: #f6f5f8;

		padding: 32px;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 32px;
	}
</style>
