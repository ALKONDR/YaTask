class TripMaker {
	constructor() {
		this.tripCards = [];
		this.MUST_HAVE_PROPERTIES = ['from', 'to', 'transport'];
		this.DEFAULT_VALUE_FOR_UNDEFINED = 'not assigned';
	}

	//method for quick finding intersection in 2 arrays
	findIntersection(array1, array2) {
		const tmp = {};
		const intersection = [];

		array1.forEach(element => {
			tmp[element] = true;
		});

		array2.forEach(element => {
			if (tmp[element])
				intersection.push(element);
		});

		return intersection;
	}

	checkForValidTrip(trip) {
		trip.forEach(card => {
			if (!this.checkForValidCard(card))
				return false;
		});
	}

	checkForValidCard(card) {
		if (this.findIntersection(this.MUST_HAVE_PROPERTIES, Object.keys(card)).length === this.MUST_HAVE_PROPERTIES.length)
			return true;

		return false;;
	}

	addCard(card) {
		if(!this.checkForValidCard(card))
			throw new Error('Missed some must have properties!');
		this.tripCards.push(card);
	}

	clearTripCards() {
		this.tripCards = [];
	}

	static createTrip(cards) {

	}
}

const trip = new TripMaker();
trip.addCard({from: 'Saratov', to: 'Moscow', transport: 'train'});
trip.addCard({from: 'Moscow', to: 'Odintsovo', transport: 'bus'});
console.log(trip.tripCards);