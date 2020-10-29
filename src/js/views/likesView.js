import { elements } from "./base";
import { limitingTitle } from "./trendingView";

export const renderLike = (like) => {
  const markup = `
    <li class="like__item">
        <a href="#${like.id}" class="like__link">
        <img
            src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${
              like.imagePath
            }"
            alt="poster"
            class="like__img"
        />
        <div class="like__content">
            <span class="like__title">${limitingTitle(like.title, 30)}</span>
            <span class="like__about"
            >${limitAbout(like.about)}</span
            >
        </div>
        </a>
    </li>
    `;
  var category = like.category;
  if (category === "person") {
    elements.likesDivPerson.insertAdjacentHTML("beforeend", markup);
  } else if (category === "movie") {
    elements.likesDivMovie.insertAdjacentHTML("beforeend", markup);
  } else {
    elements.likesDivTv.insertAdjacentHTML("beforeend", markup);
  }
};

export const toggleLikeBtn = (isLiked) => {
  var likeBtn = document.querySelector(".composition__like-icon");
  if (isLiked) {
    likeBtn.classList.remove("fa-heart-o");
    likeBtn.classList.add("fa-heart");
  } else {
    likeBtn.classList.remove("fa-heart");
    likeBtn.classList.add("fa-heart-o");
  }
};

export const deleteLike = (id) => {
  const el = document.querySelector(`.like__link[href*="${id}"]`).parentElement;
  if (el) el.parentElement.removeChild(el);
};

/*const limitAbout = (about, limit = 120) => {
  var newAbout = [];
  if (about.length > limit) {
    //titleArr = title.split(" ");
    about.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newAbout.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newAbout.join(" ")}...`;
  }
  return about;
};*/

const limitAbout = (about, limit = 115) => {
  var newAbout = [];
  if (about.length > limit) {
    var aboutArr = about.split(" ");
    aboutArr.forEach((el) => {
      var len = 0;
      newAbout.forEach((el1) => {
        len += el1.length;
      });
      if (len < limit) {
        newAbout.push(el);
      }
    });

    return `${newAbout.join(" ")}...`;
  }
  return about;
};

export const toggleLikeMenu = (number) => {
  elements.likesSection.style.visibility = number > 0 ? "visible" : "hidden";
};
