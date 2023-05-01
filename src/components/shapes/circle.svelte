<script>
	import { COLORS } from '../../util/colors';
	export let width = 64;
	export let height = 64;
	export let fill = COLORS.blue;
</script>

<svg {width} {height} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
	<circle cx="32" cy="32" r="31" {fill} stroke="black" stroke-width="2" />
</svg>
