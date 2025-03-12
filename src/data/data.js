// Light Header Icons
import lightHome from "../assets/icons/header/light/home.png";
import lightInfo from "../assets/icons/header/light/info.png";
import lightArticles from "../assets/icons/header/light/articles.png";
import lightNews from "../assets/icons/header/light/news.png";
import lightEditorial from "../assets/icons/header/light/editorial.png";
import lightContact from "../assets/icons/header/light/contact.png";

// Dark Header Icons
import darkHome from "../assets/icons/header/dark/home.png";
import darkInfo from "../assets/icons/header/dark/info.png";
import darkArticles from "../assets/icons/header/dark/articles.png";
import darkNews from "../assets/icons/header/dark/news.png";
import darkEditorial from "../assets/icons/header/dark/editorial.png";
import darkContact from "../assets/icons/header/dark/contact.png";

export const header = {
  text: [
    {
      title: "Bosh sahifa",
      to: "/",
    },
    {
      title: "Ma'lumotlar",
      to: "/",
    },
    {
      title: "Maqolalar",
      to: "articles",
    },
    {
      title: "Yangiliklar",
      to: "/",
    },
    {
      title: "Tahririyat",
      to: "/",
    },
    {
      title: "Aloqa",
      to: "/",
    },
  ],

  lightIcon: [
    lightHome,
    lightInfo,
    lightArticles,
    lightNews,
    lightEditorial,
    lightContact,
  ],

  darkIcon: [
    darkHome,
    darkInfo,
    darkArticles,
    darkNews,
    darkEditorial,
    darkContact,
  ],
};
