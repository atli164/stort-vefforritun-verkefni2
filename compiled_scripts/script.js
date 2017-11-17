'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideosMainPage = function () {
  function VideosMainPage() {
    _classCallCheck(this, VideosMainPage);

    this.container = document.querySelector('body');
  }

  // Einhverskonar startup fall


  _createClass(VideosMainPage, [{
    key: 'load',
    value: function load() {
      // Dæmi um hvernig mætti nota hrátt callback. Skil eftir ef ske kynni
      // við vildum frekar nota það.
      /*  const request = new XMLHttpRequest();
        request.open('GET', 'videos.json', true);
        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
              const data = JSON.parse(request.response);
            console.log(data);
          } else {
            console.error('Villa', request);
          }
        };
          request.onerror = function() {
          console.error('Óþekkt villa');
        };
          request.send();
      */

      // Dæmi #2 um hvernig hægt er að ná í JSON gögn með asynchronous hætti,
      // í þetta sinn með promises. Aðeins ítarlegra en það sem ég endaði á að
      // nota, skil það eftir ef við endum á að vilja frekar nota þessa aðferð.
      /*
        var request = new Request('videos.json', { method: 'GET' });
        fetch(request)
          .then(function(response) {
            if (response.status === 200) {
              return response.json();
            }
            throw new Error('Something went wrong on api server!');
          })
          .then(function(response) {
            // console.log(response);
            return response;
          })
          .catch(function(error) {
            console.error(error);
          });
       */

      //Þessi arrow function virðist virka ...
      return new Promise(function (resolve, reject) {
        //return new Promise(function (resolve, reject) {

        var xhr = new XMLHttpRequest();

        //...en þessi arrow function brýtur hleðslu á JSON, mögulega eitthvað
        //að gera með scope á this í this.response (sem arrow functions hræra í)
        //xhr.onload = () => {

        //Notum lambda tímabundið í staðinn.
        xhr.onload = function () {
          resolve(JSON.parse(this.response));
        };
        xhr.onerror = reject;
        xhr.open('GET', 'videos.json');
        xhr.send();
      });
    }

    // Throwaway fall til að sýna hvernig við náum gögnum úr asynchronous
    // promise til að vinna svo með gögnin

  }, {
    key: 'proofOfConcept',
    value: function proofOfConcept(parsedResults) {
      // console.log(parsedResults);
      this.proofTwo(parsedResults);
    }

    // Annað throwaway til að sýna hvernig við hendum gögnum milli falla.

  }, {
    key: 'proofTwo',
    value: function proofTwo(parse) {
      console.log(parse);
    }

    // Fall sem tekur við created tíma og spýtir út aldursstreng

  }, {
    key: 'parseAge',
    value: function parseAge(created) {
      var date = new Date(created);
      var now = new Date();
      var year = 365 * 24 * 60 * 60 * 1000;
      if (now - date >= year) {
        var years = (now - date) / year;
        if (years === 1) {
          return 'Fyrir 1 ári síðan';
        }
        return 'Fyrir '.concat(toString(years), ' árum síðan');
      }
      var month = 30 * 24 * 60 * 60 * 1000;
      if (now - date >= month) {
        var months = (now - date) / month;
        if (months === 1) {
          return 'Fyrir 1 mánuði síðan';
        }
        return 'Fyrir '.concat(toString(months), ' mánuðum síðan');
      }
      var week = 7 * 24 * 60 * 60 * 1000;
      if (now - date >= week) {
        var weeks = (now - date) / week;
        if (weeks === 1) {
          return 'Fyrir 1 viku síðan';
        }
        return 'Fyrir '.concat(toString(weeks), ' vikum síðan');
      }
      var day = 24 * 60 * 60 * 1000;
      if (now - date > day) {
        var days = (now - date) / day;
        if (days === 1) {
          return 'Fyrir 1 degi síðan';
        }
        return 'Fyrir '.concat(toString(days), ' dögum síðan');
      }
      var hour = 60 * 60 * 1000;
      var hours = (now - date) / hour;
      if (hours === 0) {
        return 'Fyrir minna en klukkustund síðan';
      } else if (hours === 1) {
        return 'Fyrir 1 klukkustund síðan';
      }
      return 'Fyrir '.concat(toString(hours), ' klukkustundum síðan');
    }

    // Fall sem tekur við duration of spýtir út lengdarstreng

  }, {
    key: 'parseDur',
    value: function parseDur(duration) {
      var min = duration / 60;
      var sec = duration % 60;
      return toString(min).concat(':', toString(sec));
    }

    // Fall sem býr til eitt div utan um vídeo með aldri, tíma, titli etc.
    // Kalla þarf á parseföll utan þess falls, þetta tekur við parsed gildum

  }, {
    key: 'createVideoElement',
    value: function createVideoElement(id, title, dur, age, poster) {
      var newbox = document.createElement('a');
      newbox.classList.add('videobox');
      newbox.href = '/video.html/?id='.concat(toString(id));
      var thumb = document.createElement('img');
      thumb.classList.add('videobox__img');
      thumb.src = poster;
      newbox.appendChild(thumb);
      var ptime = document.createElement('p');
      ptime.classList.add('videobox__time');
      var ptimetext = document.createTextNode(dur);
      ptime.appendChild(ptimetext);
      newbox.appendChild(ptime);
      var ptitle = document.createElement('p');
      ptitle.classList.add('videobox__title');
      var ptitletext = document.createTextNode(title);
      ptitle.appendChild(ptitletext);
      newbox.appendChild(ptitle);
      var page = document.createElement('p');
      page.classList.add('videobox__age');
      var pagetext = document.createTextNode(age);
      page.appendChild(pagetext);
      newbox.appendChild(page);
      return newbox;
    }

    // Grunnfall sem tekur parsaða JSON skrána og fer að deila því
    // út í myndbandsflokka og einstaka vídeó.

  }, {
    key: 'parse',
    value: function parse(data) {
      var _this = this;

      var videos = {};
      data.videos.forEach(function (video) {
        var parsedObj = {};
        parsedObj.id = video.id;
        parsedObj.title = video.title;
        parsedObj.age = _this.parseAge(video.created);
        parsedObj.length = _this.parseDur(video.duration);
        parsedObj.thumb = video.poster;
        videos[video.id] = parsedObj;
      });
      data.categories.forEach(function (category) {
        var catBox = document.createElement('section');
        catBox.classList.add('videocat');
        var catBoxTitle = document.createElement('h2');
        catBoxTitle.classList.add('videocat__title');
        var actualTitle = document.createTextNode(category.title);
        catBoxTitle.appendChild(actualTitle);
        catBox.appendChild(catBoxTitle);
        category.videos.forEach(function (video) {
          var cv = videos[video];
          catBox.appendChild(_this.createVideoElement(cv.id, cv.title, cv.length, cv.dur, cv.thumb));
        });

        _this.container.appendChild(catBox);
      });
    }
  }]);

  return VideosMainPage;
}();

document.addEventListener('DOMContentLoaded', function () {
  var videos = new VideosMainPage();

  videos.load().then(function (result) {
    // videos.proofOfConcept(result);
    console.log(result);
    videos.parse(result);
  }).catch(function () {
    // Bregðast við villu hérna.
  });
});
//# sourceMappingURL=script.js.map