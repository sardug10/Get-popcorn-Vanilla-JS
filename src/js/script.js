// THIS IS THE GLOBAL STATE OF THE APP

/**
 * SHOWING THE SEARCH RESULTS FOR MOVIES, TV SHOWS AND ACTORS
 * SHOWING THE DETAILS FOR THE SAME
 */

//IMPORTING THE OTHER MODULES
import { elements, clearSlideShowDivParent } from "./views/base";
import * as searchView from "./views/searchView";
import * as trendingView from "./views/trendingView";
import * as compositionView from "./views/compositionView";
import * as likesView from "./views/likesView";
import Search from "./models/Search";
import Composition from "./models/composition";
import Likes from "./models/likes";
import Trending from "./models/trending";

//GLOBAL STATE OBJECT
const state = {};

//console.log(carouselId);

//switching the active class in navbar
var arrHighlight = Array.from(
  document.querySelectorAll(".navbar__item, .navbar__item *")
);
//Array.from changes any iterable object to an array

arrHighlight.forEach((el) => {
  el.addEventListener("click", () => {
    console.log(el.className);
    arrHighlight.forEach((el1) => {
      el1.classList.remove("navbar__item--active");
    });
    el.classList.add("navbar__item--active");
  });
});

//SEARCH CONTROLLER

const searchController = async () => {
  //getting the search query from input field
  const query = searchView.getInput();
  console.log(query);

  if (query) {
    //creating a new search object and storing it in state object
    state.movies = new Search(query);

    //add the results to the UI
    try {
      //fetching the results
      await state.movies.getResults();

      //preparing the UI for results
      searchView.clearSearch();

      //render the results
      searchView.renderResult(state.movies.result);

      //clear the input field
      searchView.clearInput();
    } catch (error) {
      console.log(error);
    }
  }
};

//Adding the event listener for submitting the form
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchController();
  //console.log(`why the hell is form not working`);
});

//TRENDING CONTROLLER
const trendController = async (category) => {
  //create a new trend object
  state.trending = new Trending(category);

  try {
    //render the result on the UI
    await state.trending.getTrending();

    //prepare the UI
    trendingView.clearResult();

    //add to the UI
    trendingView.renderResult(state.trending.result, category);
  } catch (error) {
    console.log(error);
  }
};

//setting up the event listener for windows loading
window.addEventListener("load", () => {
  //calling the trend function
  trendController("movie");

  //persisting data from the local storage
  state.likes = new Likes();

  //reading the data
  state.likes.readData();

  //toggle like menu
  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());

  //rendering the data
  state.likes.likes.forEach((el) => {
    likesView.renderLike(el);
    //console.log(el);
  });
});

// Setting up the webpage for various event listeners on navbar items

elements.navMovie.addEventListener("click", () => {
  trendController("movie");
  elements.searchQuery.placeholder = "search for movies...";
  elements.compositionHeading.innerHTML = "Let's explore movies together....";
});

elements.navActor.addEventListener("click", () => {
  trendController("person");
  elements.searchQuery.placeholder = "search for person...";
  elements.compositionHeading.innerHTML = "Let's explore people together....";
});

elements.navTv.addEventListener("click", () => {
  trendController("tv");
  elements.searchQuery.placeholder = "search for TV series...";
  elements.compositionHeading.innerHTML =
    "Let's explore TV series together....";
});

//DETAILS CONTROLLER
const detailsController = async () => {
  //getting the id from the address bar
  const id = window.location.hash.replace("#", "");
  console.log(id);
  if (id) {
    //making a new composition object with that id
    state.details = new Composition(id);

    //add the details to the UI
    try {
      await state.details.getDetails();

      //prepare the UI for rendering the details
      compositionView.clearComposition();

      compositionView.renderDetails(state.details.result);

      likesView.toggleLikeBtn(state.likes.isLiked(state.details.id));

      //toggle the like button
    } catch (error) {
      console.log(error);
    }
  }
};

// Event listener for details controller
window.addEventListener("hashchange", () => {
  detailsController();
});

// LIKES CONTROLLER
const likesController = () => {
  if (!state.likes) state.likes = new Likes();
  const category = getCategory();
  const currentID = state.details.id;
  const imagePath = getImage(category);
  const title = getTitle(category);
  const about = getAbout(category);

  if (!state.likes.isLiked(currentID)) {
    //user has NOT liked the movie,tv,person

    //add the like to the array
    const newLike = state.likes.addLikes(
      category,
      currentID,
      imagePath,
      title,
      about
    );

    //toggle the like button
    likesView.toggleLikeBtn(true);

    //render the result on the UI
    console.log(state.likes.likes);
    likesView.renderLike(newLike);
  } else {
    //user has liked the movie,tv,person

    //delete that like object from the likes array
    state.likes.deleteLike(currentID);

    //toggle the like button
    likesView.toggleLikeBtn(false);

    //render the results on the UI
    console.log(state.likes.likes);
    likesView.deleteLike(currentID);
  }

  //toggle the likes section
  const noOfLikes = state.likes.getNumberOfLikes();
  likesView.toggleLikeMenu(noOfLikes);

  console.log(category);
};

//function for getting the category of the like
const getCategory = () => {
  var category;
  if (elements.navActor.className.includes("active")) category = "person";
  else if (elements.navMovie.className.includes("active")) category = "movie";
  else category = "TV show";

  return category;
};

//function to get the image based on category for like
const getImage = (category) => {
  var imagePath;
  if (category === "person") {
    imagePath = state.details.result.profile_path;
  } else {
    imagePath = state.details.result.poster_path;
  }

  return imagePath;
};

//function to get the title based on category for like
const getTitle = (category) => {
  var title;
  if (category === "movie") {
    title = state.details.result.title;
  } else {
    title = state.details.result.name;
  }

  return title;
};

//function to get the about based on category for like
const getAbout = (category) => {
  var about;
  if (category === "person") {
    about = state.details.result.biography;
  } else {
    about = state.details.result.overview;
  }

  return about;
};

// Adding the event listner for liking the movie, actor, Tv show
elements.compositionDiv.addEventListener("click", (e) => {
  if (e.target.matches(".composition__like-icon")) {
    //console.log("element has been liked");
    likesController();
  }
});
