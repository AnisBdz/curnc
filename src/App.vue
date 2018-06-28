<template>
	<div id="app">
		
		<link rel="stylesheet" href="../node_modules/bulma/css/bulma.css">
		<link rel="stylesheet" href="../node_modules/font-awesome/css/font-awesome.css">

		<div class="content">

			<img src="./assets/logo.png" width="400" alt="CURNC">

			<div class="columns">
				
				<div class="column is-2">
					<swap-button @swap="swap"/>
				</div>

				<div class="column">
					<currency-box cur="USD" :val="0.1" :top="top"/>
					<currency-box cur="DZD" :val="10"  :top="-top"/>
				</div>
				
			</div>
		</div>

		<div class="copy">Created By Anis BOUCHEKHIMA</div>


	</div>
</template>



<script>

	import CurrencyBox from './components/CurrencyBox.vue'
	import SwapButton from './components/SwapButton.vue'

	export default {
		name: 'app',
		data () {
			return {
				top: 0
			}
		},

		methods: {
			swap() {
				this.top = 61 - this.top;
			}
		},

		components: {
			'currency-box': CurrencyBox,
			'swap-button': SwapButton
		}
	}

</script>

<style>
	html, body {
		margin: 0;
		padding: 0;
		height: 100%;
		overflow: hidden;
	}

	body::after {
		position: fixed;
		top: 0;
		left: 0;
		content: '';
		z-index: -1;
		height: 100%;
		width: 100%;
		display: block;	
		background: #29b6f6;
		animation: hued 30s linear 0s infinite alternate;
	}

	#app {
		filter: none;
		margin-top: 50px;
		text-align: center;
	}

	#app .content {
		display: inline-block;
		margin: 10px auto;
	}

	#app .swap-button {
		margin-top: 25px
	}

	#app .copy {
		position: fixed;
		right: 0;
		bottom: 0;
		padding: 5px 10px;
		color: white;
	}

	@keyframes hued {
		0% { filter: hue-rotate(-50deg);  }
		25% { filter: hue-rotate(0deg); }
		50% { filter: hue-rotate(50deg);  }
		75% { filter: hue-rotate(0deg);  }
		100% { filter: hue-rotate(-50deg);  }
	}
</style>