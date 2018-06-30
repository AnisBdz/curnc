<template>
	<div class="swap-button">
		<button class="button is-rounded" @click="swap"><i class="fa fa-exchange"></i></button>
	</div>
</template>

<script>
	export default {
		name: 'swap-button',

		methods: {
			swap() {
				this.$emit('swap')
			}
		}
	}
</script>

<style>
	.swap-button .button {
		height: 50px;
		width:  50px;
		background: rgba(255, 255, 255, .4);
		border: 2px solid rgba(255, 255, 255, .8);
		color: white;
		font-size: 25px;
		transform: rotate(90deg);
		padding: 0px;
		transition: all 0.4s ease-in 0s;
	}


	.swap-button .button:hover {
		background: rgba(255, 255, 255, .7);
		color: white;
	}

	.swap-button .button:focus:not(:active) {
		outline: none;
		border: 2px solid rgba(255, 255, 255, .8);
		box-shadow: none;
		color: white;
	}


</style>