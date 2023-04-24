<script>
	export let rocketFuel = 0;
    
	const maxFuel = 8;
</script>

<div class="rocket">
	{#each new Array(rocketFuel).fill(0) as _, i}
		<div class="big">🟩</div>
	{/each}
	{#each new Array(maxFuel - rocketFuel).fill(0) as _, i}
		<div class="big">⬛️</div>
	{/each}
</div>

<style>
	div.rocket {
		display: flex;
		flex-direction: column-reverse;
		gap: 2px;
		/* yucky */
		height: 256px;
	}

	.big {
		font-size: 24px;
	}
</style>
