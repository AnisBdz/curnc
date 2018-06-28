<template>
	<div id="app">
		
		<link rel="stylesheet" href="../node_modules/bulma/css/bulma.css">

		<currency-box cur="DZD" :val="10"  />
		<currency-box cur="USD" :val="0.1" />


	</div>
</template>



<script>

	import CurrencyBox from './components/CurrencyBox.vue'

	export default {
		name: 'app',
		data () {
			return {
				msg: 'Hello, World!'
			}
		},

		components: {
			'currency-box': CurrencyBox
		}
	}

</script>

<style>
	html, body {
		margin: 0;
		padding: 0;
		height: 100%;
	}

	body::before {
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
		top: 50%;
		position: relative;
		transform: translateY(-50%);
		text-align: center;
	}

	@keyframes hued {
		0% { filter: hue-rotate(-50deg);  }
		25% { filter: hue-rotate(0deg); }
		50% { filter: hue-rotate(50deg);  }
		75% { filter: hue-rotate(0deg);  }
		100% { filter: hue-rotate(-50deg);  }
	}
</style>