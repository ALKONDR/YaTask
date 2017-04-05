'use strict'

class MLF {
	constructor(dom) {
		this.all = dom instanceof NodeList;
		this._dom = this.all ? dom : [dom];
	}

	get dom() {
		return this.all ? this._dom : this._dom[0];
	}

	set dom(value) {
		this._dom = value;
	}

	addClass(className) {
		Array.prototype.forEach.call(this._dom, element => {
			element.className += ' ' + className;
		});

		return this;
	}

	removeClass(className) {
		Array.prototype.forEach.call(this._dom, element => {
			const elementClasses = element.className.split(' ');

			elementClasses.splice(elementClasses.indexOf(className), 1);
			element.className = elementClasses.join(' ');
		});

		return this;
	}

	toggleClass(className) {
		if (this.hasClass(className))
			this.removeClass(className)
		else
			this.addClass(className);

		return this;
	}

	hasClass(className) {
		let answer = true;

		Array.prototype.forEach.call(this._dom, element => {
			if (!element.className.split(' ').includes(className))
				answer = false;
		});

		return answer;
	}

	setText(text) {
		Array.prototype.forEach.call(this._dom, element => {
			element.textContent = text;
		});

		return this;
	}

	css(changes) {
		Array.prototype.forEach.call(this._dom, element => {
			Object.keys(changes).forEach(key => {
				element.style[key] = changes[key];
			});
		});

		return this;
	}

	addListener(listener, func) {
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
