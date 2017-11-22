'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideosSubPage = function () {
          function VideosSubPage() {
                    _classCallCheck(this, VideosSubPage);

                    this.container = document.querySelector('body');

                    var _window$location$href = window.location.href.split('?id=');

                    var _window$location$href2 = _slicedToArray(_window$location$href, 2);

                    this.id = _window$location$href2[1];
          }

          // Einhverskonar startup fall
          // Má copya úr aðalskjali þegar það er til


          _createClass(VideosSubPage, [{
                    key: 'load',
                    value: function load() {
                              var videoID = this.id;
                              var foundVideo = false;
                              return new Promise(function (resolve, reject) {
                                        var xhr = new XMLHttpRequest();
                                        xhr.onload = function () {
                                                  var response = JSON.parse(this.response);
                                                  var videoArray = response.videos;
                                                  for (var i = 0; i < videoArray.length; i++) {
                                                            //Förum varlega; === gerir ekkert type conversion og virkar ekki,
                                                            //en == virkar hins vegar rétt.
                                                            if (videoArray[i].id == videoID) {
                                                                      foundVideo = true;
                                                                      resolve(videoArray[i]);
                                                            }
                                                  }
                                                  if (!foundVideo) {
                                                            //Ekkert vídeó með þessu id fannst. Ath. að við erum bara að gera
                                                            //eitt hérna: Lesa úr JSON skrá. Ef það gekk þá skilum við
                                                            //resolve, jafnvel þó vídeóið hafi ekki fundist í skránni.
                                                            //Við þurfum þ.afl. að bregðast við því *annars staðar* ef
                                                            //við gátum opnað JSON en fundum ekkert vídeó með þessu ID.
                                                            //Gerum það í display().
                                                            resolve(null);
                                                  }
                                        };
                                        xhr.onerror = reject;
                                        xhr.open('GET', 'videos.json');
                                        xhr.send();
                              });
                    }

                    // Aðalfall til að birta myndband ef það finnst
                    // Inntak er source á vídeói
                    // HD: Breytti aðeins. Við þurfum að birta titil, poster ofl.,
                    // svo ef þetta er aðalfallið verður src að vera ekki bara
                    // slóðin á .mp4 skrána, heldur video hlutur með allar þessar upplýsingar.

          }, {
                    key: 'display',
                    value: function display(src) {

                              if (!src) {
                                        this.displayerror();
                                        //Viljum við hætta hér með "return;" ?
                              } else {
                                        //Skellum upp elementum með myndbandinu:

                                        var newHeader = document.createElement('h1');
                                        newHeader.classList.add('title');
                                        newHeader.appendChild(document.createTextNode(src.title));
                                        this.container.appendChild(newHeader);

                                        var newVideo = document.createElement('video');
                                        newVideo.classList.add('mainvideo');

                                        var newSource = document.createElement('source');
                                        newSource.classList.add('videosource');
                                        newSource.src = src.video;
                                        newVideo.appendChild(newSource);

                                        //HD: Eftirfarandi kóði lætur allt hverfa. Er annað hvort rangur hjá mér, eða
                                        //þarf CSS stílbrögð sem ákveða hvað sést og hvað ekki.
                                        /*
                                                  const newPoster = document.createElement('img');
                                                  newPoster.classList.add('overlay');
                                                  newPoster.src = src.poster;
                                                  newVideo.appendChild(newPoster);
                                                  const newPlayButton = document.createElement('img');
                                                  newPlayButton.classList.add('overlay__play');
                                                  //Varúð, harðkóðað. Gætum líka þurft að parsa .svg skrána eitthvað
                                                  newPlayButton.src = './images/play.svg';
                                                  newVideo.appendChild(newPlayButton);
                                        */

                                        this.container.appendChild(newVideo);

                                        var newControlDiv = document.createElement('div');
                                        newControlDiv.classList.add('controls');

                                        var newButtonRewind = document.createElement('button');
                                        newButtonRewind.classList.add('controls__button');
                                        newButtonRewind.id = 'rewind';
                                        var newButtonRewindImage = document.createElement('img');
                                        newButtonRewindImage.src = './images/back.svg';
                                        newButtonRewind.appendChild(newButtonRewindImage);
                                        newControlDiv.appendChild(newButtonRewind);

                                        newButtonRewind.addEventListener('click', function () {
                                                  var currentTime = newVideo.currentTime;
                                                  if (currentTime <= 3) {
                                                            newVideo.currentTime = 0;
                                                  } else {
                                                            newVideo.currentTime -= 3;
                                                  }
                                        });

                                        var newButtonPlay = document.createElement('button');
                                        newButtonPlay.classList.add('controls__button');
                                        newButtonPlay.id = 'playpause';
                                        var newButtonPlayImage = document.createElement('img');
                                        newButtonPlayImage.src = './images/play.svg';
                                        newButtonPlay.appendChild(newButtonPlayImage);
                                        newControlDiv.appendChild(newButtonPlay);

                                        newButtonPlay.addEventListener('click', function () {
                                                  if (newVideo.paused) {
                                                            newButtonPlayImage.src = './images/pause.svg';
                                                            newVideo.play();
                                                  } else {
                                                            newButtonPlayImage.src = './images/play.svg';
                                                            newVideo.pause();
                                                  }
                                        });

                                        var newButtonMute = document.createElement('button');
                                        newButtonMute.classList.add('controls__button');
                                        newButtonMute.id = 'mute';
                                        var newButtonMuteImage = document.createElement('img');
                                        newButtonMuteImage.src = './images/mute.svg';
                                        newButtonMute.appendChild(newButtonMuteImage);
                                        newControlDiv.appendChild(newButtonMute);

                                        newButtonMute.addEventListener('click', function () {
                                                  newVideo.muted = !newVideo.muted;
                                        });

                                        var newButtonFullscreen = document.createElement('button');
                                        newButtonFullscreen.classList.add('controls__button');
                                        newButtonFullscreen.id = 'fullscreen';
                                        var newButtonFullscreenImage = document.createElement('img');
                                        newButtonFullscreenImage.src = './images/fullscreen.svg';
                                        newButtonFullscreen.appendChild(newButtonFullscreenImage);
                                        newControlDiv.appendChild(newButtonFullscreen);

                                        newButtonFullscreen.addEventListener('click', function () {
                                                  var requestFullScreen = newVideo.requestFullscreen || newVideo.msRequestFullscreen || newVideo.mozRequestFullScreen || newVideo.webkitRequestFullscreen;

                                                  requestFullScreen.call(newVideo);
                                        });

                                        var newButtonSkip = document.createElement('button');
                                        newButtonSkip.classList.add('controls__button');
                                        newButtonSkip.id = 'skip';
                                        var newButtonSkipImage = document.createElement('img');
                                        newButtonSkipImage.src = './images/next.svg';
                                        newButtonSkip.appendChild(newButtonSkipImage);
                                        newControlDiv.appendChild(newButtonSkip);

                                        newButtonSkip.addEventListener('click', function () {
                                                  var timeLeft = newVideo.duration - newVideo.currentTime;
                                                  console.log(timeLeft);
                                                  if (timeLeft <= 3) {
                                                            newVideo.currentTime = newVideo.duration;
                                                  } else {
                                                            newVideo.currentTime += 3;
                                                  }
                                        });

                                        this.container.appendChild(newControlDiv);

                                        var backDiv = document.createElement('div');
                                        backDiv.classList.add('backdiv');
                                        var backlink = document.createElement('a');
                                        backlink.classList.add('backlink');
                                        //Gætum notað eftirfarandi, en getum ekki endilega treyst því, þar sem
                                        //history í sumum browsers getur líka innihaldið smellina á vídeó takkana.
                                        //backlink.href = 'javascript:history.back()');
                                        //Notum því einfaldlega þetta í staðinn:
                                        backlink.href = '/index.html';
                                        backDiv.appendChild(backlink);
                                        this.container.appendChild(backDiv);
                              }
                    }

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
                              var backDiv = document.createElement('div');
                              backDiv.classList.add('backdiv');
                              var backlink = document.createElement('a');
                              backlink.classList.add('backlink');
                              //Gætum notað eftirfarandi, en getum ekki endilega treyst því, þar sem
                              //history í sumum browsers getur líka innihaldið smellina á vídeó takkana.
                              //backlink.href = 'javascript:history.back()');
                              //Notum því einfaldlega þetta í staðinn:
                              backlink.href = '/index.html';
                              backDiv.appendChild(backlink);
                              this.container.appendChild(backDiv);
                    }
          }]);

          return VideosSubPage;
}();

document.addEventListener('DOMContentLoaded', function () {
          var video = new VideosSubPage();
          video.load().then(function (result) {
                    video.display(result);
          }).catch(function () {
                    // Bregðast við villu hérna.
                    //ATH: Villa virðist koma upp sama hvað, svo ég kommenta út
                    // displayerror fallið þar til við getum leyst þetta - annars
                    // strokar það alltaf allt út af skjánum jafnvel ef vídeóið fannst.
                    //video.displayerror();
          });
});
//# sourceMappingURL=videoscript.js.map