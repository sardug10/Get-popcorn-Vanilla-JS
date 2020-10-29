export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLikes(category, id, imagePath, title, about) {
    const like = { category, id, imagePath, title, about };
    this.likes.push(like);

    //persist data in the local storage
    this.persistData();

    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex((el) => el.id === id);
    this.likes.splice(index, 1);

    this.persistData();
  }

  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }

  getNumberOfLikes() {
    return this.likes.length;
  }

  persistData() {
    localStorage.setItem("likes", JSON.stringify(this.likes));
  }

  readData() {
    const storage = localStorage.getItem("likes");
    if (storage) this.likes = JSON.parse(storage);
  }
}
