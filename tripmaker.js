class TripMaker {
	// constants and array of all trip cards initialization
	constructor() {
		this.tripCards = [];
	}

	// method for quick finding intersection in 2 arrays
	static findIntersection(array1, array2) {
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

	/* returns object like:
		{
			fromLocation1: {to: toLocation1 ...other properties}
			fromLocation2: {...}
			.
			.
			.
		}
	*/
	static getFromObject(cards) {
		const fromObject = {};

		cards.forEach(card => {
			fromObject[card['from']] = {};

			Object.keys(card).forEach(key => {
				if (key !== 'from')
					fromObject[card['from']][key] = card[key];
			});
		});

		return fromObject;
	}

	static getUniqueArray(array) {
		return array.filter((value, index) => array.indexOf(value) === index);
	}

	static getValuesOfKey(array, key) {
		const values = [];
		array.forEach(element => {
			if (element[key] !== undefined)
				values.push(element[key]);
		});

		return values;
	}

	// check if we can make valid trip
	static checkForValidTrip(cards) {
		cards.forEach(card => {
			if (!TripMaker.checkForValidCard(card))
				return false;
		});

		const FromArray = TripMaker.getValuesOfKey(cards, 'from');
		const ToArray = TripMaker.getValuesOfKey(cards, 'to');

		const uniqueFromArray = TripMaker.getUniqueArray(TripMaker.getValuesOfKey(cards, 'from'));
		const uniqueToArray = TripMaker.getUniqueArray(TripMaker.getValuesOfKey(cards, 'to'));

		if (FromArray.length !== uniqueFromArray.length
			|| ToArray.length !== uniqueToArray.length
			|| TripMaker.findIntersection(FromArray, ToArray).length !== FromArray.length - 1)
			return false;

		return true;
	}

	// check if all must have properties consists in card
	static checkForValidCard(card) {
		if (TripMaker.findIntersection(TripMaker.MUST_HAVE_PROPERTIES, Object.keys(card)).length === TripMaker.MUST_HAVE_PROPERTIES.length)
			return true;

		return false;;
	}

	// adds card in all cards object variable
	addCard(card) {
		if(!TripMaker.checkForValidCard(card))
			throw new Error('Missed some must have properties!');
		this.tripCards.push(card);
	}

	clearTripCards() {
		this.tripCards = [];
	}

	static createTrip(cards) {
		if (!TripMaker.checkForValidTrip(cards))
			throw new Error('It is impossible to make trip with such cards!');
		return cards;
	}

	createTrip() {
		return TripMaker.createTrip(this.tripCards);
	}
}
TripMaker.MUST_HAVE_PROPERTIES = ['from', 'to', 'transport'];
TripMaker.DEFAULT_VALUE_FOR_UNDEFINED = 'not assigned';

const trip = new TripMaker();
trip.addCard({from: 'Saratov', to: 'Moscow', transport: 'train'});
trip.addCard({from: 'Moscow', to: 'Odintsovo', transport: 'bus'});
console.log(TripMaker.getFromObject(trip.tripCards));
console.log(trip.createTrip());