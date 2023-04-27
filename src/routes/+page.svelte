<script lang="ts">
	import { onMount } from 'svelte';
	import type { ResultStoreType } from '../store/result';
	import { generateId } from '../util/id';
	import type { Writable } from 'svelte/store';

	let ResultStoreModule: typeof import('../store/result');
	let ResultStore: Writable<ResultStoreType>;
	onMount(async () => {
		ResultStoreModule = await import('../store/result');
		ResultStore = ResultStoreModule.store;
	});

	const beginChallenge = () => {
		const challengeId = generateId();
		window.location.href = `/puzzles/0?challengeId=${challengeId}`;
		ResultStoreModule.createResult(String(challengeId));
	};
</script>

<a on:click={beginChallenge}>Start</a>
