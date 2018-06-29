<template>
	<div id="app">
		<div class="content">

			<img src="./assets/logo.png" width="400" alt="CURNC">

			<div class="columns">
				
				<div class="column is-2">
					<swap-button @swap="swap"/>
				</div>

				<div class="column">
					<currency-box v-model="values[0]" :top="top"  :disabled="index == 1" @input="update"/>
					<currency-box v-model="values[1]" :top="-top" :disabled="index == 0" @input="update"/>
				</div>
				
			</div>
		</div>

		<div class="copy">Created By Anis BOUCHEKHIMA</div>

	</div>
</template>



<script>

	// import components and plugins
	import CurrencyBox from './components/CurrencyBox.vue'
	import SwapButton from './components/SwapButton.vue'
	import Vue from 'vue'
	import VueX from 'vuex'

	// use vuex state managment
	Vue.use(VueX)

	// create store for the application
	const store = new VueX.Store({
		state: {
			currencies: [],
		},

		mutations: {
			// register currencies when fetched either from the api or the cache
			registerCurrencies(state, currencies) {
				state.currencies = currencies
			}
		}
	})

	export default {
		name: 'app',
		store,
		data () {
			return {
				swaped: false,
				values: [
					{ currency: "DZD", amount: 0,  error: false },
					{ currency: "USD", amount: 0, error: false }
				]
			}
		},

		computed: {
			top() {
				return this.swaped ? 60 : 0
			},

			index() {
				return this.swaped ? 1 : 0
			}
		},

		methods: {
			swap() {
				this.swaped = !this.swaped
				this.update()
			},

			update() {
				// check input format
				this.resetErrors()
				if (isNaN(this.values[this.index].amount)) {
					this.values[this.index].error = true
					return
				}

				// convert the currency
				this.convert(this.values[this.index].amount, this.values[this.index].currency, this.values[1 - this.index].currency)
				.then(converted => this.values[1 - this.index].amount = Math.round(converted) == converted ? converted : converted.toFixed(4))
			},

			convert(amount, from, to) {
				// query
				const query = [from,to].join('_')

				// get currency conversion
				return fetch('https://free.currencyconverterapi.com/api/v5/convert?q=' + query )
				
				// get data as json
				.then(res => res.json())
			
				// get value
				.then(json => json.results[query].val)

				// calculate conversion
				.then(rate => amount * rate)

				// handle exceptions
				.catch(e => console.log('Could not get converstion rate for ' + query))
			},

			resetErrors() {
				for (let value of this.values) value.error = false
			}
		},

		components: {
			'currency-box': CurrencyBox,
			'swap-button': SwapButton
		},

		created() {
			// get currencies
			fetch('https://free.currencyconverterapi.com/api/v5/currencies')

			// as json format
			.then(res => res.json())

			// register currencies
			.then(json => this.$store.commit('registerCurrencies', Object.keys(json.results)))
			
			// handle unexpected exceptions
			.catch(e => console.log('Could not fetch currencies from api'))
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