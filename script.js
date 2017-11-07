class videosMainPage {
  //Einhverskonar startup fall
  load() {
  
  }

  //Fall sem tekur við created tíma og spýtir út aldursstreng
  parseAge(created) {
    
  }

  //Fall sem tekur við duration of spýtir út lengdarstreng
  parseDur(duration) {
  
  }
  
  //Fall sem býr til eitt div utan um vídeo með aldri, tíma, titli etc.
  createVideoElement(id, title, dur, age, poster) {
  
  }

  //Fall sem býr til div utan um myndbandsflokk, kallar í createVideoElement
  createVideoCategory() {
  
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const videos = new videosMainPage();
  videosMainPage.load();
})
