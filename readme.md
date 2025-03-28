# Testaaminen Playwright-työkalulla 🎭

Tässä tehtävässä tavoitteena on tutustua testien suorittamiseen ja kehittämiseen Playwrightin avulla. Playwright on tehokas testauskirjasto, joka mahdollistaa monipuolisten ja luotettavien selainpohjaisten testien kirjoittamisen. Se tukee useita selaimia ja tarjoaa laajan valikoiman ominaisuuksia ja työkaluja, jotka helpottavat testien kehittämistä ja suorittamista.

Tehtävän tueksi tarvitset [Playwrightin omaa dokumentaatiota](https://playwright.dev/) ja opetusvideoita, jotta saat kaiken irti työkalusta ja sen ominaisuuksista. Tehtävän eri osissa on vinkkejä ja ohjeita testien kehittämiseen ja suorittamiseen, mutta ensisijaisena lähteenä toimii Playwrightin virallinen dokumentaatio: [Writing tests (playwright.dev)](https://playwright.dev/docs/writing-tests)

Dokumentaation lisäksi suosittelemme vahvasti katsomaan videon [Introduction to Playwright for End-to-End Testing with Debbie O'Brien (JS Drops, youtube.com)](https://youtu.be/lCb9JoZFpHI), jossa käydään perusteellisesti läpi Playwrightin käyttöä ja siihen liittyviä työkaluja. Videossa [Generating Playwright Tests in VS Code](https://www.youtube.com/watch?v=LM4yqrOzmFE) esitellään sekä testien "nauhoittamista" että elementtien paikallistamista sivulta hyödyntäen VS Code:n "Pick locator" -toimintoa, joten myös kyseinen video voi olla erittäin hyödyllinen. Lisää hyviä videoita löydät Playwrightin [YouTube-kanavalta](https://www.youtube.com/@Playwrightdev).

> [!TIP]
> Tehtävän komennot on tarkoitettu suoritettavaksi tehtävärepositorion juurihakemistossa, eli samassa hakemistossa, jossa tämä tiedosto sijaitsee. Voit siirtyä oikeaan hakemistoon komentorivillä esimerkiksi [MDN-palvelun ohjeiden avulla](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line#navigation_on_the_command_line).


## Asennukset ja testauksen lähtökohdat

Playwright-testien suorittamiseksi tarvitset [Node.js-ympäristön](https://nodejs.org/). Testit voidaan suorittaa niin komentoriviltä, Visual Studio Code -editorista kuin Playwrightin UI-työkalusta. Suosittelemme asentamaan lisäksi VS Code:en [Playwright Test for VS Code -laajennuksen (ms-playwright.playwright)](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright), joka tarjoaa Playwright-testeille tukea Visual Studio Codessa. [Laajennuksen ohjeissa](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) kerrotaan kattavasti sen ominaisuuksista ja suosittelemme lukemaan myös ohjeet.

Aloita asentamalla [projektin riippuvuudet](./package.json) seuraavalla komennolla:

```sh
npm install
```

**Playwrightin selainten asennus**

Playwright tukee useita selaimia, kuten Chromium, Firefox ja WebKit. Selaimet ja niiden käyttäminen on dokumentoitu tarkemmin Playwrightin dokumentaatioon https://playwright.dev/docs/browsers. Playwright ei käytä käyttöjärjestelmääsi asentamiasi selaimia, vaan se asentaa ja käyttää omia versioitaan selaimista. Tällä tavoin testit ovat eristettyjä ja toistettavissa riippumatta käyttöjärjestelmästä ja asennetuista selaimista. Testattavan sovelluksen toimivuus voidaan myös varmistaa suorittamalla samat testit samanaikaisesti useilla eri selaimilla.

Asenna seuraavaksi Playwrightille yksi tai useampia playwright-selaimia:

```bash
npx playwright install              # asenna kaikki selaimet
npx playwright install chromium     # asenna vain chromium
```

Playwright asentaa selaimet tietokoneellesi erilliseen hakemistoon, josta voit halutessasi [poistaa ne seuraamalla Playwrightin ohjeita](https://playwright.dev/docs/browsers#uninstall-browsers).

```bash
npx playwright uninstall --all      # poistaa kaikki playwright-selaimet
```

Lisätietoja selainten asennuksesta ja konfiguroinnista löydät Playwrightin dokumentaatiosta [https://playwright.dev/docs/browsers](https://playwright.dev/docs/browsers).

**Testien suorittaminen**

Kun olet asentanut riippuvuudet ja selaimet, voit suorittaa testit seuraavalla komennolla:

```bash
npx playwright test     # suorita komento repositorion juurihakemistossa
```

Kuten huomaat, testit suoritetaan oletuksena ns. "headless"-tilassa, eli ilman näkyvää selainikkunaa. Testit suoritetaan tyypillisesti niin nopeasti, ettei selaimen katseleminen testien aikana ole mielekästä.

Playwrightin suoritusasetuksia voidaan muuttaa antamalla `npx playwright`-komennolle erilaisia argumentteja. Esimerkiksi, jos haluat suorittaa testit Chromiumilla "headed"-tilassa, eli näkyvällä selainikkunalla, voit käyttää seuraavaa komentoa:

```bash
# suorittaa testit Chromiumilla näkyvällä selainikkunalla ja listaa testitulokset
npx playwright test --headed --project=chromium --reporter="list,html"
```

**UI-työkalu ja raportit**

Mikäli haluat valita itse suoritettavat testit yksitellen ja seurata niiden suoritusta graafisesti, voit käyttää VS Code -laajennosta tai käynnistää Playwrightin UI-työkalun komennolla:

```bash
npx playwright test --ui
```

Viimeisimmän testisuorituksen raportin saa näkyviin omaan selaimeen komennolla:

```bash
npx playwright show-report
```


## Testattava sivusto

Testauksen kohteena toimii esimerkkisivusto https://authentication-6o1.pages.dev/, joka sisältää pienen määrän ominaisuuksia palveluun kirjautumiseksi ja käyttäjätunnusten luomiseksi. Sivusto on pyritty luomaan samalla yksinkertaiseksi, mutta myös laadukkaaksi, jotta se toimisi hyvänä ensimmäisenä testauskohteena. Laadun osalta esimerkiksi eri kenttien labelit ja virheilmoitukset on pyritty toteuttamaan niin, että niitä on helppo yksilöidä ja käsitellä ohjelmallisesti testeissä.

Testattava esimerkkisivusto on toteutettu testauksen harjoittelua varten, joten se ei noudata kaikkia tavanomaisia tuotantokäytössä olevien web-sivustojen oletuksia. Suurimpana eroavaisuutena sivuston kautta tehdyt rekisteröitymiset ja kirjautumiset **ovat voimassa vain saman selaimen/istunnon sisällä**. Rekisteröitymiset ja kirjautumiset eivät siis vaikuta eri selainten tai testitapausten välillä.

Playwright suorittaa testejä rinnakkain ja suoritusten järjestys ei ole taattu, joten testiselain nollataan aina jokaisen testin alussa. Yhdessä testissä tekemäsi rekisteröityminen tai kirjautuminen ei siis ole voimassa enää seuraavissa testitapauksissa.

> *"Playwright creates a browser context for each test. Browser context is equivalent to a brand new browser profile. This delivers full test isolation with zero overhead."*
>
> https://playwright.dev/

Sivustoa on tarkoitus testata "black box" -mallilla, eli testien kirjoittamiseksi ei ole tarkoitus perehtyä sivuston lähdekoodiin tai verkkoliikenteeseen. HTML-rakenteiden tutkiminen on kuitenkin tarpeen, jotta saat suoritettua testeissä tarvitsemasi operaatiot tekstikentille ja painikkeille.


### Rekisteröityminen

Sivustolle rekisteröityminen onnistuu osoitteessa https://authentication-6o1.pages.dev/signUp. Testisivustossa on painikkeet myös ulkoisten palveluiden hyödyntämiseen rekisteröitymisessä, mutta niihin ei ole toteutettu toiminnallisuutta.

Rekisteröityminen tällä lomakkeella luo uuden käyttäjätunnuksen, joka on siis voimassa vain yhden selaimen tai testitapauksen sisällä.

> [!TIP]
> Mikäli haluat hyödyntää Playwrightin edistyneempiä ominaisuuksia, voit myös tallentaa rekisteröitymisen ja kirjautumisen tilan ja uudelleenkäyttää sitä eri testeissä. Tällainen lähestymistapa on erityisen hyödyllistä laajemmissa testisarjoissa, joissa halutaan välttää kirjautumisen toistaminen jokaisessa testissä.
>
> Lue aiheesta lisää sivulta https://playwright.dev/docs/auth.


### Kirjautuminen

Kirjautuminen onnistuu osoitteessa https://authentication-6o1.pages.dev/. Kirjautumisen jälkeen käyttäjä ohjataan osoitteeseen https://authentication-6o1.pages.dev/dashboard, jossa näytetään tervetuloa-viesti. Kuten rekisteröityminen, myös kirjautuminen on voimassa vain saman istunnon sisällä.

Itse luotavien tunnusten lisäksi sivustolla on kaksi valmista tunnusta, jotka ovat aina voimassa: `alice@example.com` ja `bob@example.com`:

| Name  | Username          | Password                           | Env variables in GitHub \*         |
|-------|-------------------|------------------------------------|------------------------------------|
| Alice | alice@example.com | `}3jc\xJnQ=E=+Q_y/%Hd311bW#6{_Oyj` | `USER1_USERNAME`, `USER1_PASSWORD` |
| Bob   | bob@example.com   | `nUL9zA3q=Nt7\N,0?CL&c74U,Ic)0)dN` | `USER2_USERNAME`, `USER2_PASSWORD` |

Voit käyttää näitä tunnuksia niissä testitapauksissa, joissa tarvitset olemassa olevan käyttäjän kirjautumista tai rekisteröitymistä, tai haluat varmistaa, että samalla tunnuksella ei voi rekisteröityä uudelleen.

\* *Lue lisää ympäristömuuttujien käytöstä tämän dokumentin loppuosasta.*


## Omien testien toteuttaminen

Kun olet saanut projektin riippuvuudet asennettua ja kokeillut testauksen kohteena olevaa sivustoa, voit aloittaa omien testien kirjoittamisen. Tässä tehtävässä tavoitteena on kirjoittaa testitapaukset sivuston rekisteröitymiseen ja kirjautumiseen. Voit kirjoittaa testit joko yhteen tiedostoon tai eri tiedostoihin, riippuen siitä, miten haluat järjestää testitapauksesi. Tiedostojesi tulee noudattaa Playwrightin testitiedostojen nimeämiskäytäntöä, eli niiden tulee päättyä `.spec.ts`- tai `.spec.js`-päätteeseen.

Playwright-testejä voidaan kirjoittaa useilla eri koodieditoreilla ja eri ohjelmointikielillä, kuten JavaScriptillä ja TypeScriptillä. Tällä kurssilla suosittelemme TypeScriptin käyttöä, koska se yhdessä VS Coden kanssa helpottaa testien kirjoittamista ja virheiden paikantamista. Myös Playwrightin dokumentaation esimerkit on kirjoitettu TypeScriptillä.

Tehtävässä kirjoitettavat testitiedostot tulee päättyä `.spec.ts`- tai `.spec.js`-päätteeseen, jotta Playwright tunnistaa ne testitiedostoiksi. Tehtäväpohjaan on luotu valmiiksi kaksi testitiedostoa, joihin voit kirjoittaa testitapauksia:

* [login.spec.ts](./tests/login.spec.ts)
* [register.spec.ts](./tests/register.spec.ts)

Suorita omia testejäsi sitä mukaa, kun kirjoitat niitä, jotta voit varmistaa, että ne toimivat odotetusti. Voit suorittaa testit joko yksittäin tai kaikki kerralla riippuen siitä, miten haluat testata niitä. Voit myös käyttää Playwrightin UI-työkalua testien suorittamiseen, jos haluat seurata testien suoritusta visuaalisesti.


## Testitapaukset

Johda seuraavista vaatimuksista testitapaukset ja kirjoita niille Playwright-testit. Kussakin testitapauksessa tulee tehdä tarkoituksenmukaiset toimet (actions) ja tehdä vaadittavat tarkastukset (asserts), jotta voidaan varmistaa, että testattava toiminnallisuus toimii odotetusti. Testitapauksissa tulee huomioida myös tyypilliset virhetilanteet ja niiden käsittely.


### Kirjautuminen

* Palvelun etusivulla tulee olla kirjautumislomake, jossa on kentät sähköpostille ja salasanalle, sekä kirjautumisnappi.
* Käyttäjä tulee ohjata onnistuneen kirjautumisen jälkeen osoitteeseen `/dashboard`, jossa näytetään tervetuloa-viesti.
* Rekisteröityneen käyttäjän tulee voida kirjautua sisään sähköpostilla ja salasanalla.
* Sekä käyttäjätunnus ja salasana ovat pakollisia, ja puuttuvista tiedoista tulee näyttää virheilmoitus.
* Kirjautumisen tulee huomauttaa, mikäli käyttäjätunnus on väärässä muodossa tai salasana on liian lyhyt.
* Kirjautumisen tulee estää kirjautumiset sekä tuntemattomalla käyttäjätunnuksella että väärällä salasanalla.

Lisäksi:

* Jos käyttäjä yrittää päästä suoraan `/dashboard`-sivulle ilman voimassa olevaa kirjautumista, hänet tulee ohjata kirjautumissivulle.
* Kun kirjautunut käyttäjä kirjatuu ulos käyttäen "Logout" -painiketta, hänet tulee ohjata kirjautumissivulle.


### Rekisteröityminen

* Rekisteröitymiseen tulee päästä sekä suoraan `/signUp`-osoitteesta että etusivun "Sign up" -linkistä.
* Nimi, sähköposti ja salasana ovat rekisteröitymisessä pakollisia.
* Sähköpostin tulee olla oikeassa muodossa ja salasanan riittävän pitkä, ja virheellisistä tiedoista tulee näyttää virheilmoitus.
* Rekisteröitymisyritys jo rekisteröidyllä sähköpostilla näyttää virheilmoituksen.
* Rekisteröityminen kelvollisilla tiedoilla luo tunnuksen, näyttää onnistumisviestin ja ohjaa kirjautumissivulle.
* Rekisteröitymisessä luotua tiliä tulee voida käyttää kirjautumiseen heti rekisteröitymisen jälkeen *(saman testitapauksen sisällä)*.


### Ohjeita ja esimerkkejä

Näiden testien kirjoittamisen myötä tavoitteena on oppia tekemään sivun sisällölle erilaisia toimenpiteitä hyödyntäen Playwrightin tarjoamia toimintoja. Lue lisää testien kirjoittamisesta [Playwrightin dokumentaatiosta (playwright.dev)](https://playwright.dev/docs/writing-tests).

Mikäli haluat tutkia esimerkkejä Playwright-testeistä, olemme lisänneet tähän repositorioon valmiiksi [demo-todo-app.spec.ts](./tests-examples/demo-todo-app.spec.ts)-tiedoston, jossa on esimerkkejä toimintojen ja tarkastusten käytöstä. Voit käyttää sitä apuna testien kirjoittamisessa ja soveltaa sen esimerkkejä omiin testitapauksiisi. Jos haluat suorittaa kyseisen tiedoston testejä, joudut siirtämään sen ensin `tests`-kansioon, jotta Playwright tunnistaa sen testitiedostoksi. Älä kuitenkaan lähetä kyseistä esimerkkitiedostoa tests-hakemistossa GitHubiin, jotta siinä olevat testit eivät sekoitu omiin ratkaisuihisi.

> [!NOTE]
> *demo-todo-app.spec.ts* on Playwrightin esimerkki, joka on lisensoitu [Apache 2.0 -lisenssillä](https://github.com/microsoft/playwright/blob/main/LICENSE). Se on lainattu tähän tehtävään opetus- ja esimerkkimateriaaliksi.


## 🚀 Käyttäjätunnukset ja salasanat ympäristömuuttujissa (extra)

Käyttäjätunnusten, salasanojen ja API-avainten kirjoittaminen selkokielisinä testitapauksiin ei ole suositeltavaa, sillä ne voivat olla alttiita vahingossa julkaisemiselle. Tässä tapauksessa testijärjestelmän salasanat ovat julkisia, joten ongelma ei ole merkittävä, mutta on hyvä harjoitella myös salasanojen käsittelyä turvallisesti.

Parempi tapa käsitellä salasanoja voisi olla salaisuuksien tallentaminen ympäristömuuttujiin tai salaisuuksiksi. Playwrightin testit voivat käyttää ympäristömuuttujia, joten voit tallentaa salasanat esimerkiksi `.env`-tiedostoon ja lukea ne testitapauksissa ympäristömuuttujista. Luomasi `.env`-tiedosto puolestaan voidaan rajata versionhallinnan ulkopuolelle [.gitignore-tiedoston](./.gitignore) avulla.

Suosittelemme tutustumaan ympäristömuuttujiin ja hyödyntämään niitä tässä tehtävässä. Voit lukea lisää ympäristömuuttujista [Playwrightin dokumentaatiosta (playwright.dev)](https://playwright.dev/docs/test-parameterize#env-files). Tiedostopohjaisia ympäristömuuttujia varten tarvitset lisäksi [dotenv-paketin](https://www.npmjs.com/package/dotenv), joka tulee ottaa käyttöön [playwright.config.ts](./playwright.config.ts)-tiedoston yläosassa.

Oma `.env`-tiedosto voi näyttää esimerkiksi tältä:

```
USER1_USERNAME=alice@example.com
USER1_PASSWORD='}3jc\xJnQ=E=+Q_y/%Hd311bW#6{_Oyj'
USER2_USERNAME=bob@example.com
USER2_PASSWORD='nUL9zA3q=Nt7\N,0?CL&c74U,Ic)0)dN'
```

> [!NOTE]
> Älä lisää omaa .env-tiedostoasi versionhallintaan. GitHub actionsissa on valmiina ympäristömuuttujat, joiden nimet ja arvot vastaavat edellä esitettyjä. Varmista siis, että ne on määritelty samoilla nimillä ja arvoilla kuin tehtävänannossa, jotta testisi toimivat myös automaattisessa arvioinnissa.


## Tehtävän automaattinen arviointi

Kun olet kirjoittanut testitapaukset ja varmistanut, että ne toimivat odotetusti, voit palauttaa tehtävän automaattista tarkastusta varten. Lisää luomasi testitiedostot versionhallintaan ja lähetä muutokset GitHubiin `git status`, `git add`, `git commit` ja `git push` -komennoilla. `push`-komennon jälkeen käynnistyy GitHub action -automaattitarkastus, joka suorittaa testit ja antaa niistä palautteen. Näet palautteen GitHub-repositoriosi actions-välilehdeltä.

Automaattisessa tarkastuksessa käytetään Chrome-selainta ja testit suoritetaan yksi kerrallaan headless-tilassa. Suosittelemme varmistamaan, että testit toimivat paikallisesti seuraavalla komennolla ennen palautusta:

```bash
npx playwright test --reporter="list,html" --project=chromium
```

Palautettuasi tehtävän testisi pisteytetään sen mukaan, kuinka hyvin ne todentavat edellä listattuja vaatimuksia. **On siis oleellista, että testeissäsi syötät sekä oikeita että virheellisiä tietoja ja tarkistat, että sivuston tila sekä siinä näkyvät viestit toimivat oikein**. Tarvittaessa tutki actions-välilehden raporttia ja testituloksia, jotta voit täydentää testejäsi kattamaan lisää testitapauksia.

Voit palauttaa tehtävän uudelleen useita kertoa tehtävän määräaikaan asti.


## Materiaalista

Tämän tehtävän on kehittänyt Teemu Havulinna ja se on lisensoitu [Creative Commons BY-NC-SA -lisenssillä](https://creativecommons.org/licenses/by-nc-sa/4.0/).

Tehtävän luonnissa on luotu hyödyntämällä kielimalleja ja tekoälytyökaluja, kuten GitHub Copilot ja ChatGPT.
