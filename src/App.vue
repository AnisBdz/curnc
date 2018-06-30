<template>
	<div id="app">
		<div class="content">

			<img src="./assets/logo.png" width="400" alt="CURNC">

			<div class="columns">
				
				<div class="column swap-container">
					<swap-button @swap="swap"/>
				</div>

				<div class="column boxes-container">
					<currency-box v-model="values[0]" :top="top"  :disabled="index == 1" @input="update"/>
					<div class="serperator"></div>
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
	import db from './db'

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
				state.currencies = currencies.sort()
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
				if (this.values[1 - this.index].error) this.update()
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

				// get rate from database
				return db.getRate(from, to).then(rate => {
					// if rate exists
					if (rate) {
						// check if the rate is new
						if (((new Date) - rate.date) < 360 * 1000) return rate.rate
					}

					// fetch from network if it doesn't exist in db
					return fetch('https://free.currencyconverterapi.com/api/v5/convert?q=' + query )
					
					// get data as json
					.then(res => res.json())
				
					// get value
					.then(json => json.results[query].val)

					// save to database
					.then(rate => {
						db.setRate(from, to, rate)
						return rate
					})

					// handle exceptions
					.catch(e => {
						console.log('Could not get converstion rate for ' + query)
						console.log('Fall back to database')
						return rate ? rate.rate : null
					})
				})

				.then(rate => rate ? amount * rate : 0)

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
			// register service worker
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('sw.js')
			}

			// get currencies (if there are any)
			db.getCurrencies().then(currencies => {

				// return currencies
				if (currencies && currencies.length) return currencies

				// of fetch new ones
				else return fetch('https://free.currencyconverterapi.com/api/v5/currencies')

				// as json format
				.then(res => res.json())

				// register currencies
				.then(json => {

					// format the data we recieved
					let data = []

					for (let currency in json.results) {
						data.push({ currency, ...json.results[currency] })
					}

					data = data.sort((a, b) => a.currency < b.currency ? -1 : 1)

					// save to db
					return db.setCurrencies(data).then(() => data)
				})
				
				// handle unexpected exceptions
				.catch(e => console.log('Could not fetch currencies from api'))
			})

			// commit to application's store
			.then(currencies => {
				// commit to application store
				this.$store.commit('registerCurrencies', currencies)
			})

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
		background: linear-gradient(-125deg, #29b6f6, #5bcbff);
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

	.swap-container {
		text-align: right;
		max-width: 100px;
	}

	.boxes-container {
		text-align: left;
		max-width: 290px;
	}

	@media(max-width: 768px) {
		.swap-container {
			text-align: center;
			max-width: 100%;
		}

		.boxes-container {
			text-align: center;
			max-width: 100%;
		}
	}

	@keyframes hued {
		0% { filter: hue-rotate(-50deg);  }
		25% { filter: hue-rotate(0deg); }
		50% { filter: hue-rotate(50deg);  }
		75% { filter: hue-rotate(0deg);  }
		100% { filter: hue-rotate(-50deg);  }
	}

</style>