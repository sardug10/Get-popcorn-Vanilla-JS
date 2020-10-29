import uniqid from "uniqid";

export var carouselId = uniqid();

export const elements = {
  searchQuery: document.querySelector(".search__input"),
  searchForm: document.querySelector(".search"),
  slideshowDiv: document.querySelector(`.main-carousel`),
  slideshowDivParent: document.querySelector(".slideshow"),
  navMovie: document.querySelector(".category-movie, .category-movie *"),
  navTv: document.querySelector(".category-tv, .category-tv *"),
  navActor: document.querySelector(".category-actor, .category-actor *"),
  compositionHeading: document.querySelector(".composition__heading"),
  compositionDiv: document.querySelector(".composition"),
  likeIcon: document.querySelector(".composition__like-icon"),
  likesDivMovie: document.querySelector(".liked__movies"),
  likesDivTv: document.querySelector(".liked__tv"),
  likesDivPerson: document.querySelector(".liked__person"),
  likesSection: document.querySelector(".like"),
};
