// Images
import homeBg from "../assets/images/home-bg.webp";
import logo from "../assets/images/logo.png";
import pageNotFound from "../assets/images/page-not-found.png";
import paperPen from "../assets/images/paper-pen.png";

export const images = {
  homeBg,
  logo,
  pageNotFound,
  paperPen,
};

// Icons
import home from "../assets/icons/home.png";
import info from "../assets/icons/info.png";
import articles from "../assets/icons/articles.png";
import contact from "../assets/icons/contact.png";

import down from "../assets/icons/arrows/down.png";
import downArrow from "../assets/icons/arrows/down-arrow.png";
import leftArrow from "../assets/icons/arrows/left-arrow.png";

import facebook from "../assets/icons/social-networks/facebook.png";
import instagram from "../assets/icons/social-networks/instagram.png";
import telegram from "../assets/icons/social-networks/telegram.png";
import twitter from "../assets/icons/social-networks/twitter.png";

import cancel from "../assets/icons/cancel.png";
import circleCancel from "../assets/icons/circle-cancel.png";
import plus from "../assets/icons/plus.png";
import circlePlus from "../assets/icons/circle-plus.png";
import edit from "../assets/icons/edit.png";
import trash from "../assets/icons/trash.png";

export const icons = {
  home,
  info,
  articles,
  contact,
  down,
  downArrow,
  leftArrow,
  facebook,
  instagram,
  telegram,
  twitter,
  cancel,
  circleCancel,
  plus,
  circlePlus,
  edit,
  trash,
};

export const header = [
  {
    icon: icons.home,
    title: "Home",
    to: "/",
  },
  {
    icon: icons.info,
    title: "About us",
    to: "/",
  },
  {
    icon: icons.articles,
    title: "Articles",
    to: "articles",
  },
  {
    icon: icons.contact,
    title: "Contact",
    to: "contact",
  },
];
