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

		return this;
	}

	hasClass(className) {
		return this.dom.className.includes(className);
	}

	css(changes) {
		
		return this;
	}
}

const first = (selector) => new MLF(document.querySelector(selector));

const all = (selector) => new MLF(document.querySelectorAll(selector), true);



//************************************************
//--------------------TESTING---------------------
//************************************************

const mlfEl = first('.testClassName').addClass('someClass');
console.log(mlfEl.dom);


mlfEl.removeClass('testClassName').addClass('oneMoreClass');
console.log(mlfEl.dom);

// console.log(mlfEl.hasClass('someClass'));

// const another = all('.multipleElements');
// another.addClass('superClass');
// console.log(another.dom);
