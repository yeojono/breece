<script lang="ts">
	import Circle from './circle.svelte';
	import Crescent from './crescent.svelte';
	import Cross from './cross.svelte';
	import Octagon from './octagon.svelte';
	import Pentagon from './pentagon.svelte';
	import Plus from './plus.svelte';
	import Square from './square.svelte';
	import Star from './star.svelte';
	import Triangle from './triangle.svelte';
	import type { ComponentType } from 'svelte';
    import type { ShapeType } from '../../model/shapes';

	export let key: ShapeType;
	export let size: number = 32;

	const component: ComponentType = (() => {
		switch (key) {
			case 'circle':
				return Circle;
			case 'crescent':
				return Crescent;
			case 'cross':
				return Cross;
			case 'octagon':
				return Octagon;
			case 'pentagon':
				return Pentagon;
			case 'plus':
				return Plus;
			case 'square':
				return Square;
			case 'star':
				return Star;
			case 'triangle':
				return Triangle;
		}
	})();
</script>

<svelte:component this={component} width={size} height={size} />