import { elements } from "./base";
import axios from "axios";

export const renderResult = (trending, category) => {
  trending.forEach((el) => {
    renderTrending(el, category);
  });
};

export const limitingTitle = (title, limit = 20) => {
  const newTitle = [];
  if (title.length > limit) {
    //titleArr = title.split(" ");
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(" ")}...`;
  }
  return title;
};

const renderTrending = (trend, category) => {
  if (category === "person") {
    var imgSrc;
    if (trend.profile_path === null) {
      imgSrc = "img/posters/default-person-profile.jpg";
    } else {
      imgSrc = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${trend.profile_path}`;
    }
    var markup = `
      <div class="carousel-cell">
        <h4 class="carousel__title">${limitingTitle(trend.name)}</h4>
        <a href="#${trend.id}" class="poster-link">
          <img
            src=${imgSrc}
            alt="${trend.name}"
            class="carousel__poster"
          />
        </a>
      </div>
      `;
  } else if (category === "movie") {
    var imgSrcMovie;
    if (trend.poster_path === null) {
      imgSrcMovie = "img/posters/default-movie-poster.jpg";
    } else {
      imgSrcMovie = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${trend.poster_path}`;
    }
    var markup = `
      <div class="carousel-cell">
        <h4 class="carousel__title">${limitingTitle(trend.title)}</h4>
        <a href="#${trend.id}" class="poster-link">
          <img
            src=${imgSrcMovie}
            alt="${trend.title}"
            class="carousel__poster"
          />
        </a>
      </div>
      `;
  } else {
    var imgSrctv;
    if (trend.poster_path === null) {
      imgSrctv = "img/posters/default-tv-poster.png";
    } else {
      imgSrctv = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${trend.poster_path}`;
    }
    var markup = `
      <div class="carousel-cell">
        <h4 class="carousel__title">${limitingTitle(trend.name)}</h4>
        <a href="#${trend.id}" class="poster-link">
          <img
            src=${imgSrctv}
            alt="${trend.name}"
            class="carousel__poster"
          />
        </a>
      </div>
      `;
  }

  elements.slideshowDiv.insertAdjacentHTML("beforeend", markup);
};

export const clearResult = () => {
  elements.slideshowDiv.innerHTML = "";
};
