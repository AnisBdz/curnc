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
		border: 0px solid transparent;
		color: white;
		font-size: 25px;
		transform: rotate(90deg);
		transition: background 0.4s ease-out 0s;
	}


	.swap-button .button:hover {
		background: rgba(255, 255, 255, .7);
		color: white;
	}

	.swap-button .button:focus:not(:active) {
		outline: none;
		border: 0px solid transparent;
		box-shadow: none;
		color: white;
	}


</style>