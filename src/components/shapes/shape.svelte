<script lang="ts">
	import type { ComponentType, SvelteComponent } from 'svelte';
    import type { ShapeType } from '../../model/shapes';
	import Circle from './circle.svelte';
	import Square from './square.svelte';
	import Triangle from './triangle.svelte';
	import Star from './star.svelte';

	export let key: ShapeType;
	export let size: number = 32;

	const component: ComponentType = (() => {
		switch (key) {
			case 'circle':
				return Circle;
			case 'square':
				return Square;
			case 'triangle':
				return Triangle;
			case 'star':
				return Star;
		}
	})();
</script>

<svelte:component this={component} width={size} height={size} />