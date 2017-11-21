class VideosSubPage {
  constructor() {
    this.container = document.querySelector('body');
    [, this.id] = window.location.href.split('?id=');
  }

  // Einhverskonar startup fall
  // Má copya úr aðalskjali þegar það er til
  load() {
    const videoID = this.id;
    let foundVideo = false;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
          const response = JSON.parse(this.response);
          const videoArray = response.videos;
          for(let i = 0; i < videoArray.length; i++) {
              //Förum varlega; === gerir ekkert type conversion og virkar ekki,
              //en == virkar hins vegar rétt.
              if(videoArray[i].id == videoID) {
                foundVideo = true;
                resolve(videoArray[i]);
              }
          }
          if(!foundVideo) {
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
  display(src) {

      if(!src){
          this.displayerror();
          //Viljum við hætta hér með "return;" ?
      }
      else {
          //Skellum upp elementum með myndbandinu:

          const newHeader = document.createElement('h1');
          newHeader.classList.add('title');
          newHeader.appendChild(document.createTextNode(src.title));
          this.container.appendChild(newHeader);

          const newVideo = document.createElement('video');
          newVideo.classList.add('mainvideo');

          const newSource = document.createElement('source');
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

          const newControlDiv = document.createElement('div');
          newControlDiv.classList.add('controls');

          const newButtonRewind = document.createElement('button');
          newButtonRewind.classList.add('controls__button');
          newButtonRewind.id = 'rewind';
          const newButtonRewindImage = document.createElement('img');
          newButtonRewindImage.src = './images/back.svg';
          newButtonRewind.appendChild(newButtonRewindImage);
          newControlDiv.appendChild(newButtonRewind);

          newButtonRewind.addEventListener('click', function () {
              const currentTime = newVideo.currentTime;
              if(currentTime <= 3){
                  newVideo.currentTime = 0;
              } else {
                  newVideo.currentTime -= 3;
              }
          });

          const newButtonPlay = document.createElement('button');
          newButtonPlay.classList.add('controls__button');
          newButtonPlay.id = 'playpause';
          const newButtonPlayImage = document.createElement('img');
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

          const newButtonMute = document.createElement('button');
          newButtonMute.classList.add('controls__button');
          newButtonMute.id = 'mute';
          const newButtonMuteImage = document.createElement('img');
          newButtonMuteImage.src = './images/mute.svg';
          newButtonMute.appendChild(newButtonMuteImage);
          newControlDiv.appendChild(newButtonMute);

          newButtonMute.addEventListener('click', function () {
              newVideo.muted = !(newVideo.muted);
          });

          const newButtonFullscreen = document.createElement('button');
          newButtonFullscreen.classList.add('controls__button');
          newButtonFullscreen.id = 'fullscreen';
          const newButtonFullscreenImage = document.createElement('img');
          newButtonFullscreenImage.src = './images/fullscreen.svg';
          newButtonFullscreen.appendChild(newButtonFullscreenImage);
          newControlDiv.appendChild(newButtonFullscreen);

          newButtonFullscreen.addEventListener('click', function () {
              const requestFullScreen = newVideo.requestFullscreen
                || newVideo.msRequestFullscreen
                || newVideo.mozRequestFullScreen
                || newVideo.webkitRequestFullscreen;

              requestFullScreen.call(newVideo);
          });

          const newButtonSkip = document.createElement('button');
          newButtonSkip.classList.add('controls__button');
          newButtonSkip.id = 'skip';
          const newButtonSkipImage = document.createElement('img');
          newButtonSkipImage.src = './images/next.svg';
          newButtonSkip.appendChild(newButtonSkipImage);
          newControlDiv.appendChild(newButtonSkip);

          newButtonSkip.addEventListener('click', function () {
              const timeLeft = newVideo.duration - newVideo.currentTime;
              console.log(timeLeft);
              if(timeLeft <= 3){
                  newVideo.currentTime = newVideo.duration;
              } else {
                  newVideo.currentTime += 3;
              }
          });
          this.container.appendChild(newControlDiv);
      }
  }

  // Fall sem birt er ef ekki tekst að ná í videos.json
  // Er einnig keyrt ef ekki finnst myndband með réttu id
  displayerror() {
    const title = document.createElement('h1');
    title.classList.add('title');
    const titletext = document.createTextNode('Myndbandaleigan');
    title.appendChild(titletext);
    this.container.appendChild(titletext);
    const perror = document.createElement('p');
    perror.classList.add('error');
    const errortext = document.createTextNode('Vídeó fannst ekki!');
    perror.appendChild(errortext);
    this.container.appendChild(perror);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const video = new VideosSubPage();
  video.load()
    .then((result) => {
      video.display(result);
    })
    .catch(() => {
      // Bregðast við villu hérna.
      //ATH: Villa virðist koma upp sama hvað, svo ég kommenta út
      // displayerror fallið þar til við getum leyst þetta - annars
      // strokar það alltaf allt út af skjánum jafnvel ef vídeóið fannst.
      //video.displayerror();
    });
});
