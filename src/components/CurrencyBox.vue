<template>
	<div>I am a currency box of {{ val }} {{ cur }}.</div>
</template>

<script>
	
	export default {
		name: 'currency-box',
		props: {
			cur: String,
			val: Number 
		}
	}


</script>