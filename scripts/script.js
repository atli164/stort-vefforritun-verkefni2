class VideosMainPage {
  constructor() {
    this.container = document.querySelector('body');
  }
    
  // Einhverskonar startup fall
  load() {
    // Dæmi um hvernig mætti nota hrátt callback. Skil eftir ef ske kynni
    // við vildum frekar nota það.
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

    // Dæmi #2 um hvernig hægt er að ná í JSON gögn með asynchronous hætti,
    // í þetta sinn með promises. Aðeins ítarlegra en það sem ég endaði á að
    // nota, skil það eftir ef við endum á að vilja frekar nota þessa aðferð.
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
          // console.log(response);
          return response;
        })
        .catch(function(error) {
          console.error(error);
        });
     */

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(JSON.parse(this.response));
      };
      xhr.onerror = reject;
      xhr.open('GET', 'videos.json');
      xhr.send();
    });
  }

  // Throwaway fall til að sýna hvernig við náum gögnum úr asynchronous
  // promise til að vinna svo með gögnin
  proofOfConcept(parsedResults) {
    // console.log(parsedResults);
    this.proofTwo(parsedResults);
  }

  // Annað throwaway til að sýna hvernig við hendum gögnum milli falla.
  proofTwo(parse) {
    console.log(parse);
  }

  // Fall sem tekur við created tíma og spýtir út aldursstreng
  parseAge(created) {
    const date = new Date(created);
    const now = new Date();
    const year = 365 * 24 * 60 * 60 * 1000;
    if (now - date >= year) {
      const years = (now - date) / year;
      if (years === 1) {
        return 'Fyrir 1 ári síðan';
      }
      return 'Fyrir '.concat(toString(years), ' árum síðan');
    }
    const month = 30 * 24 * 60 * 60 * 1000;
    if (now - date >= month) {
      const months = (now - date) / month;
      if (months === 1) {
        return 'Fyrir 1 mánuði síðan';
      }
      return 'Fyrir '.concat(toString(months), ' mánuðum síðan');
    }
    const week = 7 * 24 * 60 * 60 * 1000;
    if (now - date >= week) {
      const weeks = (now - date) / week;
      if (weeks === 1) {
        return 'Fyrir 1 viku síðan';
      }
      return 'Fyrir '.concat(toString(weeks), ' vikum síðan');
    }
    const day = 24 * 60 * 60 * 1000;
    if (now - date > day) {
      const days = (now - date) / day;
      if (days === 1) {
        return 'Fyrir 1 degi síðan';
      }
      return 'Fyrir '.concat(toString(days), ' dögum síðan');
    }
    const hour = 60 * 60 * 1000;
    const hours = (now - date) / hour;
    if (hours === 0) {
      return 'Fyrir minna en klukkustund síðan';
    } else if (hours === 1) {
      return 'Fyrir 1 klukkustund síðan';
    }
    return 'Fyrir '.concat(toString(hours), ' klukkustundum síðan');
  }

  // Fall sem tekur við duration of spýtir út lengdarstreng
  parseDur(duration) {
    const min = duration / 60;
    const sec = duration % 60;
    return toString(min).concat(':', toString(sec));
  }

  // Fall sem býr til eitt div utan um vídeo með aldri, tíma, titli etc.
  // Kalla þarf á parseföll utan þess falls, þetta tekur við parsed gildum
  createVideoElement(id, title, dur, age, poster) {
    const newbox = document.createElement('a');
    newbox.classList.add('videobox');
    newbox.href = '/video.html/?id='.concat(toString(id));
    const thumb = document.createElement('img');
    thumb.classList.add('videobox__img');
    thumb.src = poster;
    newbox.appendChild(thumb);
    const ptime = document.createElement('p');
    ptime.classList.add('videobox__time');
    const ptimetext = document.createTextNode(dur);
    ptime.appendChild(ptimetext);
    newbox.appendChild(ptime);
    const ptitle = document.createElement('p');
    ptitle.classList.add('videobox__title');
    const ptitletext = document.createTextNode(title);
    ptitle.appendChild(ptitletext);
    newbox.appendChild(ptitle);
    const page = document.createElement('p');
    page.classList.add('videobox__age');
    const pagetext = document.createTextNode(age);
    page.appendChild(pagetext);
    newbox.appendChild(page);
    return newbox;
  }

  // Grunnfall sem tekur parsaða JSON skrána og fer að deila því
  // út í myndbandsflokka og einstaka vídeó.
  parse(data) {
    const videos = {};
    data.videos.forEach((video) => {
      const parsedObj = {};
      parsedObj.id = video.id;
      parsedObj.title = video.title;
      parsedObj.age = this.parseAge(video.created);
      parsedObj.length = this.parseDur(video.duration);
      parsedObj.thumb = video.poster;
      videos[video.id] = parsedObj;
    });
    data.categories.forEach((category) => {
      const catBox = document.createElement('div');
      catBox.classList.add('videocat');
      const catBoxTitle = document.createElement('p');
      catBoxTitle.classList.add('videocat__title');
      const actualTitle = document.createTextNode(category.title);
      catBoxTitle.appendChild(actualTitle);
      catBox.appendChild(catBoxTitle);
      category.videos.forEach((video) => {
        const cv = videos[video];
        catBox.appendChild(this.createVideoElement(cv.id, cv.title, cv.length, cv.dur, cv.thumb));
      });
      this.container.appendChild(catBox);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const videos = new VideosMainPage();

  videos.load()
    .then((result) => {
      // videos.proofOfConcept(result);
      videos.parse(result);
    })
    .catch(() => {
      // Bregðast við villu hérna.
    });
});
