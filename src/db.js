import idb from 'idb'

// Create a keyval store for rates
const dbPromise = idb.open('curnc-store', 1, udb => {
	let ratesStore

	switch(udb.oldVersion) {
		case 0:
			ratesStore = udb.createObjectStore('rates')
		case 1:
			udb.createObjectStore('currencies', { keyPath: 'currency' })
		case 2:
			ratesStore.createIndex('by-date', 'date')
	}
})

export default {
	getRate(from, to) {
		return dbPromise.then(db => {
			return db.transaction('rates').objectStore('rates').get([from, to].join('_'))
		})
	},

	setRate(from, to, rate) {
		return dbPromise.then(db => {
			const tx = db.transaction('rates', 'readwrite');
		
			const row = {
				rate,
				date: new Date()
			}

			tx.objectStore('rates').put(row, [from, to].join('_'));
			
			// clean database
			return tx.complete.then(() => this.cleanRates(db))
		})
	},

	cleanRates(db) {
		return db.transaction('rates', 'readwrite').objectStore('rates').index('by-date').openCursor(null, 'prev').then(cursor => {
			return cursor.advance(50)
		})

		.then(function deleteRest(cursor) {
			if (!cursor) return
			cursor.delete()
			return cursor.continue().then(deleteRest)
		})
	},

	deleteRate(from, to, rate) {
		return dbPromise.then(db => {
			const tx = db.transaction('rates', 'readwrite');
			tx.objectStore('rates').delete([from, to].join('_'));
			return tx.complete;
		});
	},

	getCurrencies() {
		return dbPromise.then(db => {
			return db.transaction('currencies').objectStore('currencies').getAll()
		})
	},

	setCurrencies(currencies) {
		return dbPromise.then(db => {
			return Promise.all(
				currencies.map(currency => {
					const tx = db.transaction('currencies', 'readwrite')
					tx.objectStore('currencies').put(currency)
					return tx.complete
				}))
		})
	}
}