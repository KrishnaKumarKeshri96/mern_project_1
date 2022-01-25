//Constructor for Search Filter and pagination

export class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.search;

    const name = {
      $regex: keyword,
      $options: "i",
    };
    console.log(name);
    keyword
      ? (this.query = this.query.find({ name }))
      : (this.query = this.query.find());
    return this;
  }
}
