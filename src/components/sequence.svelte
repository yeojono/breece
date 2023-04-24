<script lang="ts">
	import type { ShapeType } from "../model/shapes";
	import { loopOf } from "../util/array";
	import Shape from "./shapes/shape.svelte";


	export let shapes: ShapeType[];
	export let givenShapesCount: number;
	export let expectedShapesCount: number;

</script>

<div class="sequence">
	<!-- Convert this into a "renderShapes" sub module -->
	{#each shapes as shape, i}
		<div
			class:input={i >= givenShapesCount}
			class:given={i<givenShapesCount}
		>
            <Shape key={shape}/>
		</div>
	{/each}

	{#each loopOf(expectedShapesCount+givenShapesCount-shapes.length) as _, i}
       <div class="input"><div class='placeholder' /></div>
    {/each}
</div>

<style>
    .input {
        background: #f6f5f8;
        border: 1px solid darkgrey;
        border-radius: 4px;

        min-width: 40px;
        min-height: 40px;

		display: flex;
		align-items: center;
		justify-content: center;
    }

    .given {
        min-width: 40px;
        min-height: 40px;

		display: flex;
		align-items: center;
		justify-content: center;
    }

    div.placeholder {
        min-width: 32px;
        min-height: 32px;
    }

	div.sequence {
		display: flex;
		gap: 8px;
	}
</style>
