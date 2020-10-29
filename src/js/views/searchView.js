import { elements } from "./base";
import { limitingTitle } from "./trendingView";

export const getInput = () => elements.searchQuery.value;

const renderMovie = (result) => {
  var markup;
  if (elements.navActor.className.includes("active")) {
    var imgSrc;
    if (result.profile_path === null) {
      imgSrc = "img/posters/default-person-profile.jpg";
    } else {
      imgSrc = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${result.profile_path}`;
    }

    var markup = `
    <div class="carousel-cell">
      <h4 class="carousel__title">${result.name}</h4>
      <a href="#${result.id}" class="poster-link">
        <img src=${imgSrc} alt="${result.name}" class="carousel__poster" />
      </a>
    </div>
    `;
  } else if (elements.navMovie.className.includes("active")) {
    var imgSrcM;
    if (result.poster_path === null) {
      imgSrcM = "img/posters/default-tv-poster.png";
    } else {
      imgSrcM = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${result.poster_path}`;
    }

    var markup = `
    <div class="carousel-cell">
      <h4 class="carousel__title">${limitingTitle(result.title)}</h4>
      <a href="#${result.id}" class="poster-link">
        <img src=${imgSrcM} alt="${result.title}" class="carousel__poster" />
      </a>
    </div>
    `;
  } else {
    var imgSrcT;
    if (result.poster_path === null) {
      imgSrcT = "img/posters/default-tv-poster.png";
    } else {
      imgSrcT = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${result.poster_path}`;
    }

    var markup = `
    <div class="carousel-cell">
      <h4 class="carousel__title">${limitingTitle(result.name)}</h4>
      <a href="#${result.id}" class="poster-link">
        <img src=${imgSrcT} alt="${result.title}" class="carousel__poster" />
      </a>
    </div>
    `;
  }

  elements.slideshowDiv.insertAdjacentHTML("beforeend", markup);
};

export const renderResult = (results) => {
  if (results.length < 1) {
    elements.slideshowDiv.insertAdjacentHTML(
      "beforeend",
      '<span class="composition__warning">oops!! no results found, try looking in another category</span>'
    );
  }
  results.forEach(renderMovie);
};

export const clearInput = () => (elements.searchQuery.value = "");

export const clearSearch = () => {
  elements.slideshowDiv.innerHTML = "";
};
//shri krishna denyal and braces clink ground floor c-182 ramprastha colony ghaziabad
//opp sai baba
//0120-4375371
//
//10-2
