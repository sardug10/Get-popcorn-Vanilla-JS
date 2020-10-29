import { elements } from "./base";

export const clearComposition = () => (elements.compositionDiv.innerHTML = "");

const getGenres = (genArr) => {
  var genre = [];
  genArr.forEach((el) => {
    genre.push(el.name);
  });
  return genre.join(", ");
};

const getDate = (date) => {
  var newDate;
  var dateArr = date.split("-");
  newDate = `${dateArr[2]}. ${dateArr[1]}. ${dateArr[0]}`;
  return newDate;
};

export const renderDetails = (result) => {
  var markup;
  if (elements.navActor.className.includes("active")) {
    var imgSrc;
    if (result.profile_path === null) {
      imgSrc = "img/posters/default-person-profile.jpg";
    } else {
      imgSrc = `"https://image.tmdb.org/t/p/w600_and_h900_bestv2/${result.profile_path}"`;
    }

    markup = `
        <img
        src=  ${imgSrc}
        alt="${result.name}"
        class="composition__poster"
      />

      <div class="composition__content">
        <h2 class="composition__name">${result.name}</h2>
        <span class="composition__dob">${getDate(result.birthday)}</span>
        <i
          class="fa fa-heart-o composition__like-icon"
          aria-hidden="true"
        ></i>

        <h3 class="composition__bio">
          Biography
        </h3>

        <p class="composition__overview">
          ${result.biography}
        </p>
      </div>
        `;
  } else if (elements.navMovie.className.includes("active")) {
    var imgSrcM;
    if (result.poster_path === null) {
      imgSrcM = "img/posters/default-movie-poster.jpg";
    } else {
      imgSrcM = `"https://image.tmdb.org/t/p/w600_and_h900_bestv2/${result.poster_path}"`;
    }

    markup = `
        <img
        src=${imgSrcM}
        alt="${result.title}"
        class="composition__poster"
        />
        <div class="composition__content">
            <h2 class="composition__title">${result.title}</h2>
            <span class="composition__release-date">${getDate(
              result.release_date
            )}</span>
            <i
                class="fa fa-heart-o composition__like-icon"
                aria-hidden="true"
            ></i>
            <h3 class="composition__tagline">
                ${result.tagline}
            </h3>
            <p class="composition__overview">
                ${result.overview}
            </p>
            <span class="composition__genre"
                >${getGenres(result.genres)}</span
            >
            <span class="composition__popularity">${
              result.vote_average
            } user votes</span>
        </div>
      `;
  } else {
    var imgSrcT;
    if (result.poster_path === null) {
      imgSrcT = "img/posters/default-tv-poster.png";
    } else {
      imgSrcT = `"https://image.tmdb.org/t/p/w600_and_h900_bestv2/${result.poster_path}"`;
    }

    markup = `
    <img
    src=${imgSrcT}
    alt="${result.name}"
    class="composition__poster"
  />

  <div class="composition__content">
    <h2 class="composition__title">${result.name}</h2>
    <span class="composition__release-date">${getDate(
      result.first_air_date
    )}</span>
    <i
      class="fa fa-heart-o composition__like-icon"
      aria-hidden="true"
    ></i>

    <h3 class="composition__seasons">
      No of seasons:- ${result.number_of_seasons}
    </h3>

    <p class="composition__overview">
      ${result.overview}
    </p>

    <span class="composition__genre">${getGenres(result.genres)}</span>
    <span class="composition__popularity">${
      result.vote_average
    } user votes</span>
  </div>
    `;
  }

  elements.compositionDiv.insertAdjacentHTML("afterbegin", markup);
};
