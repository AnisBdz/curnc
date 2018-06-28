<template>

	<div class="currency-box" :style="{top: top + 'px'}">
		<div class="field has-addons">
			
			<p class="control">
				<input type="text" placeholder="0.00" v-model="val" class="input is-medium">			
			</p>

			<p class="control">
				<span class="select is-medium">
					<select v-model="cur">
						<option>DZD</option>
						<option>USD</option>
						<option>EUR</option>
						<option>TND</option>
					</select>
				</span>
			</p>
	
		</div>
	</div>

</template>

<script>
	
	export default {
		name: 'currency-box',
		props: {
			cur: String,
			val: Number,
			top: Number
		}
	}


</script>

<style>
	.currency-box {
		position: relative;
		transition: top 0.3s ease-out 0s;
	}

	.currency-box .input {
		max-width: 200px;
	}

	.currency-box .input:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.currency-box .input, .currency-box .select select {
		border: 2px solid white;
		color: white;
		transition: background 0.4s ease-out 0s, border 0.4s ease-out 0s;
	}

	.currency-box .input:focus, .currency-box .select select:focus {
		box-shadow: none;
		outline: none;
		border-color: white;
	}
	
	.currency-box .input:hover, .currency-box .select select:hover {
		border-color: rgba(255, 255, 255, 0.7);
	}
	
	.currency-box .input {
		background: transparent;
	}

	.currency-box .select select {
		background: rgba(255, 255, 255, 0.2);
		border-left-width: 0px;
	}

	.currency-box .select select option {
		color: black;
	}

	.currency-box .select:not(.is-multiple):not(.is-loading)::after {
		border-color: white;
	}

	.currency-box .select:hover:not(.is-multiple):not(.is-loading)::after {
		border-color: white;
	}
</style>