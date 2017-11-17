'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideosSubPage = function () {
  function VideosSubPage() {
    _classCallCheck(this, VideosSubPage);

    this.container = document.querySelector('body');

    // Hjálparbreyta til að vita hvenær overlay á að vera til staðar
    var _window$location$href = window.location.href.split('?id=');

    var _window$location$href2 = _slicedToArray(_window$location$href, 2);

    this.id = _window$location$href2[1];
    this.playing = false;
  }

  // Einhverskonar startup fall
  // Má copya úr aðalskjali þegar það er til


  _createClass(VideosSubPage, [{
    key: 'load',
    value: function load() {}

    // Hjálparfall sem togglar paused overlay

  }, {
    key: 'toggleOverlay',
    value: function toggleOverlay() {}

    // Aðalfall til að birta myndband ef það finnst
    // Inntak er source á vídeói

  }, {
    key: 'display',
    value: function display(src) {}

    // Fall sem birt er ef ekki tekst að ná í videos.json
    // Er einnig keyrt ef ekki finnst myndband með réttu id

  }, {
    key: 'displayerror',
    value: function displayerror() {
      var title = document.createElement('h1');
      title.classList.add('title');
      var titletext = document.createTextNode('Myndbandaleigan');
      title.appendChild(titletext);
      this.container.appendChild(titletext);
      var perror = document.createElement('p');
      perror.classList.add('error');
      var errortext = document.createTextNode('Vídeó fannst ekki!');
      perror.appendChild(errortext);
      this.container.appendChild(perror);
    }
  }]);

  return VideosSubPage;
}();

document.addEventListener('DOMContentLoaded', function () {
  var video = new VideosSubPage();
  // video.load()
  // E-ð dót sem má copya úr aðalskjali seinna
});
//# sourceMappingURL=videoscript.js.map