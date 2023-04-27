<script>
	import PageContainer from '../components/page-container.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		const ResultStore = await import('../store/result');
		console.log(ResultStore);
	});
</script>

<PageContainer>
	<a href="/puzzles/0">Start</a>
</PageContainer>
