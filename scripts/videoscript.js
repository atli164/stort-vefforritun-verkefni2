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
      // TODO: Binda þetta einhvernveginn svo skipta út megi
      // function () fyrir () =>, ef það er gert núna breakar allt
      xhr.onload = function () {
        const response = JSON.parse(this.response);
        const videoArray = response.videos;
        for (let i = 0; i < videoArray.length; i += 1) {
          if (videoArray[i].id === parseInt(videoID, 10)) {
            foundVideo = true;
            resolve(videoArray[i]);
          }
        }
        if (!foundVideo) {
          resolve(null);
        }
      };
      xhr.onerror = reject;
      xhr.open('GET', 'videos.json');
      xhr.send();
    });
  }

  display(src) {
    if (!src) {
      this.displayerror();
    } else {
      // Skellum upp elementum með myndbandinu:
      const newHeader = document.createElement('h1');
      newHeader.classList.add('title');
      newHeader.appendChild(document.createTextNode(src.title));
      this.container.appendChild(newHeader);

      // Prufa: Gætum þurft að nota position:absolute og :relative til að
      // z-index virki á play takkann - en þá þurfum við að troða vídeóinu inn
      // í div svo það eyðileggi ekki fyrir flex flæðinu á öllum öðrum elementum
      // síðunnar
      const newVideoDiv = document.createElement('div');
      newVideoDiv.classList.add('mainvideodiv');


      const newVideo = document.createElement('video');
      newVideo.classList.add('mainvideo');
      newVideo.poster = src.poster;

      const newSource = document.createElement('source');
      newSource.classList.add('videosource');
      newSource.src = src.video;
      newVideo.appendChild(newSource);

      const overlayDiv = document.createElement('div');
      overlayDiv.classList.add('overlay');
      overlayDiv.classList.add('overlay--grey');

      const pauseImg = document.createElement('img');
      pauseImg.classList.add('overlay__play');
      pauseImg.src = './images/play.svg';
      overlayDiv.appendChild(pauseImg);
      newVideoDiv.appendChild(overlayDiv);

      newVideoDiv.appendChild(newVideo);
      this.container.appendChild(newVideoDiv);

      const newControlDiv = document.createElement('div');
      newControlDiv.classList.add('controls');

      const newButtonRewind = document.createElement('button');
      newButtonRewind.classList.add('controls__button');
      newButtonRewind.id = 'rewind';
      const newButtonRewindImage = document.createElement('img');
      newButtonRewindImage.src = './images/back.svg';
      newButtonRewind.appendChild(newButtonRewindImage);
      newControlDiv.appendChild(newButtonRewind);

      newButtonRewind.addEventListener('click', () => {
        const { currentTime: curTime } = newVideo;
        if (curTime <= 3) {
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

      newButtonPlay.addEventListener('click', () => {
        if (newVideo.paused) {
          newButtonPlayImage.src = './images/pause.svg';
          newVideo.play();
          overlayDiv.classList.remove('overlay--grey');
          pauseImg.classList.add('--hidden');
        } else {
          newButtonPlayImage.src = './images/play.svg';
          newVideo.pause();
          pauseImg.classList.remove('--hidden');
          overlayDiv.classList.add('overlay--grey');
        }
      });

      pauseImg.addEventListener('click', () => {
        if (newVideo.paused) {
          pauseImg.classList.add('--hidden');
          overlayDiv.classList.remove('overlay--grey');
          newVideo.play();
          newButtonPlayImage.src = './images/pause.svg';
        } else {
          newVideo.pause();
          pauseImg.classList.remove('--hidden');
          overlayDiv.classList.add('overlay--grey');
          newButtonPlayImage.src = './images/play.svg';
        }
      });

      const newButtonMute = document.createElement('button');
      newButtonMute.classList.add('controls__button');
      newButtonMute.id = 'mute';
      const newButtonMuteImage = document.createElement('img');
      newButtonMuteImage.src = './images/mute.svg';
      newButtonMute.appendChild(newButtonMuteImage);
      newControlDiv.appendChild(newButtonMute);

      newButtonMute.addEventListener('click', () => {
        newVideo.muted = !(newVideo.muted);
      });

      const newButtonFullscreen = document.createElement('button');
      newButtonFullscreen.classList.add('controls__button');
      newButtonFullscreen.id = 'fullscreen';
      const newButtonFullscreenImage = document.createElement('img');
      newButtonFullscreenImage.src = './images/fullscreen.svg';
      newButtonFullscreen.appendChild(newButtonFullscreenImage);
      newControlDiv.appendChild(newButtonFullscreen);

      newButtonFullscreen.addEventListener('click', () => {
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

      newButtonSkip.addEventListener('click', () => {
        const timeLeft = newVideo.duration - newVideo.currentTime;
        if (timeLeft <= 3) {
          newVideo.currentTime = newVideo.duration;
        } else {
          newVideo.currentTime += 3;
        }
      });

      this.container.appendChild(newControlDiv);

      const backDiv = document.createElement('div');
      backDiv.classList.add('backdiv');
      const backlink = document.createElement('a');
      backlink.classList.add('backlink');
      // Gætum notað eftirfarandi, en getum ekki endilega treyst því, þar sem
      // history í sumum browsers getur líka innihaldið smellina á vídeó takkana.
      // backlink.href = 'javascript:history.back()');
      // Notum því einfaldlega þetta í staðinn:
      backlink.href = ('/index.html');
      backlink.innerHTML = 'Til baka';
      backDiv.appendChild(backlink);
      this.container.appendChild(backDiv);
    }
  }

  // Fall sem birt er ef ekki tekst að ná í videos.json
  // Er einnig keyrt ef ekki finnst myndband með réttu id
  displayerror() {
    const title = document.createElement('h1');
    title.classList.add('title');
    const titletext = document.createTextNode('Myndbandaleigan');
    title.appendChild(titletext);
    this.container.appendChild(title);
    const perror = document.createElement('p');
    perror.classList.add('videoerror');
    const errortext = document.createTextNode('Vídeó er ekki til');
    perror.appendChild(errortext);
    this.container.appendChild(perror);
    const backDiv = document.createElement('div');
    backDiv.classList.add('backdiv');
    const backlink = document.createElement('a');
    backlink.classList.add('backlink');
    // Gætum notað eftirfarandi, en getum ekki endilega treyst því, þar sem
    // history í sumum browsers getur líka innihaldið smellina á vídeó takkana.
    // backlink.href = 'javascript:history.back()');
    // Notum því einfaldlega þetta í staðinn:
    backlink.href = ('/index.html');
    backlink.innerHTML = 'Til baka';
    backDiv.appendChild(backlink);
    this.container.appendChild(backDiv);
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
      // ATH: Villa virðist koma upp sama hvað, svo ég kommenta út
      // displayerror fallið þar til við getum leyst þetta - annars
      // strokar það alltaf allt út af skjánum jafnvel ef vídeóið fannst.
      // video.displayerror();
    });
});
