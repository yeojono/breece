<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const handleClick = (confidence: number) => () => {
		dispatch('submitConfidence', { confidence });
	};
</script>

<div class="container-box">
	How confident are you?
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span class="rating" on:click={handleClick(3)}>
		<img src="/very-sure.jpeg" alt="Very sure">
	</span>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span class="rating" on:click={handleClick(2)}>
		<img src="/a-little-sure.jpeg" alt="A little sure">
	</span>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<span class="rating" on:click={handleClick(1)}>
		<img src="/not-sure.jpeg" alt="Not sure">
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
	
	.rating img {
		width: 96px;
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
