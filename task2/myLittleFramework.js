'use strict'

class MLF {
	constructor(dom) {
		this.all = dom instanceof NodeList;
		this._dom = this.all ? dom : [dom];
	}

	/**
	 * dom element(s)
	 * @return {[dom element]} [changed dom element(s) with given selector]
	 */
	get dom() {
		return this.all ? this._dom : this._dom[0];
	}

	/**
	 * sets dom property with the given value
	 */
	set dom(value) {
		this._dom = value;
	}

	/**
	 * adds class to the dom element(s)
	 * @param {[string]} className [class to add]
	 */
	addClass(className) {
		Array.prototype.forEach.call(this._dom, element => {
			element.className += ' ' + className;
		});

		return this;
	}

	/**
	 * removes the given class of the dom element
	 * @param  {[string]} className [class to remove]
	 */
	removeClass(className) {
		Array.prototype.forEach.call(this._dom, element => {
			const elementClasses = element.className.split(' ');

			elementClasses.splice(elementClasses.indexOf(className), 1);
			element.className = elementClasses.join(' ');
		});

		return this;
	}

	/**
	 * toggles the given class of the dom element
	 * @param  {[type]} className [description]
	 */
	toggleClass(className) {
		if (this.hasClass(className))
			this.removeClass(className)
		else
			this.addClass(className);

		return this;
	}

	/**
	 * check if the dom element has the given class
	 * @param  {[string]}  className [class to check]
	 * @return {Boolean}           [if the dom element has the given class]
	 */
	hasClass(className) {
		let answer = true;

		Array.prototype.forEach.call(this._dom, element => {
			if (!element.className.split(' ').includes(className))
				answer = false;
		});

		return answer;
	}

	/**
	 * sets the given text to the dom element
	 * @param {[string]} text [text to set]
	 */
	setText(text) {
		Array.prototype.forEach.call(this._dom, element => {
			element.textContent = text;
		});

		return this;
	}

	/**
	 * changes css of the dom element
	 * @param  {[object]} changes [css styles object]
	 */
	css(changes) {
		Array.prototype.forEach.call(this._dom, element => {
			Object.keys(changes).forEach(key => {
				element.style[key] = changes[key];
			});
		});

		return this;
	}

	/**
	 * sets given function on the given event
	 * @param {[event]} event [event to check]
	 * @param {[function]} func     [function to set]
	 */
	addListener(event, func) {
		Array.prototype.forEach.call(this._dom, element => {
			element[listener] = func;
		});

		return this;
	}
}

// returns first element with given selector
const first = (selector) => new MLF(document.querySelector(selector));

// returns all elements with given selectors
const all = (selector) => new MLF(document.querySelectorAll(selector));
