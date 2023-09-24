<script>
	export let fields = {
		participantNumber: '13',
		age: '4',
		gender: 'female',
		dateOfBirth: '',
		languages: '',
	};
</script>

<div class="form">
	<label for="participant-number">Participant Number:</label>
	<div class="input-container">
		<input id="participant-number" type="text" bind:value={fields.participantNumber} />
	</div>

	<label for="age">Age:</label>
	<div class="input-container">
		<input id="age" type="text" bind:value={fields.age} />
	</div>

	<label for="gender">Gender:</label>
	<div class="input-container">
		<select id="gender" bind:value={fields.gender}>
			<option value="female">Female</option>
			<option value="male">Male</option>
			<option value="-">-</option>
		</select>
	</div>

	<label for="date-of-birth">Date of Birth:</label>
	<div class="input-container">
		<input id="date-of-birth" type="text" bind:value={fields.dateOfBirth} />
	</div>

	<label for="languages">Languages Other Than English Spoken at Home:</label>
	<div class="input-container">
		<input id="languages" type="text" bind:value={fields.languages} />
	</div>
</div>

<style>
	.form {
		display: grid;
		grid-template-columns: 250px 250px;
		grid-row-gap:    20px;
		grid-column-gap: 1rem;
		
        font-size: 1.3rem;
		margin-bottom: 24px;
	}

    label {
        text-align: right;
    }

	.input-container {
		display: flex;
		align-items: center;
	}
    
</style>
