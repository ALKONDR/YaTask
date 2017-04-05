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

	static getTransitionChain(chain, fromObject) {
		const transitionChain = [];

		chain.forEach(location => {
			if (!fromObject[location])
				return;

			let tmp = {from: location}
			Object.keys(fromObject[location]).forEach(key => {
				tmp[key] = fromObject[location][key];
			});

			transitionChain.push(tmp);
		});

		return transitionChain;
	}

	static getStringRepresentation(transitionChain) {
		const START_PROPERTIES = ['from', 'to', 'transport'];

		let tripString = '';

		transitionChain.forEach(transition => {
			let currentTransitionString = `Take ${transition.transport} from ${transition.from} to ${transition.to}. `;

			Object.keys(transition).forEach(key => {
				if (!START_PROPERTIES.includes(key))
					currentTransitionString += `${key}: ${transition[key]}. `;
			});

			tripString += currentTransitionString.trim() + '\n';
		});

		return tripString.trim();
	}

	static createTrip(cards) {
		if (!TripMaker.checkForValidTrip(cards))
			throw new Error('It is impossible to make trip with such cards!');

		const finalTrip = [];
		const fromAndToObject = TripMaker.getFromAndToObject(cards);

		let firstTransition = undefined;
		Object.keys(fromAndToObject.toObject).forEach(key => {
			if (!fromAndToObject.toObject[fromAndToObject.toObject[key]['from']])
				firstTransition = fromAndToObject.toObject[key]['from'];
		});

		finalTrip.push(firstTransition);
		for (let i = 0; i < Object.keys(fromAndToObject.fromObject).length; i++){
			finalTrip.push(fromAndToObject.fromObject[finalTrip[i]]['to'])
		}

		const transitionChain = TripMaker.getTransitionChain(finalTrip, 
			fromAndToObject.fromObject);

		const tripString = TripMaker.getStringRepresentation(transitionChain);

		return {
			transitionChain: transitionChain,
			tripString: tripString
		};
	}

	createTrip() {
		return TripMaker.createTrip(this.tripCards);
	}
}

TripMaker.MUST_HAVE_PROPERTIES = ['from', 'to', 'transport'];
TripMaker.DEFAULT_VALUE_FOR_UNDEFINED = 'not assigned';


// *****************************
// ----------TESTING------------
// *****************************

const trip = new TripMaker();
trip.addCard({from: 'Moscow', to: 'Odintsovo', transport: 'bus', seat: 'A78'});
trip.addCard({from: 'Saratov', to: 'Moscow', transport: 'train', number: '123', seat: 'B12'});
// console.log(TripMaker.getFromAndToObject(trip.tripCards));
console.log(trip.createTrip());