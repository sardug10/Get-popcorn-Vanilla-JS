import axios from "axios";

export default class Trending {
  constructor(query) {
    this.query = query;
  }

  async getTrending() {
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/trending/${this.query}/day?api_key=c91d3d20007ff0c906df7ed5e6ca1e86&`
      );
      this.result = res.data.results;
      console.log(this.result);
    } catch (error) {
      console.log(error);
    }
  }
}
