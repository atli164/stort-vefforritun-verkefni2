class videosSubPage {
  constructor() {
    this.container = document.querySelector('body');
    this.id = window.location.href.split('?id=')[1];
  }
  
  // Einhverskonar startup fall
  // Má copya úr aðalskjali þegar það er til
  load() {
  
  }
  
  // Aðalfall til að birta myndband ef það finnst
  display() {
  
  }

  // Fall sem birt er ef ekki tekst að ná í videos.json
  // Er einnig keyrt ef ekki finnst myndband með réttu id
  displayerror() {
    
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const video = new VideosSubPage();
  //video.load()
  // E-ð dót sem má copya úr aðalskjali seinna
})

