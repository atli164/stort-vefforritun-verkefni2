# stort-vefforritun-verkefni2

## TODO:

### Núna

* Samræma öll HTML komment við raunverulega virkni
* Klára stylelinting
  * Bæta við klasa  img svo ekki þurfi img selector
* Klára eslinting
  * Finna út úr fat arrow promise

## Keyrsla

Til þess að keyra þessa heimasíðu þarf fyrst að hlaða niður repoinu inn á eigin tölvu.

Næst þarf að fara í repo í command line og keyra eftirfarandi skipunina `npm install`. Sú skipun gæti tekið smá stund. Að því loknu er hægt að keyra `npm run dev` til þess að opna síðuna. Þessi skipun notar `browsersync` svo hægt er að breyta skjölunum í repoinu og síðan uppfærist sjálfkrafa. `npm run dev` keyrir tvennt enn, `babel` til að transpila ES2015 í ES5 kóða og `node-sass` til að transpila scss í css.

Einnig fylgja linterar. Hægt er að nota `npm run eslint -s` til að fá upplýsingar um linter-villur í öllum JS skrám í scripts möppu. Einnig er hægt að nota `npm run stylelint -s` sem gefur upplýsingar um allar linter-villur í styles.scss og öllum scss skrám í scss möppu.

## Skipulag

### Images

Inniheldur svg skjöl fyrir takka og overlays á myndböndum.

### Scripts

Inniheldur allar JS skrár, annars vegar scripts.js sem skilgreinir virkni á index.html og hins vegar videoscript.js sem skilgreinir virkni video.html.

### Scss

Inniheldur scss skrár sem skilgreina css hegðun klasa af sama nafni og skráin.

### Videos

Mappa sem geymir dummy myndbönd og dummy posters til að sýna virkni heimasíðunnar.

### .babelrc

Skilgreinir hegðun `babel` transpilersins.

### .eslintrc.js

Skilgreinir linting hegðun JS linters.

### index.html

HTML skjal fyrir forsíðu heimasíðunnar. Inniheldur komment sem sýnir form á HTML sem JS virkni bætir við.

### package.json

Lýsir hegðun skipana fyrir `npm` og inniheldur upplýsingar um hvaða pakka `npm install` sækir.

### styles.scss

Aðal scss-skjal, Importar öll önnur scss-skjöl og innheldur nokkrar grunnreglur fyrir heimasíðuna í heild sinni.

### video.html

HTML skjal fyrir undirsíðu með myndbandi. Inniheldur komment sem sýnir form á HTML sem JS virkni bætir við.

### videos.json

Skjal sem inniheldur upplýsingarnar sem segja heimasíðunni hvaða myndbönd skal birta á síðunni.
