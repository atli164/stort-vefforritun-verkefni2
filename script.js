class videosMainPage {

  //Einhverskonar startup fall
  load() {

    //Dæmi um hvernig mætti nota hrátt callback. Skil eftir ef ske kynni
    //við vildum frekar nota það.
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

    //Dæmi #2 um hvernig hægt er að ná í JSON gögn með asynchronous hætti,
    //í þetta sinn með promises. Aðeins ítarlegra en það sem ég endaði á að
    //nota, skil það eftir ef við endum á að vilja frekar nota þessa aðferð.
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
//    console.log(response);
    return response;
  })
  .catch(function(error) {
    console.error(error);
  });
*/

return new Promise(function(resolve, reject) {
   var xhr = new XMLHttpRequest();
   xhr.onload = function() {
     resolve(JSON.parse(this.response));
   };
   xhr.onerror = reject;
   xhr.open('GET', 'videos.json');
   xhr.send();
 });

}

    //Throwaway fall til að sýna hvernig við náum gögnum úr asynchronous
    //promise til að vinna svo með gögnin
  proofOfConcept(parsedResults) {
      //console.log(parsedResults);
      this.proofTwo(parsedResults);
  }

  //Annað throwaway til að sýna hvernig við hendum gögnum milli falla.
  proofTwo(parse){
      console.log(parse);
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
  createVideoCategory(category) {
      console.log(category);
  }

  //Grunnfall sem tekur þáttað inntak úr JSON skránni og fer að deila því
  //út í myndbandsflokka og einstaka vídeó.
  parse(data){
    //console.log(data);
    data.categories.forEach(this.createVideoCategory);

  }
}



document.addEventListener('DOMContentLoaded', () => {
  const videos = new videosMainPage();

  videos.load()
  .then(function(result) {
    //videos.proofOfConcept(result);
    videos.parse(result);
  })
  .catch(function() {
    // Bregðast við villu hérna.
  });

})
