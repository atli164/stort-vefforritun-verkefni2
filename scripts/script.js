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
      //Búum til private breytu sem geymir rétt scope á this...
      //const that = this;
      //console.log(that);
      //...sendum svo hana í onload og notum hana í JSON.parse
      //xhr.onload = (that) => {
      //Virkaði samt ekki án þess að kasta villu í npm. Notum lambda fall
      //rétt á meðan við erum að klára aðra virkni.
      xhr.onload = function() {
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
      //Kippti út years === 1 svo Math.floor(years) skili ekki áfram 1
      //ef við erum í t.d. 1.9999.
      //(Það er alveg til umræðu hvort við viljum vera að rúnna niður með
      //Math.floor() yfirhöfuð; mér finnst það eðlilegast og tel það gera fyrir
      //sem einfaldastan kóða, en við gætum farið aðrar leiðir)
      if ( (years >= 1) && (years < 2) ) {
        return 'Fyrir 1 ári síðan';
      }
      const yearsRounded = Math.floor(years);
      return 'Fyrir '.concat(yearsRounded.toString(), ' árum síðan');
    }
    const month = 30 * 24 * 60 * 60 * 1000;
    if (now - date >= month) {
      const months = (now - date) / month;
      if ( (months >= 1) && (months < 2) ) {
        return 'Fyrir 1 mánuði síðan';
      }
      const monthsRounded = Math.floor(months);
      return 'Fyrir '.concat(monthsRounded.toString(), ' mánuðum síðan');
    }
    const week = 7 * 24 * 60 * 60 * 1000;
    if (now - date >= week) {
      const weeks = (now - date) / week;
      if ( (weeks >= 1) && (weeks < 2) ) {
        return 'Fyrir 1 viku síðan';
      }
      const weeksRounded = Math.floor(weeks);
      return 'Fyrir '.concat(weeksRounded.toString(), ' vikum síðan');
    }
    const day = 24 * 60 * 60 * 1000;
    if (now - date > day) {
      const days = (now - date) / day;
      if ( (days >= 1) && (days < 2) ) {
        return 'Fyrir 1 degi síðan';
      }
      const daysRounded = Math.floor(days);
      return 'Fyrir '.concat(daysRounded.toString(), ' dögum síðan');
    }
    const hour = 60 * 60 * 1000;
    const hours = (now - date) / hour;
    if (hours < 1) {
      return 'Fyrir minna en klukkustund síðan';
    } else if ( (hours >= 1) && (hours < 2) ) {
      return 'Fyrir 1 klukkustund síðan';
    }
    const hoursRounded = Math.floor(hours);
    return 'Fyrir '.concat(hoursRounded.toString(), ' klukkustundum síðan');
  }

  // Fall sem tekur við duration of spýtir út lengdarstreng
  parseDur(duration) {
    //Mögulegt TODO: Bæta við klukkustundarreikningi og viðeigandi return skipun.
    const min = duration / 60;
    const sec = duration % 60;
    //Já, við gætum gert þetta allt með
    // return min.toString().concat(':', sec.toString());
    //en mér er illa við að keyra þrjú föll innan í return setningu - það
    //leiðir til scope loss og undefined skemmtilegheita.
    //Tek þetta frekar í sundur fyrir aðeins læsilegri og áreiðanlegri kóða.
    const minRounded = Math.floor(min);
    const minString = minRounded.toString();
    const secRounded = Math.floor(sec);
    const secString = secRounded.toString();
    if(secRounded <= 9) {
        return minString + ':0' + secRounded;
    }
    return minString + ':' + secRounded;
  }

  // Fall sem býr til eitt div utan um vídeo með aldri, tíma, titli etc.
  // Kalla þarf á parseföll utan þess falls, þetta tekur við parsed gildum
  createVideoElement(id, title, dur, age, poster) {
    const newbox = document.createElement('a');
    newbox.classList.add('videobox');
    newbox.href = '/video.html?id='.concat(id.toString());
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
      const catBox = document.createElement('section');
      catBox.classList.add('videocat');
      const catBoxTitle = document.createElement('h2');
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
      //console.log(result);
      videos.parse(result);
    })
    .catch(() => {
      // Bregðast við villu hérna.
    });
});
