// mlfEl.css({
// 	background: 'yellow',
// 	height: '100px'
// });

// mlfEl.addListener('onclick', () => console.log('onclick listener!'));

// const anotherEl = all('.multipleElements');
// anotherEl.toggleClass('superClass');
// console.log(anotherEl.dom);

// anotherEl.setText('another text');

const htmlToAdd = `<div class="testClassName"></div> 

  <div class="anotherClassName"></div>

  <div class="oneClass twoClass threeClass"></div>

  <div class="multipleElements"></div>
  <div class="multipleElements"></div>
  <div class="multipleElements"></div>
  <div class="multipleElements"></div>
  <div class="multipleElements"></div>

  <script src='myLittleFramework.js'></script>
  <script src='examples.js'></script>`;

document.body.innerHTML = htmlToAdd;

describe('MLF', function() {
  describe('addClass', function() {
    it('should add class', function() {
      assert.equal(first('.testClassName').addClass('someClass').dom.className, 'testClassName someClass');
    });
  });
});

describe('MLF', function() {
  describe('removeClass', function() {
    it('should remove class', function() {
      assert.equal(first('.testClassName').removeClass('testClassName').dom.className, 'someClass');
    });
  })
});

describe('MLF', function() {
  describe('hasClass', function() {
    it('should be true', function() {
      assert.equal(first('.someClass').hasClass('someClass'), true);
    });
  })
});

describe('MLF', function() {
  describe('setText', function() {
    it('should set text in the element', function() {
      assert.equal(first('.someClass').setText('some text').dom.textContent, 'some text');
    });
  });
});

describe('MLF', function() {
  describe('toggleClass', function() {
    it('should remove someClass from the element', function() {
      assert.equal(first('.someClass').toggleClass('someClass').dom.className, '');
    });
  });
});

describe('MLF', function() {
  describe('toggleClass', function() {
    it('should add someClass to the element', function() {
      assert.equal(first('.anotherClassName').toggleClass('someClass').dom.className, 'anotherClassName someClass');
    });
  });
});