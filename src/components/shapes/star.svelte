<script>
	import { COLORS } from '../../util/colors';

	export let width = 64;
	export let height = 64;
	export let fill = COLORS.yellow;
</script>

<svg
	{width}
	height={(height * 60) / 64}
	viewBox="0 0 64 60"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M32 3.23607L38.4579 23.1115L38.6824 23.8024H39.409H60.3072L43.4002 36.0861L42.8124 36.5132L43.0369 37.2041L49.4948 57.0795L32.5878 44.7959L32 44.3688L31.4122 44.7959L14.5052 57.0795L20.9631 37.2041L21.1876 36.5132L20.5998 36.0861L3.69282 23.8024H24.591H25.3176L25.5421 23.1115L32 3.23607Z"
		{fill}
		stroke="black"
		stroke-width="2"
	/>
</svg>
