import axios from "axios";
import { elements } from "../views/base";

export default class Composition {
  constructor(id) {
    this.id = id;
  }

  async getDetails() {
    try {
      //checking the category
      var category;
      if (elements.navActor.className.includes("active")) {
        category = "person";
      } else if (elements.navMovie.className.includes("active")) {
        category = "movie";
      } else {
        category = "tv";
      }

      const res = await axios(
        `https://api.themoviedb.org/3/${category}/${this.id}?api_key=c91d3d20007ff0c906df7ed5e6ca1e86&`
      );
      this.result = res.data;
      console.log(this.result);
    } catch (error) {
      console.log(error);
    }
  }
}
