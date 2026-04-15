import { useState, useEffect } from "react";

// ─── Question Data ────────────────────────────────────────────────────────────
const TOPICS = [
  {
    id: "html",
    name: "HTML",
    color: "#f97316",
    desc: "Semantika, formalar, atributlar, HTML5 yangiliklari.",
    count: 20,
    questions: [
      { question: "HTML nimani anglatadi?", options: ["Hyper Tool ML","Hyper Text Markup Language","High Text Machine","Home Tool Markup Language"], correct: 1 },
      { question: "<img> tag nima uchun ishlatiladi?", options: ["Video ko'rsatish","Rasm ko'rsatish","Audio ijro etish","Havola yaratish"], correct: 1 },
      { question: "Havola (link) yaratish uchun qaysi teg ishlatiladi?", options: ["<link>","<href>","<a>","<url>"], correct: 2 },
      { question: "Eng katta heading tegi qaysi?", options: ["<h6>","<h3>","<head>","<h1>"], correct: 3 },
      { question: "Paragraf uchun qaysi teg ishlatiladi?", options: ["<text>","<para>","<t>","<p>"], correct: 3 },
      { question: "Jadval yaratish uchun qaysi teg ishlatiladi?", options: ["<tab>","<grid>","<tr>","<table>"], correct: 3 },
      { question: "Foydalanuvchidan ma'lumot olish uchun qaysi teg ishlatiladi?", options: ["<form>","<data>","<field>","<input>"], correct: 3 },
      { question: "Tartibsiz ro'yxat uchun qaysi teg ishlatiladi?", options: ["<list>","<lii>","<ol>","<ul>"], correct: 3 },
      { question: "Audio fayl uchun qaysi teg ishlatiladi?", options: ["<sound>","<mp3>","<music>","<audio>"], correct: 3 },
      { question: "Sahifa sarlavhasi (title) qayerda yoziladi?", options: ["<body> ichida","<footer> ichida","<meta> ichida","<head> ichida <title> tegida"], correct: 3 },
      { question: "Yangi qatorga o'tish uchun qaysi teg ishlatiladi?", options: ["<break>","<lb>","<new>","<br>"], correct: 3 },
      { question: "Qalin (bold) matn uchun qaysi teg ishlatiladi?", options: ["<bold>","<bld>","<heavy>","<strong>"], correct: 3 },
      { question: "Kursiv (italic) matn uchun qaysi teg ishlatiladi?", options: ["<italic>","<it>","<emphasis>","<i>"], correct: 3 },
      { question: "Formada yuborish tugmasi uchun to'g'ri teg qaysi?", options: ["<btn>","<submit>","<send>","<button>"], correct: 3 },
      { question: "<li> tegi qaysi elementga tegishli?", options: ["Table","Form","Head","List (ro'yxat)"], correct: 3 },
      { question: "<meta> tegi nima qiladi?", options: ["Style beradi","Script yuklaydi","Layout yaratadi","Metadata qo'shadi"], correct: 3 },
      { question: "DOCTYPE deklaratsiyasi nima uchun ishlatiladi?", options: ["CSS stillarni ulash uchun","JavaScript ulanish uchun","Metama'lumot qo'shish uchun","Brauzerga HTML versiyasini aytib berish uchun"], correct: 3 },
      { question: "<header> tegi nima uchun ishlatiladi?", options: ["Pastki qism uchun","Script uchun","Form uchun","Sahifaning yuqori qismi uchun"], correct: 3 },
      { question: "<footer> tegi nima uchun ishlatiladi?", options: ["Yuqori qism uchun","Head uchun","Nav uchun","Sahifaning pastki qismi uchun"], correct: 3 },
      { question: "HTML fayl kengaytmasi qaysi?", options: [".js",".css",".xml",".html yoki .htm"], correct: 3 },
    ],
  },
  {
    id: "css",
    name: "CSS",
    color: "#06b6d4",
    desc: "Flexbox, Grid, animatsiyalar, specificity, responsive.",
    count: 20,
    questions: [
      { question: "CSS nimani anglatadi?", options: ["Creative Style Sheets","Computer Style Sheets","Color Style Sheets","Cascading Style Sheets"], correct: 3 },
      { question: "Matn rangini o'zgartirish uchun qaysi xususiyat ishlatiladi?", options: ["font","text","bg","color"], correct: 3 },
      { question: "Fon rangini o'zgartirish uchun qaysi xususiyat ishlatiladi?", options: ["bg-color","color-bg","back","background-color"], correct: 3 },
      { question: "Margin nima?", options: ["Ichki bo'shliq","Border qalinligi","Font o'lchami","Elementning tashqi bo'shlig'i"], correct: 3 },
      { question: "Padding nima?", options: ["Tashqi bo'shliq","Border rangi","Matn o'lchami","Elementning ichki bo'shlig'i"], correct: 3 },
      { question: "Flexbox yoqish uchun qaysi xususiyat ishlatiladi?", options: ["flex:on","layout:flex","use:flex","display:flex"], correct: 3 },
      { question: "CSS Grid yoqish uchun qaysi xususiyat ishlatiladi?", options: ["grid:on","use:grid","layout:grid","display:grid"], correct: 3 },
      { question: "Matnni gorizontal markazga qo'yish uchun qaysi xususiyat ishlatiladi?", options: ["align:center","center:text","pos:center","text-align:center"], correct: 3 },
      { question: "Elementga chegara (border) berish uchun qaysi xususiyat ishlatiladi?", options: ["line","edge","frame","border"], correct: 3 },
      { question: "Soya (shadow) effekti uchun qaysi xususiyat ishlatiladi?", options: ["shadow-box","shade","effect","box-shadow"], correct: 3 },
      { question: "Sichqoncha ustida turganida stil berish uchun qaysi pseudo-klass ishlatiladi?", options: ["::hover","hover()","onHover",":hover"], correct: 3 },
      { question: "Z-index nima uchun ishlatiladi?", options: ["Rang berish uchun","Kenglik belgilash uchun","Balandlik belgilash uchun","Elementlar qatlamini (layer) boshqarish uchun"], correct: 3 },
      { question: "Elementni ko'rinmas qilish uchun qaysi xususiyat ishlatiladi?", options: ["yashiradi","ko'rsatadi","o'zgartiradi","display:none"], correct: 3 },
      { question: "CSS da shaffoflikni (opacity) boshqarish uchun qaysi xususiyat ishlatiladi?", options: ["rang","font","size","opacity"], correct: 3 },
      { question: "Responsive dizayn uchun qaysi CSS texnikasi ishlatiladi?", options: ["rang","font","script","Media query (@media)"], correct: 3 },
      { question: "Font o'lchamini o'zgartirish uchun qaysi xususiyat ishlatiladi?", options: ["text-size","size","f-size","font-size"], correct: 3 },
      { question: "position: absolute element qayerga nisbatan joylashadi?", options: ["Har doim sahifa boshiga nisbatan","Faqat body ga nisbatan","Qo'shni elementga nisbatan","Eng yaqin positioned ota elementga nisbatan"], correct: 3 },
      { question: "CSS Grid da 3 ta teng ustun yaratish uchun to'g'ri sintaksis qaysi?", options: ["grid-columns: 3","columns: 3 equal","grid: 3fr","grid-template-columns: repeat(3, 1fr)"], correct: 3 },
      { question: "CSS custom property (variable) to'g'ri e'lon qilish usuli qaysi?", options: ["var: --rang: red","set --rang = red","--rang: red (istalgan joyda)",":root { --rang: red }"], correct: 3 },
      { question: "Flexbox da elementlarni vertikal markazga joylashtirish uchun qaysi xususiyat ishlatiladi?", options: ["justify-content: center","vertical-align: center","align-content: center","align-items: center"], correct: 3 },
    ],
  },
  {
    id: "js",
    name: "JavaScript",
    color: "#f7c948",
    desc: "Closures, async/await, ES6+, funksiyalar, scope.",
    count: 20,
    questions: [
      { question: "JavaScript nima?", options: ["Browser","Operatsion tizim","Ma'lumotlar bazasi","Dasturlash tili"], correct: 3 },
      { question: "O'zgaruvchi e'lon qilish uchun qaysi kalit so'zlar ishlatiladi?", options: ["int","varr","def","let / const / var"], correct: 3 },
      { question: "Qat'iy tenglik operatori qaysi?", options: ["=","==","!=","==="], correct: 3 },
      { question: "Funksiya e'lon qilishning to'g'ri usuli qaysi?", options: ["func()","def()","make()","function myFunc() {}"], correct: 3 },
      { question: "Array (massiv) qanday yaratiladi?", options: ["{}","()","<>","[]"], correct: 3 },
      { question: "Object (ob'ekt) qanday yaratiladi?", options: ["[]","()","<>","{}"], correct: 3 },
      { question: "Konsolga chiqarish uchun qaysi funksiya ishlatiladi?", options: ["print()","echo()","show()","console.log()"], correct: 3 },
      { question: "String (matn) uzunligini olish uchun qaysi xususiyat ishlatiladi?", options: [".size",".len",".count",".length"], correct: 3 },
      { question: "Massivga element qo'shish uchun qaysi metod ishlatiladi?", options: ["add()","insert()","put()","push()"], correct: 3 },
      { question: "Massivning oxirgi elementini olib tashlash uchun qaysi metod ishlatiladi?", options: ["remove()","del()","out()","pop()"], correct: 3 },
      { question: "Har bir massiv elementiga funksiya qo'llash uchun qaysi metod ishlatiladi?", options: ["loop()","each()","do()","map()"], correct: 3 },
      { question: "Massivni shartga ko'ra filtrlash uchun qaysi metod ishlatiladi?", options: ["find()","search()","scan()","filter()"], correct: 3 },
      { question: "Arrow function (o'q funksiya) qanday yoziladi?", options: ["->","=>>"," func=>","() => {}"], correct: 3 },
      { question: "Bir martalik kechiktirilgan funksiya ishga tushirish uchun qaysi metod ishlatiladi?", options: ["delay()","wait()","sleep()","setTimeout()"], correct: 3 },
      { question: "Takroriy interval bilan funksiya ishga tushirish uchun qaysi metod ishlatiladi?", options: ["repeat()","loopTime()","timer()","setInterval()"], correct: 3 },
      { question: "API ga so'rov yuborish uchun qaysi zamonaviy funksiya ishlatiladi?", options: ["get()","load()","api()","fetch()"], correct: 3 },
      { question: "JavaScript da typeof null qanday natija qaytaradi?", options: ['"null"','"undefined"','"boolean"','"object"'], correct: 3 },
      { question: "Closure (yopilma) nima?", options: ["Funksiyani yopish usuli","try-catch bloki","Object metodini o'chirish","Ichki funksiyaning tashqi funksiya o'zgaruvchilariga kirish imkoniyati"], correct: 3 },
      { question: "async/await nima uchun ishlatiladi?", options: ["Faqat AJAX uchun","Loop larni tezlatish uchun","setTimeout o'rnida","Promise zanjirini sinxron ko'rinishida yozish uchun"], correct: 3 },
      { question: "Spread operator (...) nima qiladi?", options: ["Ob'ektni o'chiradi","Faqat funksiya parametrlari uchun ishlatiladi","Stringni arrayga aylantiradi","Array yoki ob'ekt elementlarini yoyib chiqaradi"], correct: 3 },
    ],
  },
  {
    id: "dom",
    name: "JS DOM",
    color: "#a78bfa",
    desc: "DOM manipulyatsiya, eventlar, elementlar bilan ishlash.",
    count: 20,
    questions: [
      { question: "CSS selektor orqali elementni topish uchun qaysi metod ishlatiladi?", options: ["get()","find()","pick()","querySelector()"], correct: 3 },
      { question: "ID orqali elementni topish uchun qaysi metod ishlatiladi?", options: ["getId()","selectId()","id()","getElementById()"], correct: 3 },
      { question: "Klass orqali elementlarni topish uchun qaysi metod ishlatiladi?", options: ["getClass()","selectClass()","class()","getElementsByClassName()"], correct: 3 },
      { question: "Element matnini o'zgartirish uchun qaysi xususiyat ishlatiladi?", options: ["changeText","text()","setText","innerHTML / textContent"], correct: 3 },
      { question: "Elementga event (hodisa) qo'shish uchun qaysi metod ishlatiladi?", options: ["onEvent()","listen()","bind()","addEventListener()"], correct: 3 },
      { question: "Elementga CSS klassi qo'shish uchun qaysi metod ishlatiladi?", options: ["addClass()","pushClass()","setClass()","classList.add()"], correct: 3 },
      { question: "Elementdan CSS klassini olib tashlash uchun qaysi metod ishlatiladi?", options: ["delClass()","removeClass()","popClass()","classList.remove()"], correct: 3 },
      { question: "Klassni qo'shish/olib tashlashni almashtirish uchun qaysi metod ishlatiladi?", options: ["switchClass()","toggleClass()","flipClass()","classList.toggle()"], correct: 3 },
      { question: "Yangi HTML element yaratish uchun qaysi metod ishlatiladi?", options: ["make()","newElement()","build()","createElement()"], correct: 3 },
      { question: "Farzand element qo'shish uchun qaysi metod ishlatiladi?", options: ["addChild()","pushChild()","insert()","appendChild()"], correct: 3 },
      { question: "Elementni DOM dan o'chirish uchun qaysi metod ishlatiladi?", options: ["delete()","erase()","clear()","remove()"], correct: 3 },
      { question: "Input elementning qiymatini olish uchun qaysi xususiyat ishlatiladi?", options: ["getValue()","val()","input()","value"], correct: 3 },
      { question: "Elementning inline stilini o'zgartirish uchun qaysi xususiyat ishlatiladi?", options: ["css()","styleSet()","design()","element.style"], correct: 3 },
      { question: "event.preventDefault() nima qiladi?", options: ["Eventni to'liq o'chiradi","Elementni o'chiradi","Boshqa eventlarni ham to'xtatadi","Eventning standart xatti-harakatini bekor qiladi"], correct: 3 },
      { question: "event.stopPropagation() nima qiladi?", options: ["Standart xatti-harakatni bekor qiladi","Sahifani to'xtatadi","Elementni o'chiradi","Eventning yuqori elementlarga tarqalishini (bubbling) to'xtatadi"], correct: 3 },
      { question: "Ota elementni olish uchun qaysi xususiyat ishlatiladi?", options: ["getParent()","parent()","up()","parentElement"], correct: 3 },
      { question: "Farzand elementlarni olish uchun qaysi xususiyat ishlatiladi?", options: ["childs","kids","nodes","children"], correct: 3 },
      { question: "Keyingi (next) aka-uka elementni olish uchun qaysi xususiyat ishlatiladi?", options: ["next()","nextNode()","nextItem()","nextElementSibling"], correct: 3 },
      { question: "Oldingi (previous) aka-uka elementni olish uchun qaysi xususiyat ishlatiladi?", options: ["prev()","before()","last()","previousElementSibling"], correct: 3 },
      { question: "querySelectorAll() qanday natija qaytaradi?", options: ["Bitta element","HTMLCollection","Array","NodeList (barcha mos elementlar)"], correct: 3 },
    ],
  },
  {
    id: "react",
    name: "React",
    color: "#4bf5b2",
    desc: "Hooks, state, props, lifecycle, Context API, optimizatsiya.",
    count: 20,
    questions: [
      { question: "React nima?", options: ["Dasturlash tili","Framework","Ma'lumotlar bazasi","JavaScript UI kutubxonasi (Library)"], correct: 3 },
      { question: "React da Component nima?", options: ["CSS fayli","Ma'lumotlar bazasi","API","UI ning qayta ishlatiladigan qismi"], correct: 3 },
      { question: "React da 'state' nima?", options: ["CSS klassi","HTML tegi","Global o'zgaruvchi","Komponentning o'zgaruvchan ichki holati"], correct: 3 },
      { question: "Hook nima?", options: ["CSS xususiyati","HTML atributi","Ma'lumotlar bazasi so'rovi","React funksional komponentlarida state va lifecycle ishlatish imkonini beruvchi funksiya"], correct: 3 },
      { question: "useState hook nima qaytaradi?", options: ["Faqat string qiymatlar","Faqat boolean qiymat","Bitta qiymat","[qiymat, setQiymat] — holat va uni o'zgartiruvchi funksiya"], correct: 3 },
      { question: "useEffect hook nima uchun ishlatiladi?", options: ["Faqat API so'rovlari uchun","State o'zgartirish uchun","Komponentni stillashtirish uchun","Yon ta'sirlarni (side effects) boshqarish: API, subscription, DOM"], correct: 3 },
      { question: "Props nima?", options: ["Komponentning ichki holati","Global state","CSS xususiyatlari","Ota komponentdan farzand komponentga uzatiladigan ma'lumotlar"], correct: 3 },
      { question: "JSX nima?", options: ["CSS preprocessor","Ma'lumotlar bazasi tili","Alohida dasturlash tili","JavaScript ichida HTML yozish imkonini beruvchi sintaksis"], correct: 3 },
      { question: "React da click eventi qanday yoziladi?", options: ["click()","addEvent('click')","listen('click')","onClick={handler}"], correct: 3 },
      { question: "React da ro'yxatni render qilishning to'g'ri usuli qaysi?", options: ["for loop to'g'ridan-to'g'ri JSX da","array.forEach() orqali","array.filter() orqali","array.map() orqali JSX elementlar massivini qaytarish"], correct: 3 },
      { question: "React da key xususiyati nima uchun muhim?", options: ["Stillashtirish uchun","Eventlarni boshqarish uchun","Props uzatish uchun","React ga ro'yxat elementlarini samarali yangilash uchun noyob identifikator beradi"], correct: 3 },
      { question: "React da conditional rendering qanday amalga oshiriladi?", options: ["Faqat if-else JSX tashqarisida","Faqat switch-case bilan","Faqat ternary operator bilan","&& , ternary operator yoki if-else — JSX ichida va tashqarisida"], correct: 3 },
      { question: "Context API nima uchun ishlatiladi?", options: ["Faqat authentication uchun","API so'rovlari uchun","Komponent stilini global o'zgartirish uchun","Prop drilling muammosini hal qilib, chuqur komponentlarga ma'lumot uzatish"], correct: 3 },
      { question: "React Router nima uchun ishlatiladi?", options: ["API so'rovlari uchun","State boshqarish uchun","CSS stillashtirish uchun","Sahifalar orasida navigatsiya qilish uchun"], correct: 3 },
      { question: "useNavigate() hook nima qiladi?", options: ["Sahifani yangilaydi","State o'zgartiradi","API so'rov yuboradi","Dasturiy ravishda boshqa sahifaga o'tkazadi"], correct: 3 },
      { question: "React Fragment (<> </>) nima uchun ishlatiladi?", options: ["Stil berish uchun","Event qo'shish uchun","Props uzatish uchun","Ortiqcha DOM elementi qo'shmasdan bir nechta elementni o'rash uchun"], correct: 3 },
      { question: "useMemo va useCallback ning farqi nima?", options: ["Hech qanday farq yo'q","useCallback qiymat qaytaradi, useMemo funksiya","Ikkalasi faqat class komponentlarda ishlaydi","useMemo hisoblangan qiymat, useCallback memoizatsiya qilingan funksiya qaytaradi"], correct: 3 },
      { question: "React komponentida re-render qachon sodir bo'ladi?", options: ["Faqat props o'zgarganda","Faqat state o'zgarganda","Faqat sahifa yangilanganda","State yoki props o'zgarganda, yoki ota komponent re-render bo'lganda"], correct: 3 },
      { question: "useEffect dagi cleanup funksiyasi nima uchun?", options: ["Komponentni o'chirish uchun","State ni tozalash uchun","CSS klasslarni o'chirish uchun","Subscription, timer, event listener kabi resurslarni to'xtatish uchun"], correct: 3 },
      { question: "React loyiha yaratish uchun qaysi vositalar ishlatiladi?", options: ["npm start alone","html + script tag","React CDN only","create-react-app yoki Vite"], correct: 3 },
    ],
  },
];

const TELEGRAM_BOT_TOKEN = "8139948146:AAE4dlFU019RS2PJskOXgE4o3RNNw8vkAoU";
const TELEGRAM_CHAT_IDS = ["6562416815", "5826696977"];
const LETTERS = ["A", "B", "C", "D"];
const TOPIC_ICON_BY_ID = {
  html: "/html.png",
  css: "/css.png",
  js: "/js.png",
  dom: "/js_dom.png",
  react: "/react.png",
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function sendResultToTelegram(userData, testResult) {
  const { firstName, lastName, group } = userData;
  const { topic, score, total, timeTaken } = testResult;
  const pct = Math.round((score / total) * 100);
  const grade =
    pct >= 90 ? "A (Ajoyib) ⭐⭐⭐"
    : pct >= 75 ? "B (Yaxshi) ⭐⭐"
    : pct >= 55 ? "C (Qoniqarli) ⭐"
    : "F (Qoniqarsiz) ❌";

  const msg = `🎓 *FRONTEND TEST NATIJASI*\n━━━━━━━━━━━━━━━━━━━━━━━\n\n👤 *Ism:* ${firstName} ${lastName}\n🏫 *Guruh:* ${group}\n📚 *Bo'lim:* ${topic}\n\n━━━━━━━━━━━━━━━━━━━━━━━\n📊 *Ball:* ${score}/${total}\n📈 *Foiz:* ${pct}%\n🏆 *Baho:* ${grade}\n⏱ *Vaqt:* ${timeTaken}\n━━━━━━━━━━━━━━━━━━━━━━━\n🕐 ${new Date().toLocaleString("uz-UZ")}`.trim();

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    const results = await Promise.all(
      TELEGRAM_CHAT_IDS.map(async (chatId) => {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: "Markdown" }),
        });
        const data = await res.json();
        return data.ok;
      })
    );
    return results.every(Boolean);
  } catch {
    return false;
  }
}

// ─── Styles ────────────────────────────────────────────────────────────────────
// ─── Components ────────────────────────────────────────────────────────────────

function HomeHero({ onSelect, onOpenTopics }) {
  return (
    <section className="home-shell home-hero-shell">
      <div className="promo-bar">
        <span>Frontend test platformasi: HTML, CSS, JS, DOM, React</span>
      </div>

      <div className="home-nav">
        <div className="brand">my-quiz</div>
        <div className="home-nav-links">
          <button type="button" onClick={onOpenTopics}>Bo'limlar</button>
          <button type="button" onClick={onOpenTopics}>Testlar</button>
          <button type="button" onClick={onOpenTopics}>Boshlash</button>
        </div>
      </div>

      <div className="home-hero">
        <div className="hero-left">
          <div className="hero-kicker">BY FRONTEND GROUP</div>
          <h1>Frontend bazaviy testlar</h1>
          <p>HTML, CSS, JavaScript, DOM va React bo'yicha bilimlaringizni sinang.</p>
          <div className="hero-actions">
            <button className="hero-btn hero-btn-primary" onClick={() => onSelect(TOPICS[0])}>
              Testni boshlash
            </button>
            <button type="button" className="hero-btn hero-btn-ghost" onClick={onOpenTopics}>
              Bo'limlarni ko'rish
            </button>
          </div>
        </div>

        <div className="hero-right" aria-hidden="true">
          <div className="layer layer-top">SASS</div>
          <div className="layer layer-mid">STYL</div>
          <div className="layer layer-main">JSX</div>
          <div className="node node-js">.JS</div>
          <div className="node node-css">.CSS</div>
          <div className="node node-html">.HTML</div>
        </div>
      </div>
    </section>
  );
}

function TopicsSection({ onSelect }) {
  return (
    <section className="topics-wrap" id="topics">
      <div className="topics-head">
        <p className="topics-eyebrow">Bo'limlar</p>
        <h2 className="topics-title">Yo'nalishni tanlang</h2>
        <p className="topics-subtitle">Har bir bo'lim alohida test ko'rinishida ochiladi va natija yakunda saqlanadi.</p>
      </div>
      <div className="cards-grid">
        {TOPICS.map((t) => (
          <div
            key={t.id}
            className="topic-card"
            style={{ "--tc": t.color }}
            onClick={() => onSelect(t)}
          >
            <div className="card-title">{t.name}</div>
            <div className="card-desc">{t.desc}</div>
            <div className="card-footer">
              <span className="card-count">{t.count} savol</span>
              <span className="card-action">Boshlash</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HomePage({ onSelect, onOpenTopics }) {
  return (
    <div className="home">
      <HomeHero onSelect={onSelect} onOpenTopics={onOpenTopics} />
    </div>
  );
}

function TopicsPage({ onSelect, onBack }) {
  return (
    <div className="topics-page">
      <section className="home-shell topics-shell">
        <div className="topics-page-head">
        <button className="back-link topics-back" onClick={onBack}>← Bosh sahifaga</button>
        </div>
        <TopicsSection onSelect={onSelect} />
      </section>
    </div>
  );
}

function RegPage({ topic, onStart, onBack }) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [group, setGroup] = useState("");
  const valid = first.trim().length >= 2 && last.trim().length >= 2 && group.trim().length >= 1;

  function handleSubmit(e) {
    e.preventDefault();
    if (!valid) return;
    onStart({ firstName: first.trim(), lastName: last.trim(), group: group.trim() });
  }

  return (
    <div className="reg-wrap">
      <div className="reg-card">
        <button className="back-link" onClick={onBack}>← Orqaga</button>
        <div className="reg-badge" style={{ "--tc": topic.color }}>{topic.name} Bo'limi</div>
        <h2>Testni boshlash</h2>
        <p className="reg-sub">Ma'lumotlaringizni kiriting. Test natijasi Telegram ga yuboriladi.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ismingiz</label>
            <input type="text" placeholder="Masalan: Jasur" value={first} onChange={e => setFirst(e.target.value)} style={{ "--tc": topic.color }} />
          </div>
          <div className="form-group">
            <label>Familiyangiz</label>
            <input type="text" placeholder="Masalan: Toshmatov" value={last} onChange={e => setLast(e.target.value)} style={{ "--tc": topic.color }} />
          </div>
          <div className="form-group">
            <label>Guruhingiz</label>
            <input type="text" placeholder="Masalan: N11" value={group} onChange={e => setGroup(e.target.value)} style={{ "--tc": topic.color }} />
          </div>
          <button type="submit" className="btn-start" style={{ "--tc": topic.color }} disabled={!valid}>
            Testni Boshlash →
          </button>
        </form>
      </div>
    </div>
  );
}

function QuizPage({ topic, user, onFinish }) {
  const [questions] = useState(() =>
    shuffle(topic.questions).map((q) => {
      const correctText = q.options[q.correct];
      const shuffled = shuffle(q.options);
      return { ...q, shuffledOptions: shuffled, correctShuffledIndex: shuffled.indexOf(correctText) };
    })
  );
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null); // index
  const [optState, setOptState] = useState({}); // { idx: 'correct' | 'wrong' }

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const q = questions[current];
  const total = questions.length;
  const pct = Math.round((current / total) * 100);
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  const timeTaken = Math.floor(seconds / 60) > 0
    ? `${Math.floor(seconds / 60)} daqiqa ${seconds % 60} soniya`
    : `${seconds} soniya`;

  function selectOption(idx) {
    if (answered) return;
    setAnswered(true);
    setSelected(idx);
    const isCorrect = idx === q.correctShuffledIndex;
    if (isCorrect) {
      setScore((sc) => sc + 1);
      setOptState({ [idx]: "correct" });
      setTimeout(() => next(score + 1), 900);
    } else {
      setOptState({ [idx]: "wrong" });
      setTimeout(() => next(score), 1800);
    }
  }

  function next(finalScore) {
    const nextIdx = current + 1;
    if (nextIdx < total) {
      setCurrent(nextIdx);
      setAnswered(false);
      setSelected(null);
      setOptState({});
    } else {
      onFinish({
        score: finalScore,
        total,
        timeTaken,
        seconds,
      });
    }
  }

  return (
    <div className="quiz-wrap">
      <div className="quiz-topbar">
        <div className="quiz-meta">
          <span className="q-topic" style={{ "--tc": topic.color }}>{topic.name} Test</span>
          <span className="q-user">{user.firstName} {user.lastName} · {user.group}</span>
        </div>
        <div className={`quiz-timer${seconds > 300 ? " urgent" : ""}`}>
          ⏱ {m}:{s}
        </div>
      </div>

      <div className="prog-wrap">
        <div className="prog-meta">
          <span>Savol <strong>{current + 1}</strong> / <strong>{total}</strong></span>
          <span>{pct}%</span>
        </div>
        <div className="prog-bar">
          <div className="prog-fill" style={{ width: pct + "%", "--tc": topic.color }} />
        </div>
      </div>

      <div className="q-card">
        <div className="q-num">Savol {current + 1} / {total}</div>
        <div className="q-text">{q.question}</div>
      </div>

      <div className="options-list">
        {q.shuffledOptions.map((opt, i) => {
          const state = optState[i];
          return (
            <button
              key={i}
              className={`opt-btn${state ? ` ${state}` : ""}`}
              disabled={answered}
              onClick={() => selectOption(i)}
              style={{ "--tc": topic.color }}
            >
              <span className="opt-letter">{LETTERS[i]}</span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResultPage({ topic, user, result, onHome }) {
  const [tgState, setTgState] = useState("sending"); // sending | sent | fail
  const { score, total, timeTaken } = result;
  const pct = Math.round((score / total) * 100);
  const emoji = pct >= 90 ? "🏆" : pct >= 70 ? "🎉" : pct >= 50 ? "👍" : "😔";

  useEffect(() => {
    sendResultToTelegram(user, { topic: topic.name, score, total, timeTaken })
      .then((ok) => setTgState(ok ? "sent" : "fail"));
  }, []);

  return (
    <div className="result-wrap">
      <div className="result-card">
        <span className="result-emoji">{emoji}</span>
        <div className="result-pct">{pct}%</div>
        <div className="result-lbl">{topic.name} bo'limi natijasi</div>

        <div className="result-stats">
          <div className="stat-box">
            <div className="stat-val" style={{ color: "#4bf5b2" }}>{score}/{total}</div>
            <div className="stat-key">To'g'ri javob</div>
          </div>
          <div className="stat-box">
            <div className="stat-val" style={{ color: "#f7c948" }}>{timeTaken}</div>
            <div className="stat-key">Sarflangan vaqt</div>
          </div>
          <div className="stat-box">
            <div className="stat-val" style={{ color: "#f74f6a" }}>{total - score}</div>
            <div className="stat-key">Noto'g'ri</div>
          </div>
        </div>

        <div className="tg-status">
          <span className={`tg-dot ${tgState === "sending" ? "sending" : tgState === "sent" ? "sent" : "fail"}`} />
          <span>
            {tgState === "sending" ? "Telegram ga yuborilmoqda..." : tgState === "sent" ? "Natija Telegram ga yuborildi ✓" : "Telegram xatosi — token/chat_id ni tekshiring"}
          </span>
        </div>

        <button className="btn-home" onClick={onHome}>← Bosh sahifaga qaytish</button>
      </div>
    </div>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home"); // home | topics | reg | quiz | result
  const [topic, setTopic] = useState(null);
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const iconHref = topic ? TOPIC_ICON_BY_ID[topic.id] || "/image.png" : "/image.png";
    let iconEl = document.querySelector('link[rel="icon"]');

    if (!iconEl) {
      iconEl = document.createElement("link");
      iconEl.setAttribute("rel", "icon");
      document.head.appendChild(iconEl);
    }

    iconEl.setAttribute("type", "image/png");
    iconEl.setAttribute("href", iconHref);
  }, [topic, page]);

  return (
    <>
      <div className="glow glow-blue" />
      <div className="glow glow-gold" />
      <div className="glow glow-green" />
      <div className="app">
        {page === "home" && (
          <HomePage
            onSelect={(t) => { setTopic(t); setPage("reg"); }}
            onOpenTopics={() => setPage("topics")}
          />
        )}
        {page === "topics" && (
          <TopicsPage
            onSelect={(t) => { setTopic(t); setPage("reg"); }}
            onBack={() => setPage("home")}
          />
        )}
        {page === "reg" && topic && (
          <RegPage
            topic={topic}
            onStart={(u) => { setUser(u); setPage("quiz"); }}
            onBack={() => setPage("topics")}
          />
        )}
        {page === "quiz" && topic && user && (
          <QuizPage
            key={topic.id}
            topic={topic}
            user={user}
            onFinish={(r) => { setResult(r); setPage("result"); }}
          />
        )}
        {page === "result" && topic && user && result && (
          <ResultPage
            topic={topic}
            user={user}
            result={result}
            onHome={() => { setPage("home"); setTopic(null); setUser(null); setResult(null); }}
          />
        )}
      </div>
    </>
  );
}
