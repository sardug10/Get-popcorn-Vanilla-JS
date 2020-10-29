import axios from "axios";
import { elements } from "../views/base";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults(query) {
    var category;

    if (elements.navActor.className.includes("active")) {
      category = "person";
    } else if (elements.navTv.className.includes("active")) {
      category = "tv";
    } else {
      category = "movie";
    }
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/search/${category}?query=${this.query}&api_key=c91d3d20007ff0c906df7ed5e6ca1e86&`
      );
      this.result = res.data.results;
      console.log(this.result);
      //console.log(res.data.results);
    } catch (error) {
      console.log(error);
    }
  }
}
