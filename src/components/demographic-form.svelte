<script>
	export let fields = {
		participantNumber: '13',
		age: '4',
		gender: 'female',
		hasAsdDiagnosis: false
	};
</script>

<div class="form">
	<div class="form-row">
		<label for="participant-number">Participant number:</label>
		<input id="participant-number" type="text" bind:value={fields.participantNumber} />
	</div>

	<div class="form-row">
		<label for="age">Age:</label>
		<input id="age" type="text" bind:value={fields.age} />
	</div>

	<div class="form-row">
		<label for="gender">Gender:</label>
		<select id="gender" bind:value={fields.gender}>
			<option value="female">Female</option>
			<option value="male">Male</option>
			<option value="-">-</option>
		</select>
	</div>

	<div class="form-row">
		<label for="has-asd-diagnosis">Has ASD diagnosis:</label>
        <input id="has-asd-diagnosis" type="checkbox" bind:checked={fields.hasAsdDiagnosis} />
	</div>
</div>

<style>
	.form {
		display: flex;
		flex-direction: column;
        gap: 8px;

		width: 400px;
        font-size:x-large;

        margin-bottom: 16px;
	}
	.form-row {
		display: flex;
        align-items: center;
	}
    
    label {
        min-width: 200px;
        margin-right: 16px;
        text-align: right;
    }

    input[type=checkbox] {
        transform: scale(1.3);
    }
</style>
