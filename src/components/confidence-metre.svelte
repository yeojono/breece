<script>
	import RatingFaceALittleSure from "./shapes/rating-face-a-little-sure.svelte";
	import RatingFaceNotSure from "./shapes/rating-face-not-sure.svelte";
	import RatingFaceVerySure from "./shapes/rating-face-very-sure.svelte";

</script>
<div class="container-box">
    <span>
        <RatingFaceVerySure/>
    </span>
    <span>
        <RatingFaceALittleSure/>
    </span>
    <span>
        <RatingFaceNotSure/>
    </span>
</div>

<style>
    .container-box {
        border-radius: 4px;
        border: 1px solid darkgray;
		background: #f6f5f8;

		padding: 32px;

		display: flex;
		align-items: center;
		justify-content: center;
        gap: 32px;
    }
</style>