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
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span class="rating" on:click={handleClick(3)}>
		<RatingFaceVerySure />
	</span>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span class="rating" on:click={handleClick(2)}>
		<RatingFaceALittleSure />
	</span>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span class="rating" on:click={handleClick(1)}>
		<RatingFaceNotSure />
	</span>

	<button class="skip" on:click={handleClick(0)}>skip</button>
</div>

<style>
	.container-box {
		border-radius: 4px;
		border: 1px solid darkgray;
		background: #f6f5f8;

		padding: 24px 32px 32px 32px;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 32px;

		position: relative;
	}

	.rating {
		cursor:pointer;
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

	.skip:hover {
		background: #efecf1;
	}

	.skip:active {
		background: #d9d6db;
	}
</style>
