class videosMainPage {

  //Einhverskonar startup fall
  load() {

      //let container = document.createElement('div');
      //empty(container);
      //container.appendChild(document.createTextNode('Sæki gögn...'));
      //document.appendChild(this.container);


      const request = new XMLHttpRequest();

      request.open('GET', 'videos.json', true);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          const data = JSON.parse(request.response);

         console.log(data);


        } else {
          console.error('Villa', request);
          //empty(container);
          //container.appendChild(document.createTextNode('Villa kom upp'));
        }
      };

      request.onerror = function() {
        console.error('Óþekkt villa');
        //empty(container);
        //container.appendChild(document.createTextNode('Villa kom upp'));
      };

      request.send();

    }

    empty(el) {
     while (el.firstChild) {
       el.removeChild(el.firstChild);
        }
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
      console.log(data);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const videos = new videosMainPage();
  //videosMainPage.load();
  videos.load();
})
