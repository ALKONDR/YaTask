# TripMakerJS
## Установка
Подключите файл из этого репозитория перед всеми js файлами:
```html
<script src='path/to/the/file/tripmaker.js'> </script>
```
## Использование
### Способ 1
Создайте объект класса TripMaker:
```js
const myTrip = new TripMaker();
```
Чтобы добавить карточку путешествия в набор используйте:
```js
let newTripCard = {from: 'Madrid', to: 'Barcelona', transport: 'plane'};
myTrip.addCard(newTripCard);
```
Объекты карточек могут содержать любые свойства, но обязятельными являются: `['from', 'to', 'transport']`
При желании можно добавить обязательных свойств, изменив следующую часть кода в `tripmaker.js`:
```js
Object.defineProperty(TripMaker, 'MUST_HAVE_PROPERTIES', {
	value: ['from', 'to', 'transport'],
	writable: false,
	enumarable: false,
	configurable: false
});
```
Чтобы очистить весь набор карточек в объекте, можно использовать метод `.clearTripCards()`:
```js
myTrip.clearTripCards();
```
Для того, чтобы отсортировать карточки, используем метод `createTrip()` он вернет объект, содержащий отсортированные карточки и строковое представление путешествия.
```js
const finalTrip = myTrip.createTrip();
console.log(finalTrip.transitionChain); // отсортированные карточки
console.log(finalTrip.tripString); // строковое представление
```
Для примера из задания получается следующее строковое представление:
```
Take train from Madrid to Barcelona. number: 78A. seat: 45B.
Take airport bus from Barcelona to Gerona Airport. seat: not assigned.
Take plane from Gerona Airport to Stockholm. number: SK 455. gate: 45B. seat: 3A. baggage: drop at ticket counter 344.
Take plane from Stockholm to New York JFK. number: SK22. gate: 22. seat: 7B. baggage: will be automatically transferred from your last leg.
```
### Способ 2
Того же самого эффекта можно добиться, просто передав массив из карточек в статический метов `.createTrip(cards)`:
```js
const cardsArray = ...; // как-то получаем массив из карточек
const finalTrip = TripMaker.createTrip(cardsArray);
```
