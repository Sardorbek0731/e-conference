// Header Icons
import home from "../assets/icons/header/home.png";
import info from "../assets/icons/header/info.png";
import article from "../assets/icons/header/articles.png";
import news from "../assets/icons/header/news.png";
import editorial from "../assets/icons/header/editorial.png";
import contact from "../assets/icons/header/contact.png";

export const header = [
  {
    icon: home,
    title: "Bosh sahifa",
    to: "/",
  },
  {
    icon: info,
    title: "Ma'lumotlar",
    to: "/",
  },
  {
    icon: article,
    title: "Maqolalar",
    to: "articles",
  },
  {
    icon: news,
    title: "Yangiliklar",
    to: "/",
  },
  {
    icon: editorial,
    title: "Tahririyat",
    to: "/",
  },
  {
    icon: contact,
    title: "Bog'lanish",
    to: "/",
  },
];

// Articles
export const articles = [
  {
    title:
      "Ftiziatriya fanini o‘qitishda tibbiyot talabalari klinik fikrlashini oshirishda FILA jadvalining ahamiyati",
    author: "Matkurbonov Khamdambek Ilxambekovich",
    addedTime: "01.01.2025, 00:00",
    text: "Annotatsiya: Mazkur maqolada ftiziatriya fanini o‘qitishda tibbiyot talabalari klinik fikrlashini rivojlantirishda FILA jadvalidan foydalanishning ahamiyati tahlil qilinadi. FILA jadvali talabalar uchun o‘quv jarayonini chuqurroq tushunishga va klinik muammolarni hal qilish ko‘nikmalarini oshirishga yordam beruvchi vosita sifatida ko‘rib chiqiladi. Ushbu metod klinik tahlil qobiliyatlarini shakllantirish, tanqidiy fikrlashni rivojlantirish hamda talabalarni mustaqil qaror qabul qilishga undashda muhim ahamiyat kasb etadi. FILA jadvali yordamida talabalar kasalliklar haqidagi mavjud ma’lumotlarni tizimli ravishda tahlil qilib, o‘z bilimlarini chuqurlashtirish imkoniyatiga ega bo‘ladilar. Shuningdek, ushbu jadval tibbiyot ta’limida interfaol metodlarni qo‘llashning samaradorligini oshirib, talabalarning nazariy bilimlarini amaliy qo‘llashga yo‘naltirishga xizmat qiladi. Tadqiqotda ushbu yondashuvning samaradorligi, qo‘llash usullari va ta’lim jarayoniga ta’siri muhokama qilinadi. FILA jadvalining amaliy mashg‘ulotlarda qo‘llanishi, real klinik holatlar bilan bog‘lanishi va talabalar uchun mustaqil izlanish imkoniyatlarini yaratishi uning ta’lim jarayonidagi dolzarb ahamiyatini ta’kidlaydi. Kalit so‘zlar: ftiziatriya, klinik fikrlash, FILA jadvali, interfaol o‘qitish, tibbiy ta’lim, innovatsion pedagogika, mustaqil fikrlash, analitik yondashuv.",
  },
  {
    title: "THE RELEVANCE OF MEASLES TODAY",
    author: "Sadullaev Siroj Ernazarovich",
    addedTime: "15.03.2025, 12:05",
    text: "This article outlines the main issues related to the etiology, epidemiology and pathogenesis of measles infection, taking into account the data of the last outbreak of this disease in 2023-2024. The classification of measles, the features of its clinical course in children in the age aspect are presented, the characteristics of the clinical forms of the disease with central nervous system damage are given, and the complications of measles are described. The features of the formation of immunity in measles are shown. The issues related to the laboratory and differential diagnosis of this infection are outlined, modern approaches to the treatment and specific prevention of measles are presented in detail, and the need for vaccination within the framework of the National Calendar of Preventive Vaccinations is emphasized. The requirements for antiepidemic measures in the measles outbreak and dispensary monitoring of children who have had measles infection are considered.",
  },
];

articles.forEach((item, id) => {
  item.id = id;

  let newName = "";

  item.title.split("").forEach((letter) => {
    if (letter == " ") {
      letter = "-";
      newName += letter;
    } else {
      newName += letter.toLocaleUpperCase();
    }
  });

  item.location = newName;
});
