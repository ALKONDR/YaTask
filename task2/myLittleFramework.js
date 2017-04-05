'use strict'

class MLF {
	constructor(dom, all = false) {
		this.all = all;
		this._dom = all ? dom : [dom];
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
			this.dom.className = elementClasses.join(' ');
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
}

const first = (selector) => new MLF(document.querySelector(selector));

const all = (selector) => new MLF(document.querySelectorAll(selector), true);



//************************************************
//--------------------TESTING---------------------
//************************************************


const mlfEl = first('.testClassName').addClass('someClass');
console.dir(mlfEl.dom);


mlfEl.removeClass('testClassName').addClass('oneMoreClass');
console.log(mlfEl.dom);

console.log(mlfEl.hasClass('meClass'));

mlfEl.setText('some text');

mlfEl.css({
	background: 'yellow',
	height: '100px'
});

const anotherEl = all('.multipleElements');
anotherEl.toggleClass('superClass');
console.log(anotherEl.dom);

anotherEl.setText('another text');
