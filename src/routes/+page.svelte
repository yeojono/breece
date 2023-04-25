<script>
	import PageContainer from '../components/page-container.svelte';
	import SequencePuzzle from '../components/sequence-puzzle.svelte';
</script>

<PageContainer>
	<SequencePuzzle
		givenShapes={['square', 'circle', 'circle','square', 'circle', 'circle']}
	/>
	<SequencePuzzle
		givenShapes={['star', 'triangle', 'star','star', 'triangle', 'triangle']}
	/>
</PageContainer>