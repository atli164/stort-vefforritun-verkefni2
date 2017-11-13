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
    const date = new Date(created);
    const now = new Date();
    const year = 365 * 24 * 60 * 60 * 1000;
    if(now - date >= year) {
      const years = (now - date) / year;
      if(years == 1) {
        return "Fyrir 1 ári síðan";
      } else {
        return "Fyrir " + to_string(years) + " árum síðan";
      }
    }
    const month = 30 * 24 * 60 * 60 * 1000;
    if(now - date >= month) {
      const months = (now - date) / months;
      if(months == 1) {
        return "Fyrir 1 mánuði síðan";
      } else {
        return "Fyrir " + to_string(months) + " mánuðum síðan";
      }
    }
    const week = 7 * 24 * 60 * 60 * 1000;
    if(now - date >= week) {
      const weeks = (now - date) / week;
      if(weeks == 1) {
        return "Fyrir 1 viku síðan";
      } else {
        return "Fyrir " + to_string(weeks) + " vikum síðan";
      }
    }
    const day = 24 * 60 * 60 * 1000;
    if(now - date > day) {
      const days = (now - date) / day;
      if(days == 1) {
        return "Fyrir 1 degi síðan";
      } else {
        return "Fyrir " + to_string(days) + " dögum síðan";
      }
    }
    const hour = 60 * 60 * 1000;
    const hours = (now - date) / hour;
    if(hours == 0) {
      return "Fyrir minna en klukkustund síðan";
    } else if(hours == 1) {
      return "Fyrir 1 klukkustund síðan";
    } else {
      return "Fyrir " + to_string(hours) + " klukkustundum síðan";
    }
  }

  //Fall sem tekur við duration of spýtir út lengdarstreng
  parseDur(duration) {
    const min = duration / 60;
    const sec = duration % 60;
    return to_string(min) + ':' + to_string(sec);
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
