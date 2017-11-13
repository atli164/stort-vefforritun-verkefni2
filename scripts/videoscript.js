class VideosSubPage {
  constructor() {
    this.container = document.querySelector('body');
    [, this.id] = window.location.href.split('?id=');
  }

  // Einhverskonar startup fall
  // Má copya úr aðalskjali þegar það er til
  load() {

  }

  // Aðalfall til að birta myndband ef það finnst
  // Inntak er source á vídeói
  display(src) {

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
  // video.load()
  // E-ð dót sem má copya úr aðalskjali seinna
});

