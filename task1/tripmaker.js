'use strict'

class TripMaker {
	// constants and array of all trip cards initialization
	constructor() {
		this.tripCards = [];
	}

	// method for quick finding intersection in 2 arrays
	static findIntersection(array1, array2) {

		// we use this object as hashmap
		// so the whole method time complexity will be O(n)
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

	/* returns object like this:
		{
		fromObject:
			{
				fromLocation1: {to: toLocation1 ...other properties}
				fromLocation2: {...}
				.
				.
				.
			}
		toObject:
			{
				toLocation1: {from: fromLocation1 ...other properties}
				toLocation2: {...}
				.
				.
				.
			}
		}
	*/
	static getFromAndToObject(cards) {
		const fromObject = {};
		const toObject = {};

		cards.forEach(card => {
			fromObject[card['from']] = {};
			toObject[card['to']] = {};

			Object.keys(card).forEach(key => {
				if (key !== 'from')
					fromObject[card['from']][key] = card[key];

				if (key !== 'to')
					toObject[card['to']][key] = card[key];
			});
		});

		const finalObject = {};
		finalObject['fromObject'] = fromObject;
		finalObject['toObject'] = toObject;

		return finalObject;
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
		// check if all cards have must have properties
		cards.forEach(card => {
			if (!TripMaker.checkForValidCard(card))
				return false;
		});

		const FromArray = TripMaker.getValuesOfKey(cards, 'from');
		const ToArray = TripMaker.getValuesOfKey(cards, 'to');

		const uniqueFromArray = TripMaker.getUniqueArray(TripMaker.getValuesOfKey(cards, 'from'));
		const uniqueToArray = TripMaker.getUniqueArray(TripMaker.getValuesOfKey(cards, 'to'));

		// all [from] and [to] properties must be unique
		// and their intersection should be one element smaller
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

	// returns the final array of sorted cards
	static getTransitionChain(chain, fromObject) {
		const transitionChain = [];

		// here we create our sorted cards in normal representation
		chain.forEach(location => {
			if (!fromObject[location])
				return;

			let tmp = {from: location}

			// here we add all aditional properties
			Object.keys(fromObject[location]).forEach(key => {
				tmp[key] = fromObject[location][key];
			});

			transitionChain.push(tmp);
		});

		return transitionChain;
	}

	static getStringRepresentation(transitionChain) {
		// just properties that we use at the beggining of each string
		const START_PROPERTIES = ['from', 'to', 'transport'];

		let tripString = '';

		transitionChain.forEach(transition => {
			// basic information of the transition
			let currentTransitionString = `Take ${transition.transport} from ${transition.from} to ${transition.to}. `;

			// here we add additional properties of our transitions
			Object.keys(transition).forEach(key => {
				if (!START_PROPERTIES.includes(key))
					currentTransitionString += `${key}: ${transition[key] || TripMaker.DEFAULT_VALUE_FOR_UNDEFINED}. `;
			});

			tripString += currentTransitionString.trim() + '\n';
		});

		return tripString.trim();
	}

	static createTrip(cards) {
		// let first check if all cards are valid and if we can make a trip with them
		if (!TripMaker.checkForValidTrip(cards))
			throw new Error('It is impossible to make trip with such cards!');

		const finalTrip = [];
		// we use this object as hashmap for better time complexity
		const fromAndToObject = TripMaker.getFromAndToObject(cards);

		let firstTransition = undefined;

		// finding first location of our trip
		Object.keys(fromAndToObject.toObject).forEach(key => {
			if (!fromAndToObject.toObject[fromAndToObject.toObject[key]['from']])
				firstTransition = fromAndToObject.toObject[key]['from'];
		});
		finalTrip.push(firstTransition);

		// here we create an array of our distinations, like:
		// ['Madrid', 'Barcelona' ...]
		for (let i = 0; i < Object.keys(fromAndToObject.fromObject).length; i++){
			finalTrip.push(fromAndToObject.fromObject[finalTrip[i]]['to'])
		}

		// here we will get an array of our transitions with the whole additional information
		const transitionChain = TripMaker.getTransitionChain(finalTrip, 
			fromAndToObject.fromObject);

		// here we will get a string representation of our trip
		const tripString = TripMaker.getStringRepresentation(transitionChain);

		// sorted cards can be useful in future development so we can return them too
		return {
			transitionChain: transitionChain, // sorted trip cards
			tripString: tripString // string representation of our trip
		};
	}

	createTrip() {
		return TripMaker.createTrip(this.tripCards);
	}
}

Object.defineProperty(TripMaker, 'MUST_HAVE_PROPERTIES', {
	value: ['from', 'to', 'transport'],
	writable: false,
	enumarable: false,
	configurable: false
});

Object.defineProperty(TripMaker, 'DEFAULT_VALUE_FOR_UNDEFINED', {
	value: 'not assigned',
	writable: false,
	enumarable: false,
	configurable: false
});

//**************************************************
//---------------------TESTING----------------------
//**************************************************

const trip = new TripMaker();

trip.addCard({from: 'Madrid', to: 'Barcelona', transport: 'train', number: '78A', seat: '45B'});
trip.addCard({from: 'Stockholm', to: 'New York JFK', transport: 'plane', number: 'SK22', gate: '22', seat: '7B', baggage: 'will be automatically transferred from your last leg'});
trip.addCard({from: 'Gerona Airport', to: 'Stockholm', transport: 'plane', number: 'SK 455', gate: '45B', seat: '3A',  baggage: 'drop at ticket counter 344'});
trip.addCard({from: 'Barcelona', to: 'Gerona Airport', transport: 'airport bus', seat: null});

console.log(trip.createTrip().tripString);
// Take train from Madrid to Barcelona. number: 78A. seat: 45B.
// Take airport bus from Barcelona to Gerona Airport. seat: not assigned.
// Take plane from Gerona Airport to Stockholm. number: SK 455. gate: 45B. seat: 3A. baggage: drop at ticket counter 344.
// Take plane from Stockholm to New York JFK. number: SK22. gate: 22. seat: 7B. baggage: will be automatically transferred from your last leg.



// The same result will be if we put all cards in one array and call TripMaker.createTrip(ourArrayOfTripCards)