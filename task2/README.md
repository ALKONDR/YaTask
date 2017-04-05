# My Little Framework :D
## Установка
Подключите файл `myLittleFramework.js` перед свойми js-файлами в html:
```html
<script src="path/to/the/file/myLittleFramework.js"></script>
```
## Инициализация
Для инициализации объекта используйте одну из двух функций:
 - `first(selector)` - для получения первого элемента с данным селектором
 - `all(selector)` - для получения всех элементов с данным селектором

Пример в коде:
```js
const firstElementWithSelector = first('.myClass');
const allElementsWithSelector = all('.multipleElements');
```
## Свойства и методы
### .dom
Данное свойство используется для получения html-элемента со всеми его свойствами:
```js
const htmlELement = firstElementWithSelector.dom;
```
### .addClass(className)
Добавляет класс к текущему элементу/элементам
```js
// предположим, что у нас есть элемент с классом myClass
firstElementWithSelector.addClass('anotherClass');
console.log(firstElementWithSelector.dom.className); // 'myClass anotherClass'
```
### .removeClass(className)
Удаляет класс у текущего элемента/элементов
```js
firstElementWithSelector.removeClass('myClass');
console.log(firstElementWithSelector.dom.className); // 'anotherClass'
```
### .toggleClass(className)
Добавляет класс к элементу, если его нет и убирает, если есть
```js
firstElementWithSelector.toggleClass('myClass');
firstElementWithSelector.toggleClass('anotherClass');
console.log(firstElementWithSelector.dom.className); // 'myClass'
```
### .hasClass(className)
Проверяет, имеет ли элемент данный класс
```js
console.log(firstElementWithSelector.hasClass('myClass')); // true
```
### .setText(text)
Устанавливает переданный текст в текущий элемент/элементы
```js
firstElementWithSelector.setText('some text');
```
html-файл будет выглядеть так:
```html
<div class="myClass">some text</div>
```
### .css(changes)
Принимает объект с css-изменениями, которые необходимо произвести с элементом/элементами
```js
firstElementWithSelector.css({
	background: 'yellow',
	height: '100px'
});
```
### .addListener(event, func)
Добавляет event listener на элемент/элементы
```js
firstElementWithSelector.addListener('onclick', () => console.log('onclick listener!'));
```
### ChangeChains
API предоставляет возможность создавать цепочки из изменений:
```js
first('.testClassName')
  .addClass('someClass')
  .css({
	 background: 'yellow',
	 height: '100px'
  })
  .addListener('onclick', () => console.log('onclick listener!'));
```
