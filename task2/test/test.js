
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

describe('MLF', function() {
  describe('css', function() {
    it('should change css properties', function() {
      const cssProps = {
        color: 'yellow',
        height: '100px'
      };
      assert.equal(first('.anotherClassName').css(cssProps).dom.style['height'], '100px');
      assert.equal(first('.anotherClassName').dom.style['color'], 'yellow');
    });
  });
});

describe('MLF', function() {
  describe('addListener', function() {
    it('should add onclick listener', function() {
      const func = () => { console.log('event listener'); };
      assert.equal(first('.anotherClassName').addListener('onclick', func).dom.onclick, func);
    });
  });
});