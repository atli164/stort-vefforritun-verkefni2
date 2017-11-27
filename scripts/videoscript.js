class VideosSubPage {
  constructor() {
    this.container = document.querySelector('body');
    [, this.id] = window.location.href.split('?id=');
  }

  load() {
    const videoID = this.id;
    let foundVideo = false;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = (function () {
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
      });
      xhr.onerror = reject;
      xhr.open('GET', 'videos.json');
      xhr.send();
    });
  }

  display(src) {
    if (!src) {
      this.displayerror();
    } else {
      const newHeader = document.createElement('h1');
      newHeader.classList.add('title');
      newHeader.appendChild(document.createTextNode(src.title));
      this.container.appendChild(newHeader);

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
      newButtonRewindImage.classList.add('controls__button__img');
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
      newButtonPlayImage.classList.add('controls__button__img');
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
      newButtonMuteImage.classList.add('controls__button__img');
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
      newButtonFullscreenImage.classList.add('controls__button__img');
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
      newButtonSkipImage.classList.add('controls__button__img');
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
      backlink.href = ('/index.html');
      backlink.innerHTML = 'Til baka';
      backDiv.appendChild(backlink);
      this.container.appendChild(backDiv);
    }
  }

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
    backlink.href = 'index.html';
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
        displayerror();
    });
});
