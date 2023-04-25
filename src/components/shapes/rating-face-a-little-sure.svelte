<script>
	export let width = 64;
	export let height = 64;
	export let fill = '#ffffff';
</script>

<svg {width} {height} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M63 32C63 49.1208 49.1208 63 32 63C14.8792 63 1 49.1208 1 32C1 14.8792 14.8792 1 32 1C49.1208 1 63 14.8792 63 32Z"
		{fill}
		stroke="black"
		stroke-width="2"
	/>
	<circle cx="18" cy="24" r="4" fill="black" />
	<circle cx="47" cy="24" r="4" fill="black" />
	<line x1="14" y1="43" x2="51" y2="43" stroke="black" stroke-width="2" />
</svg>
